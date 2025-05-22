import { ToggleBlockingButton } from "@/features/toggle-blocking/ui/toggle-blocking-button";
import { UiLogo } from "@/shared/ui/ui-logo";
import { clsx } from "clsx";

export function Header({ className }: { className?: string }) {
    return (
      <div className={clsx(className, "flex items-center justify-between gap-2 text-xl")}>
        <UiLogo />
        <ToggleBlockingButton />
      </div>
    );
  } 