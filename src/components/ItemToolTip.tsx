import "./ItemToolTip.css";

type ItemToolTipProperties = {
  children: React.ReactElement;
};

export default function ItemToolTip({ children }: ItemToolTipProperties) {
  return (
    <div className="ItemToolTip-container">
      <div className="ItemToolTip-children">
        {children}
        <div className="ItemToolTip">
          <h5 className="mc-font-title">Item Name</h5>
          <div className="mc-font-secondary">Sharpness V</div>
          <div className="mc-font-secondary">Unbreaking III</div>
          <p className="mc-font-lore">
            This is lore. lots of lore that hopefully wraps. it didnt wrap but
            now it should. please pretty please.
          </p>
          <div className="mc-font-registry-name">minecraft:diamond_sword</div>
        </div>
      </div>
    </div>
  );
}
