import { useState } from "react";
import { ItemDetails, ShopDetails } from "../components/types";
import ShopEntry from "../components/ShopEntry";

function PlayerShops() {
  const [searchQuery, setSearchQuery] = useState("");

  const dSword: ItemDetails = {
    item: "minecraft:diamond_sword",
    count: 1,
    nbt: '{components: {"minecraft:enchantments": {levels: {"minecraft:mending": 1, "minecraft:looting": 3, "minecraft:fire_aspect": 1 }}}, count: 1, id: "minecraft:diamond_sword"}',
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

  const shops = [shop1, shop2, shop3];

  const filteredShops = shops.filter((shop) => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    return (
      shop.ownerName.toLowerCase().includes(lowerCaseQuery) ||
      shop.ownerUuid.toLowerCase().includes(lowerCaseQuery) ||
      shop.id.toLowerCase().includes(lowerCaseQuery) ||
      shop.item.item.toLowerCase().includes(lowerCaseQuery)
    );
  });

  return (
    <>
      <div className="d-flex">
        <div className="pt-3 ps-3 pe-3 d-flex w-50">
          <h1 className="display-6">Player Shops</h1>
        </div>
        <div className="d-flex my-auto container-fluid">
          <input
            type="text"
            className="form-control me-3"
            placeholder="Search by Player Name, Shop UUID, or Item Name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            type="button"
            className="btn btn-primary"
            style={{
              backgroundColor: "#0d47a1",
              borderWidth: "0",
            }}
          >
            Refresh
          </button>
        </div>
      </div>
      <div className="container w-100 d-flex">
        <div className="d-flex mx-auto g-0" style={{ flexWrap: "wrap" }}>
          {filteredShops.map((shop) => (
            <ShopEntry
              key={shop.id}
              id={shop.id}
              ownerUuid={shop.ownerUuid}
              ownerName={shop.ownerName}
              item={shop.item}
              price={shop.price}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default PlayerShops;
