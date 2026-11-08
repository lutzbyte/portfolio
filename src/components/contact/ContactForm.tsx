"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CircleAlert, CircleCheck, LoaderCircle, Send } from "lucide-react";
import { useState } from "react";
import type { ReactNode } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { contactCopy } from "@/data/contact";
import { cn } from "@/lib/cn";
import { contactSchema } from "@/lib/contact-schema";
import type { ContactInput } from "@/lib/contact-schema";

type Status = "idle" | "submitting" | "success" | "error";

type ApiResult = { ok: boolean; code?: string };

function parseResult(value: unknown): ApiResult {
  if (typeof value !== "object" || value === null) return { ok: false };
  const record = value as Record<string, unknown>;
  return {
    ok: record.ok === true,
    code: typeof record.code === "string" ? record.code : undefined,
  };
}

function messageFor(code: string | undefined): string {
  const errors = contactCopy.errors;
  if (code === "not_configured") return errors.notConfigured;
  if (code === "invalid") return errors.invalid;
  return errors.generic;
}

const inputClass = (invalid: boolean) =>
  cn(
    "w-full rounded-xl border bg-background/60 px-4 py-3 text-base text-foreground transition-colors duration-200 placeholder:text-foreground-muted",
    invalid
      ? "border-red-400/70"
      : "border-border hover:border-primary-light/40 focus:border-primary-light",
  );

type FieldProps = {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
};

function Field({ id, label, error, children }: FieldProps) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-foreground">
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-red-300">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function ContactForm() {
  const copy = contactCopy;
  const [status, setStatus] = useState<Status>("idle");
  const [errorText, setErrorText] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", message: "", website: "" },
  });

  const submitting = status === "submitting";

  const onSubmit = async (values: ContactInput) => {
    setStatus("submitting");
    setErrorText("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        reset();
        setStatus("success");
        return;
      }

      const result = parseResult(await response.json().catch(() => null));
      setErrorText(messageFor(result.code));
      setStatus("error");
    } catch {
      setErrorText(copy.errors.network);
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div
        role="status"
        className="flex flex-col items-start gap-3 rounded-xl border border-border bg-background/40 p-5 sm:p-6"
      >
        <CircleCheck aria-hidden="true" className="size-8 text-success" />
        <h3 className="text-lg font-bold text-foreground">
          {copy.status.successTitle}
        </h3>
        <p className="text-foreground-secondary">{copy.status.successBody}</p>
        <Button variant="secondary" size="sm" onClick={() => setStatus("idle")}>
          {copy.status.sendAnother}
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      aria-busy={submitting}
      className="relative space-y-4 rounded-xl border border-border bg-background/40 p-5 sm:p-6"
    >
      <h3 className="text-lg font-bold text-foreground">{copy.form.title}</h3>

      <Field id="contact-name" label={copy.form.nameLabel} error={errors.name?.message}>
        <input
          id="contact-name"
          type="text"
          autoComplete="name"
          placeholder={copy.form.namePlaceholder}
          aria-invalid={errors.name ? true : undefined}
          aria-describedby={errors.name ? "contact-name-error" : undefined}
          className={inputClass(Boolean(errors.name))}
          {...register("name")}
        />
      </Field>

      <Field id="contact-email" label={copy.form.emailLabel} error={errors.email?.message}>
        <input
          id="contact-email"
          type="email"
          autoComplete="email"
          inputMode="email"
          placeholder={copy.form.emailPlaceholder}
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={errors.email ? "contact-email-error" : undefined}
          className={inputClass(Boolean(errors.email))}
          {...register("email")}
        />
      </Field>

      <Field id="contact-message" label={copy.form.messageLabel} error={errors.message?.message}>
        <textarea
          id="contact-message"
          rows={5}
          placeholder={copy.form.messagePlaceholder}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
          className={cn(inputClass(Boolean(errors.message)), "min-h-32 resize-y")}
          {...register("message")}
        />
      </Field>

      <div
        aria-hidden="true"
        className="absolute -left-[9999px] size-px overflow-hidden"
      >
        <input type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>

      {status === "error" ? (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-xl border border-red-400/40 bg-red-400/10 p-3 text-sm text-red-200"
        >
          <CircleAlert aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
          <div>
            <p className="font-semibold">{copy.status.errorTitle}</p>
            <p>{errorText}</p>
          </div>
        </div>
      ) : null}

      <Button
        type="submit"
        size="lg"
        disabled={submitting}
        className="w-full sm:w-auto"
        leadingIcon={
          submitting ? (
            <LoaderCircle
              aria-hidden="true"
              className="size-4 motion-safe:animate-spin"
            />
          ) : (
            <Send aria-hidden="true" className="size-4" />
          )
        }
      >
        {submitting ? copy.form.submitting : copy.form.submit}
      </Button>
    </form>
  );
}