import { useState } from "react";
import { ItemStack, ShopDetails } from "../components/types";
import { Link } from "react-router-dom";
import ItemToolTip from "./ItemToolTip";
import "./ShopEntry.css";
import { getItemImage, getPrettyItemName } from "../utils";
import glintImage from "../assets/glint.png";

interface ShopEntryParameters {
  shopDetails: ShopDetails;
}

const ShopEntry: React.FC<ShopEntryParameters> = ({ shopDetails }) => {
  const [imageSrc, setImageSrc] = useState(
    getItemImage(shopDetails.itemStack.item)
  );
  const fallbackSrc = "src/assets/no_item_image.png";
  const currencyPreflix = "$";

  const glintEffect = () =>
    shopDetails.itemStack.enchantments.length > 0 && (
      <div className="item-mask" style={{ maskImage: `url("${imageSrc}")` }}>
        <img src={glintImage} className="glint" />
      </div>
    );

  return (
    <div
      className="bg-secondary m-3 shadow rounded-2 flex"
      style={{ width: 400 }}
    >
      <div className="m-3">
        <div className="d-flex mb-3">
          <ItemToolTip itemStack={shopDetails.itemStack}>
            <img
              onError={() =>
                imageSrc !== fallbackSrc && setImageSrc(fallbackSrc)
              }
              src={imageSrc}
              className="me-2 standard-item"
            />
            {glintEffect()}
          </ItemToolTip>
          <div className="m-2 text-start my-auto">
            <Link
              to={"/players/" + shopDetails.ownerUuid}
              style={{ color: "#FFFFFF" }}
            >
              <h4>
                <strong>{shopDetails.ownerName}'s</strong>
              </h4>
            </Link>
            <h4>{getPrettyItemName(shopDetails.itemStack)} Shop</h4>
          </div>
        </div>
        <div className="d-flex">
          <div>
            <div
              className="input-group mb-1"
              onClick={() => navigator.clipboard.writeText(shopDetails.id)}
            >
              <span className="input-group-text">Shop ID:</span>
              <input
                type="input-group-text"
                className="form-control"
                disabled={true}
                placeholder={shopDetails.id}
              />
              <span className="input-group-text">
                <i className="bi bi-clipboard2" />
              </span>
            </div>
            <div
              className="input-group mb-1"
              onClick={() =>
                navigator.clipboard.writeText(
                  shopDetails.itemStack.count.toString() +
                    "@" +
                    shopDetails.price
                )
              }
            >
              <span className="input-group-text">Price:</span>
              <input
                type="input-group-text"
                className="form-control"
                disabled={true}
                placeholder={
                  shopDetails.itemStack.count +
                  " @ " +
                  currencyPreflix +
                  shopDetails.price.toString()
                }
              />
              <span className="input-group-text">
                <i className="bi bi-clipboard2" />
              </span>
            </div>
            <div
              className="input-group mb-1"
              onClick={() =>
                navigator.clipboard.writeText(shopDetails.itemStack.item)
              }
            >
              <span className="input-group-text">Item:</span>
              <input
                type="input-group-text"
                className="form-control"
                disabled={true}
                placeholder={shopDetails.itemStack.item}
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
