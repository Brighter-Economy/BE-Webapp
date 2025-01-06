import { useState } from "react";
import { ItemDetails, ShopDetails } from "../components/types";
import { Link } from "react-router-dom";

const ShopCol: React.FC<ShopDetails> = ({
  id,
  ownerUuid,
  ownerName,
  item,
  price,
}) => {
  function getItemImage(itemName: string) {
    let itemImg = new Image();
    itemImg.src =
      "src/assets/item_images/" + itemName.replace(":", "_") + ".png";
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

  const [imageSrc, setImageSrc] = useState(getItemImage(item.item));
  const fallbackSrc = "src/assets/no_item_image.png";
  const curPreflix = "$";

  return (
    <>
      <div
        className="bg-secondary m-3 shadow rounded-2 flex"
        style={{ width: 400 }}
      >
        <div className="m-3">
          <div className="d-flex mb-3">
            <img
              onError={() => {
                if (imageSrc !== fallbackSrc) setImageSrc(fallbackSrc);
              }}
              src={imageSrc}
              className="img-fluid rounded me-2 shadow"
              style={{ width: 80, imageRendering: "pixelated" }}
            />
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
                onClick={() => {
                  navigator.clipboard.writeText(id);
                }}
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
                onClick={() => {
                  navigator.clipboard.writeText(
                    item.count.toString() + "@" + price
                  );
                }}
              >
                <span className="input-group-text">Price:</span>
                <input
                  type="input-group-text"
                  className="form-control"
                  disabled={true}
                  placeholder={
                    item.count + " @ " + curPreflix + price.toString()
                  }
                />
                <span className="input-group-text">
                  <i className="bi bi-clipboard2" />
                </span>
              </div>
              <div
                className="input-group mb-1"
                onClick={() => {
                  navigator.clipboard.writeText(item.item);
                }}
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
    </>
  );
};

function PlayerShops() {
  const dSword: ItemDetails = {
    item: "minecraft:diamond_sword",
    count: 1,
    nbt: '{components: {"minecraft:enchantments": {levels: {"minecraft:mending": 1, "minecraft:looting": 3, "minecraft:fire_aspect": 1}}}, count: 1, id: "minecraft:diamond_sword"}',
  };

  const sPlank: ItemDetails = {
    item: "minecraft:spruce_planks",
    count: 64,
    nbt: null,
  };

  const ironIngot: ItemDetails = {
    item: "minecraft:iron_ingot",
    count: 16,
    nbt: null,
  };

  const shop1: ShopDetails = {
    id: "9e75bebf-09ca-463a-be1e-2e2aafa456d8",
    ownerUuid: "205dfa33-0038-4c66-8159-f261a013efdf",
    ownerName: "notoproto",
    item: dSword,
    price: 50,
  };

  const shop2: ShopDetails = {
    id: "b2f57e2b-26d9-4e72-8c2c-c749b3b2cb39",
    ownerUuid: "8f2d5f8d-b320-491d-af07-0feda3185125",
    ownerName: "BaseBoostedBork",
    item: sPlank,
    price: 15,
  };

  const shop3: ShopDetails = {
    id: "c2f40385-785a-44ec-b71f-b1d088fcb4d3",
    ownerUuid: "ec43c1e7-ecc7-49a1-bd11-243545a200bf",
    ownerName: "Chris__b__bacon",
    item: ironIngot,
    price: 20,
  };

  return (
    <>
      <div className="d-flex">
        <div className="pt-3 ps-3 pe-3 d-flex w-50">
          <h1 className="display-6">Player Shops</h1>
        </div>
        <div className="d-flex ms-3 my-auto container-fluid">
          <div
            className="input-group input-group ms-auto me-3"
            style={{ height: 50 }}
          >
            <input
              type="text"
              className="form-control"
              placeholder="User or Item Search..."
            />
            <span className="input-group-text" id="basic-addon2">
              <i className="bi bi-search" />
            </span>
          </div>

          <button
            type="button"
            className="btn btn-primary ms-auto"
            style={{
              backgroundColor: "#0d47a1",
              borderWidth: "0",
              height: 50,
            }}
          >
            Refresh
          </button>
        </div>
      </div>
      <div className="container w-100 d-flex">
        <div className="row mx-auto g-0">
          <ShopCol
            id={shop1.id}
            ownerUuid={shop1.ownerUuid}
            ownerName={shop1.ownerName}
            item={shop1.item}
            price={shop1.price}
          />
          <ShopCol
            id={shop2.id}
            ownerUuid={shop2.ownerUuid}
            ownerName={shop2.ownerName}
            item={shop2.item}
            price={shop2.price}
          />
          <ShopCol
            id={shop3.id}
            ownerUuid={shop3.ownerUuid}
            ownerName={shop3.ownerName}
            item={shop3.item}
            price={shop3.price}
          />
        </div>
      </div>
    </>
  );
}

export default PlayerShops;
