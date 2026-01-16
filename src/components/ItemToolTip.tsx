import type { PropsWithChildren } from "react";
import { getPrettyEnchantName, getPrettyItemName } from "../utils";
import "./ItemToolTip.css";
import type { ItemStack } from "./types";

interface ItemToolTipProperties {
  itemStack: ItemStack;
}

const ItemToolTip: React.FC<PropsWithChildren<ItemToolTipProperties>> = ({
  children,
  itemStack,
}) => (
  <div className="ItemToolTip-container">
    <div className="ItemToolTip-children">
      {children}
      <div className="ItemToolTip">
        <h5 className="mc-font-title">{getPrettyItemName(itemStack)}</h5>
        {itemStack.enchantments?.map((enchant) => (
          <div className="mc-font-secondary" key={enchant.id}>
            {getPrettyEnchantName(enchant)}
          </div>
        ))}
        <p className="mc-font-lore">{itemStack.lore}</p>
        <div className="mc-font-registry-name">{itemStack.item}</div>
      </div>
    </div>
  </div>
);

export default ItemToolTip;
