import { Enchantment, ItemStack } from "./components/types";

export function idFormat(id: string) {
    let name = id.split(":")[1];
    name = name
        .split("_")
        .map((w) => w[0].toUpperCase() + w.substring(1).toLowerCase())
        .join(" ");
    return name;
}
  
export function getPrettyItemName(itemStack: ItemStack) {
    if (itemStack.customName) {
        return itemStack.customName;
    }
    return idFormat(itemStack.item);
}
  
export function getPrettyEnchantName(enchant: Enchantment) {
    if (enchant.level) {
        return idFormat(enchant.id) + " " + enchant.level;
    }
    return idFormat(enchant.id);
}

export function getItemImage(itemName: string) {
    let itemImg = new Image();
    itemImg.src = "src/assets/item_images/" + itemName.replace(":", "_") + ".png";
    return itemImg.src;
}