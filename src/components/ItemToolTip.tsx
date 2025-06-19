import { getPrettyEnchantName, getPrettyItemName } from "../utils";
import "./ItemToolTip.css";
import { ItemStack } from "./types";

type ItemToolTipProperties = {
  children: React.ReactElement;
  itemStack: ItemStack;
};

export default function ItemToolTip({
  children,
  itemStack,
}: ItemToolTipProperties) {
  return (
    <div className="ItemToolTip-container">
      <div className="ItemToolTip-children">
        {children}
        <div className="ItemToolTip">
          <h5 className="mc-font-title">{getPrettyItemName(itemStack)}</h5>
          {itemStack.enchantments?.map((enchant) => (
            <div className="mc-font-secondary">
              {getPrettyEnchantName(enchant)}
            </div>
          ))}
          <body className="mc-font-lore">{itemStack.lore}</body>
          <div className="mc-font-registry-name">{itemStack.item}</div>
        </div>
      </div>
    </div>
  );
}
