import Image from "next/image";
import { cn } from "@/lib/cn";
import type { ImageAsset } from "@/types";

type ProjectThumbnailProps = {
  name: string;
  thumbnail: ImageAsset | null;
  sizes: string;
  priority?: boolean;
  className?: string;
};

export function ProjectThumbnail({
  name,
  thumbnail,
  sizes,
  priority = false,
  className = "aspect-[16/10]",
}: ProjectThumbnailProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden bg-background-secondary",
        className,
      )}
    >
      {thumbnail ? (
        <Image
          src={thumbnail.src}
          alt={thumbnail.alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      ) : (
        <div
          aria-hidden="true"
          className="flex h-full w-full items-center justify-center bg-surface"
        >
          <span className="text-6xl font-extrabold text-primary-light/30">
            {name.charAt(0)}
          </span>
        </div>
      )}
    </div>
  );
}