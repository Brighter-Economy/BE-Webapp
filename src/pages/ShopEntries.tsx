import { useEffect, useState } from 'react';
import { ShopDetails } from '../components/types';
import ItemToolTip from '../components/ItemToolTip';
import { getItemImage } from '../utils';
import glintImage from "../assets/glint.png";

function ShopEntries() {
    const pathname = window.location.pathname.replace(/\/players\//, '');
    const fallbackSrc = "src/assets/no_item_image.png";

    const [shopData, setShopData] = useState<ShopDetails | null>(null);
    const [imageSrc, setImageSrc] = useState<string>(fallbackSrc);
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

    useEffect(() => {
        if (shopData && shopData.itemStack) {
            setImageSrc(getItemImage(shopData.itemStack.item));
        }
    }, [shopData]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const glintEffect = () =>
        shopData && shopData.itemStack.enchantments.length > 0 && (
            <div className="item-mask" style={{ maskImage: `url("${imageSrc}")` }}>
                <img src={glintImage} className="glint" />
            </div>
        );

    return (
        <>
            <div className="pt-3 ps-3 pe-3 d-flex flex-column">
                {shopData ? (
                    <div className="shop-entry mb-3">
                        <h2>{shopData.ownerName}'s Shop</h2>
                        <p>Owner UUID: {shopData.ownerUuid}</p>
                        <p>Dimension: {shopData.dimension}</p>
                        <p>Position: {`(${shopData.position.x}, ${shopData.position.y}, ${shopData.position.z})`}</p>
                        <p>Item Stack: {JSON.stringify(shopData.itemStack)}</p>
                        <p>Price: ${shopData.price.toFixed(2)}</p>

                        <ItemToolTip itemStack={shopData.itemStack}>
                            <img
                                onError={() =>
                                    imageSrc !== fallbackSrc && setImageSrc(fallbackSrc)
                                }
                                src={imageSrc}
                                className="me-2 standard-item"
                            />
                            {glintEffect()}
                        </ItemToolTip>
                    </div>
                ) : (
                    <p>No shop entry found.</p>
                )}
            </div>
        </>
    );
}

export default ShopEntries;
