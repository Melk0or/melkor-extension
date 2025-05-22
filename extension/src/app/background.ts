import { startUpdateBlockRules } from "@/features/add-block-rules";
import { startToggleExtensionIcon } from "@/features/toggle-extension-icon";

chrome.runtime.onMessage.addListener((message) => {
    if (message.type === "RELOAD_TAB") {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0]?.id) {
          chrome.tabs.reload(tabs[0].id);
        }
      });
    }
  });

startUpdateBlockRules();
startToggleExtensionIcon();
