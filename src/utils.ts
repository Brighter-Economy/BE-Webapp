import type { Enchantment, ItemStack } from "./components/types";

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
  } else if (itemStack.name) {
    return itemStack.name;
  }
  return idFormat(itemStack.item);
}

export function getPrettyEnchantName(enchant: Enchantment) {
  const name = enchant.name ? enchant.name : idFormat(enchant.id);
  if (enchant.level) {
    return name + " " + enchant.level;
  }
  return name;
}

export function getItemImage(itemName: string) {
  return "/src/assets/item_images/" + itemName.replace(":", "_") + ".png";
}
