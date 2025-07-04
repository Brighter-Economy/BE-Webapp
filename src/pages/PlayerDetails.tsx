import { useEffect, useState } from 'react';
import { ShopDetails } from '../components/types';
import ItemToolTip from '../components/ItemToolTip';
import { getItemImage } from '../utils';
import glintImage from "../assets/glint.png";

function PlayerDetails() {
    const pathname = window.location.pathname.replace(/\/players\//, '');
    const fallbackSrc = "src/assets/no_item_image.png";

    const [shopData, setShopData] = useState<ShopDetails[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [accountInfo, setAccountInfo] = useState<{ username: string; uuid: string } | null>(null);
    const [selectedShop, setSelectedShop] = useState<ShopDetails | null>(null);

    const getItem = async (pathname: string) => {
        try {
            const response = await fetch(`/api/shops`);
            if (!response.ok) {
                throw new Error('An Error Occurred.');
            }
            const shopsJson = await response.json();
            const filteredShops = shopsJson.filter((shop: ShopDetails) => shop.ownerUuid === pathname);
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
                throw new Error('An Error Occurred.');
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
                    setAccountInfo({ username: 'Unknown', uuid: 'Unknown' });
                }

                setSelectedShop(shopData[0]);
            }
        };

        fetchAccountInfo();
    }, [shopData]);

    const handleShopChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedShopId = event.target.value;
        const shop = shopData.find(item => item.id === selectedShopId) || null;
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
                <div className="item-mask" style={{ maskImage: `url("${getItemImage(item.itemStack.item)}")` }} key={item.id}>
                    <img src={glintImage} className="glint" />
                </div>
            );
        }
        return null;
    };

    return (
        <>
            <div className="pt-3 ps-3 pe-3 d-flex flex-column">
                {accountInfo && (
                    <>
                        <h2>{accountInfo.username}'s Shops</h2>
                        <div className="input-group mb-2" style={{ width: '57.5%' }}>
                            <span className="input-group-text">UUID</span>
                            <input
                                type="text"
                                className="form-control"
                                disabled={true}
                                value={accountInfo.uuid}
                            />
                        </div>
                    </>
                )}

                <div className="mb-3">
                    <br />
                    <label htmlFor="shopSelect" className="form-label">Select a Shop</label>
                    <select id="shopSelect" className="form-select" onChange={handleShopChange}>
                        {shopData.map((item) => (
                            <option key={item.id} value={item.id}>
                                {item.itemStack.item} - ${item.price.toFixed(2)}
                            </option>
                        ))}
                    </select>
                </div>

                {selectedShop && (
                    <div className="shop-entry mb-3 border p-3 rounded">
                        <div className="input-group mb-2" style={{ width: '57.5%' }}>
                            <span className="input-group-text">Dimension</span>
                            <input
                                type="text"
                                className="form-control"
                                disabled={true}
                                value={selectedShop.dimension}
                            />
                        </div>
                        <div className="input-group mb-2" style={{ width: '57.5%' }}>
                            <span className="input-group-text">Position</span>
                            <input
                                type="text"
                                className="form-control"
                                disabled={true}
                                value={[selectedShop.position.x, selectedShop.position.y, selectedShop.position.z].join(', ')}
                            />
                        </div>
                        <div className="input-group mb-2" style={{ width: '57.5%' }}>
                            <span className="input-group-text">Custom Name</span>
                            <input
                                type="text"
                                className="form-control"
                                disabled={true}
                                value={selectedShop.itemStack.customName || 'None'}
                            />
                        </div>
                        <div className="input-group mb-2" style={{ width: '57.5%' }}>
                            <span className="input-group-text">Custom Lore</span>
                            <input
                                type="text"
                                className="form-control"
                                disabled={true}
                                value={selectedShop.itemStack.lore || 'None'}
                            />
                        </div>

                        <div className="input-group mb-2" style={{ width: '57.5%' }}>
                            <span className="input-group-text">Price</span>
                            <input
                                type="text"
                                className="form-control"
                                disabled={true}
                                value={selectedShop.price.toFixed(2)}
                            />
                        </div>

                        <div className="border p-2 rounded col-2 align-items-center d-flex justify-content-center">
                            <ItemToolTip itemStack={selectedShop.itemStack}>
                                <img
                                    onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.src = fallbackSrc;
                                    }}
                                    src={getItemImage(selectedShop.itemStack.item)}
                                    className="standard-item"
                                />
                                {glintEffect(selectedShop)}
                            </ItemToolTip>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default PlayerDetails;