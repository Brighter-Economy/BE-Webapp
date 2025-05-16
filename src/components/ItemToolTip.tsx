import "./ItemToolTip.css";
import { ItemStack } from "./types";

type ItemToolTipProperties = {
  children: React.ReactElement;
  itemStack: ItemStack;
};

function getPrettyItemName(itemID: string) {
  let itemName = itemID.split(":")[1];
  itemName = itemName
    .split("_")
    .map((w) => w[0].toUpperCase() + w.substring(1).toLowerCase())
    .join(" ");
  return itemName;
}
function getPrettyEnchantName(enchantID: string) {
  var i,
    frags = enchantID.split("_");
  for (i = 0; i < frags.length; i++) {
    frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
  }
  return frags.join(" ");
}

export default function ItemToolTip({
  children,
  itemStack,
}: ItemToolTipProperties) {
  return (
    <div className="ItemToolTip-container">
      <div className="ItemToolTip-children">
        {children}
        <div className="ItemToolTip">
          <h5 className="mc-font-title">{getPrettyItemName(itemStack.item)}</h5>
          {itemStack.enchantments?.map((enchant) => (
            <div className="mc-font-secondary">
              {getPrettyEnchantName(enchant)}
            </div>
          ))}
          <body className="mc-font-lore">{itemStack.lore}</body>
          <div className="mc-font-registry-name">minecraft:diamond_sword</div>
        </div>
      </div>
    </div>
  );
}
