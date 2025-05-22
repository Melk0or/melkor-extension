import { useState, useEffect } from "react";
import { UiButton } from "@/shared/ui/ui-button";
import { createTab } from "@/shared/lib/browser";
import { ADMIN_URL } from "@/shared/constants";
import clsx from "clsx";
import {
  BlockItemDto,
  blockListControllerAddBlockItem,
  blockListControllerGetList,
  blockListControllerRemoveBlockItem,
} from "@/shared/api/generated";
import { Header } from "@/widgets/header/ui/header";

export function HomePage() {
  const [tab, setTab] = useState<"site" | "focus">("site");
  const [itemInfo, setItemInfo] = useState<BlockItemDto>();
  const [tabInfo, setTabInfo] = useState<{
    url: string;
    favicon: string;
  } | null>(null);

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0];
      if (tab) {
        const { hostname } = new URL(tab.url || "");
        setTabInfo({
          url: hostname,
          favicon: tab.favIconUrl || "",
        });
        blockListControllerGetList({ q: hostname }).then((data) => {
          setItemInfo(data.items[0]);
        });
      }
    });
  }, []);

  const handleBlockToggle = async () => {
    if (itemInfo) {
      await blockListControllerRemoveBlockItem(itemInfo.id);
      setItemInfo(undefined);
    } else {
      const data = await blockListControllerAddBlockItem({
        type: "Website",
        data: tabInfo?.url || "",
      });
      setItemInfo(data);
    }
  
    setTimeout(() => {
      chrome.runtime.sendMessage({ type: "RELOAD_TAB" });
    }, 4000)
  };

  return (
    <div className="p-6 flex flex-col justify-between gap-4 min-w-[350px] min-h-[600px]">
      <div>
      <Header />

        <div
          className={clsx(
            `flex gap-2 border-b border-gray-300 mb-2 relative justify-around after:content-[''] after:w-6/12 after:h-full after:absolute after:top-0 after:left-0 after:border-b-2 after:border-violet-700 after:transition-all`,
            tab === "site" ? "after:translate-x-0" : "after:translate-x-full",
          )}
        >
          <button className={`px-4 py-2`} onClick={() => setTab("site")}>
            Current Site
          </button>
          <button className={`px-4 py-2`} onClick={() => setTab("focus")}>
            Focus Mode
          </button>
        </div>
      </div>
      {/* Tab Content */}
      {tab === "site" && (
        <div className="text-center flex flex-col items-center gap-2">
          {tabInfo?.favicon && (
            <img src={tabInfo.favicon} alt="favicon" className="w-8 h-8" />
          )}
          <div className="text-lg font-medium">{tabInfo?.url}</div>
          {!itemInfo && (
            <div className="text-sm text-gray-500">Not in block list</div>
          )}
        </div>
      )}

      {tab === "focus" && (
        <div className="text-center flex flex-col items-center gap-4">
          <img
            src={chrome.runtime.getURL("lottie/cat.gif")}
            className="w-24 h-16 m-auto"
            alt="Focus Mode"
          />
          <div className="text-sm text-gray-500">Work in progress. Sorry for the inconvenience</div>
        </div>
      )}
      <div className="flex flex-col gap-2">
        <UiButton
          variant="secondary"
          className="w-full"
          onClick={handleBlockToggle}
        >
          {itemInfo ? "Unblock this site" : "Block this site"}
        </UiButton>
        <UiButton
          variant="outlined"
          className="w-full"
          onClick={() => createTab(ADMIN_URL)}
        >
          Manage extension
        </UiButton>
      </div>
    </div>
  );
}
