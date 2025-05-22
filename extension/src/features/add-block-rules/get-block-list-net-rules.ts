import { NetRule } from "./../../shared/lib/browser";
import {
  BlockItemDtoType,
  blockListControllerGetList,
} from "@/shared/api/generated";
import {
  NetRuleActionType,
  NetRuleResourceType,
} from "@/shared/lib/browser";

export async function getBlockListNetRules() {
  const blockList = await blockListControllerGetList();

  return blockList.items.map((item): NetRule => {
    if (item.type === BlockItemDtoType.Website) {
      return item.data.startsWith("regexp:")
        ? {
            id: item.id,
            action: { type: NetRuleActionType.BLOCK },
            condition: {
              regexFilter: item.data.replace("regexp:", ""),
              resourceTypes: [NetRuleResourceType.MAIN_FRAME],
            },
          } 
        : {
            id: item.id,
            action: { type: NetRuleActionType.BLOCK },
            condition: {
              urlFilter: item.data,
              resourceTypes: [NetRuleResourceType.MAIN_FRAME],
            },
          };
    } else {
      const escapedKeyword = item.data.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

      return {
        id: item.id,
        action: { type: NetRuleActionType.BLOCK },
        condition: {
          regexFilter: `.*${escapedKeyword}.*`,
          resourceTypes: [NetRuleResourceType.MAIN_FRAME],
        },
      };
    }
  });
}
