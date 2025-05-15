import { useState } from "react";
import { ShopDetails } from "../components/types";
import { Link } from "react-router-dom";
import ItemToolTip from "./ItemToolTip";

function getItemImage(itemName: string) {
  let itemImg = new Image();
  itemImg.src = "src/assets/item_images/" + itemName.replace(":", "_") + ".png";
  return itemImg.src;
}

function getPrettyItemName(itemID: string) {
  let itemName = itemID.split(":")[1];
  itemName = itemName
    .split("_")
    .map((w) => w[0].toUpperCase() + w.substring(1).toLowerCase())
    .join(" ");
  return itemName;
}

const ShopEntry: React.FC<ShopDetails> = ({
  id,
  ownerUuid,
  ownerName,
  item,
  price,
}) => {
  const [imageSrc, setImageSrc] = useState(getItemImage(item.item));
  const fallbackSrc = "src/assets/no_item_image.png";
  const curPreflix = "$";

  return (
    <div
      className="bg-secondary m-3 shadow rounded-2 flex"
      style={{ width: 400 }}
    >
      <div className="m-3">
        <div className="d-flex mb-3">
          <ItemToolTip>
            <img
              onError={() => {
                if (imageSrc !== fallbackSrc) setImageSrc(fallbackSrc);
              }}
              src={imageSrc}
              className="img-fluid rounded me-2 shadow"
              style={{ width: 80, imageRendering: "pixelated" }}
            />
          </ItemToolTip>
          <div className="m-2 text-start my-auto">
            <Link to={"/players/" + ownerUuid} style={{ color: "#FFFFFF" }}>
              <h4>
                <strong>{ownerName}'s</strong>
              </h4>
            </Link>
            <h4>{getPrettyItemName(item.item)} Shop</h4>
          </div>
        </div>
        <div className="d-flex">
          <div>
            <div
              className="input-group mb-1"
              onClick={() => navigator.clipboard.writeText(id)}
            >
              <span className="input-group-text">Shop ID:</span>
              <input
                type="input-group-text"
                className="form-control"
                disabled={true}
                placeholder={id}
              />
              <span className="input-group-text">
                <i className="bi bi-clipboard2" />
              </span>
            </div>
            <div
              className="input-group mb-1"
              onClick={() =>
                navigator.clipboard.writeText(
                  item.count.toString() + "@" + price
                )
              }
            >
              <span className="input-group-text">Price:</span>
              <input
                type="input-group-text"
                className="form-control"
                disabled={true}
                placeholder={item.count + " @ " + curPreflix + price.toString()}
              />
              <span className="input-group-text">
                <i className="bi bi-clipboard2" />
              </span>
            </div>
            <div
              className="input-group mb-1"
              onClick={() => navigator.clipboard.writeText(item.item)}
            >
              <span className="input-group-text">Item:</span>
              <input
                type="input-group-text"
                className="form-control"
                disabled={true}
                placeholder={item.item}
              />
              <span className="input-group-text">
                <i className="bi bi-clipboard2" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopEntry;
