import Layout from "@/components/Layout";
import { ProductsContext } from "@/components/ProductsContext";
import { useContext, useEffect, useState } from "react";

export default function Checkout() {
    const {selectedProducts, setSelectedProducts} = useContext(ProductsContext)
    const [productsInfo, setProductsInfo] = useState([]);
    
    useEffect(() => {
    const uniqueIds = [...new Set(selectedProducts)];
        fetch('/api/products?ids=' +uniqueIds.join(','))
        .then(Response => Response.json()
        .then(json => setProductsInfo(json)));
    }, [selectedProducts]);

    function moreOfThisProduct(id) {
        setSelectedProducts(prev => [...prev,id])
    }
    function lessOfThisProduct(id) {

    }


    return (
        <Layout>
            {!productsInfo.length && (
                <div>no products in your shopping cart</div>
            )}
            {productsInfo.length && productsInfo.map(productInfo => (
                <div className="flex mb-5">
                    <div className="bg-gray-100 p-3 rounded-xl shrink-0">
                        <img className="w-24" src={productInfo.picture} alt=""></img>
                    </div>
                    <div className="pl-4">
                        <h3 className="font-bold text-lg">{productInfo.name}</h3>
                        <p className="text-sm leading-4 text-gray-500">{productInfo.description}</p>
                        <div className="flex">
                            <div className="grow">
                                ${productInfo.price}
                            </div>
                            <div>
                                <button className="border border-emerald-500 rounded-lg px-2 ">-</button>
                                <span className="px-2">
                                    {selectedProducts.filter(id => id === productInfo._id).length}
                                </span>
                                <button onClick={() => moreOfThisProduct(productInfo._id)} className="bg-emerald-500 rounded-lg px-2 text-white ">+</button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </Layout>
    );
}