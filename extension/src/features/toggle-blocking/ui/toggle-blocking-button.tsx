import { UiButton } from "@/shared/ui/ui-button";
import { useToggleBlocking } from "../model/use-toggle-blocking";
import { CirclePower } from "lucide-react";
import clsx from "clsx";

export function ToggleBlockingButton() {
  const { isBlockingEnabled, isLoading, toggleBlocking, isReady } =
    useToggleBlocking();

  if (!isReady) {
    return null;
  }

  return (
    <UiButton
      disabled={isLoading}
      className={clsx("!p-2", isBlockingEnabled ? "opacity-100" : 'opacity-50')}
      onClick={toggleBlocking}
      variant={!isBlockingEnabled ? "primary" : "secondary"}
    >
      <CirclePower />
    </UiButton>
  );
}
