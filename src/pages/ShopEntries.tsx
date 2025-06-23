import { useEffect, useState } from 'react';
import { ShopDetails } from '../components/types';
import ItemToolTip from '../components/ItemToolTip';
import { getItemImage } from '../utils';
import glintImage from "../assets/glint.png";

function ShopEntries() {
    const pathname = window.location.pathname.replace(/\/players\//, '');
    const fallbackSrc = "src/assets/no_item_image.png";

    const [shopData, setShopData] = useState<ShopDetails[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const getItem = async (pathname: string) => {
        try {
            const response = await fetch(`/api/shops/${pathname}`);
            if (!response.ok) {
                throw new Error('An Error Occurred.');
            }
            const shopsJson = await response.json();
            return shopsJson;
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
    }

    return (
        <>
            <div className="pt-3 ps-3 pe-3 d-flex flex-column">
                {shopData.map((item) => {
                    const imageSrc = getItemImage(item.itemStack.item);

                    return (
                        <div className="shop-entry mb-3" key={item.id}>
                            <h2>{item.ownerName}'s Shop</h2>
                            <p>Owner UUID: {item.ownerUuid}</p>
                            <p>Dimension: {item.dimension}</p>
                            <p>Position: {`(${item.position.x}, ${item.position.y}, ${item.position.z})`}</p>
                            <p>Item Stack: {JSON.stringify(item.itemStack)}</p>
                            <p>Price: ${item.price.toFixed(2)}</p>

                            <ItemToolTip itemStack={item.itemStack}>
                                <img
                                    onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.src = fallbackSrc;
                                    }}
                                    src={imageSrc}
                                    className="me-2 standard-item"
                                />
                                {glintEffect(item)}
                            </ItemToolTip>
                        </div>
                    );
                })}
            </div>
        </>
    );
}

export default ShopEntries;
