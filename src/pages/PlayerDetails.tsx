import { useEffect, useState } from "react";
import { ShopDetails } from "../components/types";
import ItemToolTip from "../components/ItemToolTip";
import { getItemImage } from "../utils";
import glintImage from "../assets/glint.png";
import "./PlayerDetails.css";

function PlayerDetails() {
  const pathname = window.location.pathname.replace(/\/players\//, "");
  const fallbackSrc = "src/assets/no_item_image.png";

  const [shopData, setShopData] = useState<ShopDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [accountInfo, setAccountInfo] = useState<{
    username: string;
    uuid: string;
  } | null>(null);
  const [selectedShop, setSelectedShop] = useState<ShopDetails | null>(null);

  const getItem = async (pathname: string) => {
    try {
      const response = await fetch(`/api/shops`);
      if (!response.ok) {
        throw new Error("An Error Occurred.");
      }
      const shopsJson = await response.json();
      const filteredShops = shopsJson.filter(
        (shop: ShopDetails) => shop.ownerUuid === pathname
      );
      return filteredShops;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message);
      return null;
    }
  };

  const getAccountInfo = async (uuid: string) => {
    try {
      const response = await fetch(`/api/accounts/${uuid}`);
      if (!response.ok) {
        throw new Error("An Error Occurred.");
      }
      const accountJson = await response.json();
      return accountJson;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message);
      return null;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getItem(pathname);
      setShopData(data);
      setLoading(false);
    };

    fetchData();
  }, [pathname]);

  useEffect(() => {
    const fetchAccountInfo = async () => {
      if (shopData.length > 0) {
        const account = await getAccountInfo(shopData[0].ownerUuid);
        if (account) {
          setAccountInfo(account);
        } else {
          setAccountInfo({ username: "Unknown", uuid: "Unknown" });
        }

        setSelectedShop(shopData[0]);
      }
    };

    fetchAccountInfo();
  }, [shopData]);

  const handleShopChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedShopId = event.target.value;
    const shop = shopData.find((item) => item.id === selectedShopId) || null;
    setSelectedShop(shop);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const glintEffect = (item: ShopDetails) => {
    if (item.itemStack.enchantments.length > 0) {
      return (
        <div
          className="item-mask"
          style={{ maskImage: `url("${getItemImage(item.itemStack.item)}")` }}
          key={item.id}
        >
          <img src={glintImage} className="glint" />
        </div>
      );
    }
    return null;
  };

  return (
    <div className="pt-3 ps-3 pe-3 container-fluid">
      <h1 className="display-6">Player Details</h1>
      <div className="m-4 d-flex">
        <div
          className="d-flex img-avatar-div rounded me-3"
          style={{ width: "25%" }}
        >
          <img
            className="rounded float-start mx-auto"
            src={"https://mc-heads.net/body/" + accountInfo?.uuid}
          />
        </div>
        <div className="container-fluid" style={{ backgroundColor: "#0d47a1" }}>
          <h3>{accountInfo?.username}'s Account:</h3>
          <div
            className="input-group mb-2"
            onClick={() => {
              if (accountInfo) {
                navigator.clipboard.writeText(accountInfo!!.uuid);
              }
            }}
          >
            <span className="input-group-text">UUID</span>
            <input
              type="input-group-text"
              className="form-control"
              disabled={true}
              placeholder={accountInfo?.uuid}
            />
            <span className="input-group-text">
              <i className="bi bi-clipboard2" />
            </span>
          </div>
          <div
            className="input-group mb-2"
            onClick={() => {
              if (accountInfo) {
                navigator.clipboard.writeText(accountInfo!!.uuid);
              }
            }}
          >
            <span className="input-group-text">Username</span>
            <input
              type="input-group-text"
              className="form-control"
              disabled={true}
              placeholder={accountInfo?.username}
            />
            <span className="input-group-text">
              <i className="bi bi-clipboard2" />
            </span>
          </div>
          <div className="d-flex mb-2">
            <div
              className="input-group me-2"
              onClick={() => {
                if (accountInfo) {
                  navigator.clipboard.writeText(
                    "accountInfo!!.money.toString()"
                  );
                }
              }}
            >
              <span className="input-group-text">Balance</span>
              <input
                type="input-group-text"
                className="form-control"
                disabled={true}
                placeholder={"accountInfo?.money.toString()"}
              />
              <span className="input-group-text">
                <i className="bi bi-clipboard2" />
              </span>
            </div>
            <div className="input-group">
              <div className="input-group-text">
                <input
                  className="form-check-input mt-0"
                  type="checkbox"
                  value=""
                  checked={true} //{accountInfo?.locked}
                />
              </div>
              <input
                type="text"
                className="form-control"
                placeholder="Locked"
                disabled={true}
              />
            </div>
          </div>
          <div
            className="d-flex flex-grow-1"
            style={{ backgroundColor: "#373940" }}
          >
            test
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlayerDetails;
