import { useEffect, useState } from "react";
import { ShopDetails } from "../components/types";
import ShopEntry from "../components/ShopEntry";
import { get } from "../request";

function PlayerShops() {
  const [searchQuery, setSearchQuery] = useState("");
  const [shopDetails, setShopDetails] = useState<ShopDetails[]>([]);

  const updateShopDetails = async () => {
    const shopsJson = await get("/api/shops", (response) => response.json());
    setShopDetails(shopsJson);
  };

  useEffect(() => {
    updateShopDetails();
  }, []);

  const filteredShops = shopDetails.filter((shop) => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    return (
      shop.ownerName.toLowerCase().includes(lowerCaseQuery) ||
      shop.ownerUuid.toLowerCase().includes(lowerCaseQuery) ||
      shop.id.toLowerCase().includes(lowerCaseQuery) ||
      shop.itemStack.item.toLowerCase().includes(lowerCaseQuery)
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
        <div
          className="d-flex mx-auto g-0 justify-content-center"
          style={{ flexWrap: "wrap" }}
        >
          {filteredShops.map((shop) => (
            <ShopEntry key={shop.id} shopDetails={shop} />
          ))}
        </div>
      </div>
    </>
  );
}

export default PlayerShops;
