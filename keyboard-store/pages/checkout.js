import Layout from "@/components/Layout";
import { ProductsContext } from "@/components/ProductsContext";
import { useContext, useEffect, useState } from "react";

export default function Checkout() {
    const {selectedProducts, setSelectedProducts} = useContext(ProductsContext)
    const [productsInfo, setProductsInfo] = useState([]);
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

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
        const pos = selectedProducts.indexOf(id);
        if (pos !== -1) {
          setSelectedProducts( prev => {
            return prev.filter((value,index) => index !== pos);
          });
        }
      }
    const deliveryPrice = 5;
    let Subtotal = 0;
    if (selectedProducts?.length) {
        for (let id of selectedProducts){
            const price = productsInfo.find(p => p._id === id)?.price || 0;
            Subtotal += price;
        }
    }
    const total = Subtotal + deliveryPrice

    return (
        <Layout>
            {!productsInfo.length && (
                <div>no products in your shopping cart</div>
            )}
            {productsInfo.length && productsInfo.map(productInfo => {
                const amount = selectedProducts.filter(id => id === productInfo._id).length;
                if (amount === 0) return;
                return (
                <div className="flex mb-5" key={productInfo}>
                    <div className="bg-slate-200 p-3 rounded-xl shrink-0">
                        <img className="w-24" src={productInfo.picture} alt=""></img>
                    </div>
                    <div className="pl-4">
                        <h3 className="font-bold text-lg">{productInfo.name}</h3>
                        <p className="text-sm leading-4 text-slate-200">{productInfo.description}</p>
                        <div className="flex">
                            <div className="grow">
                                ${productInfo.price}
                            </div>
                            <div>
                                <button onClick={() => lessOfThisProduct(productInfo._id)} className="border border-violet-500 rounded-lg px-2 ">-</button>
                                <span className="px-2">
                                    {selectedProducts.filter(id => id === productInfo._id).length}
                                </span>
                                <button onClick={() => moreOfThisProduct(productInfo._id)} className="bg-violet-500 rounded-lg px-2 text-white ">+</button>
                            </div>
                        </div>
                    </div>
                </div>
                
            )})}
            <form action="/api/checkout" method="POST">
                <div className="mt-4">
                    <input name="address" onChange={e => setAddress(e.target.value)} value={address} className="bg-slate-100 w-full rounded-lg px-4 py-2 mb-2"type="text" placeholder="Street address, number"/>
                    <input name="city" onChange={e => setCity(e.target.value)} value={city} className="bg-slate-100 w-full rounded-lg px-4 py-2 mb-2"type="text" placeholder="City and postal code"/>
                    <input name="name" onChange={e => setName(e.target.value)} value={name} className="bg-slate-100 w-full rounded-lg px-4 py-2 mb-2"type="text" placeholder="Your name"/>
                    <input name="email" onChange={e => setEmail(e.target.value)} value={email} className="bg-slate-100 w-full rounded-lg px-4 py-2 mb-2"type="email" placeholder="Email Address"/>
                </div>
                <div className="mt-4">
                    <div className="flex my-3">
                        <h3 className="grow font-bold text-slate-400">Subtotal:</h3>
                        <h3 className="font-bold">${Subtotal}</h3>
                    </div>
                    <div className="flex my-3">
                        <h3 className="grow font-bold text-slate-400">Delivery:</h3>
                        <h3 className="font-bold">${deliveryPrice}</h3>
                    </div>
                    <div className="flex my-3 border-t-2 pt-3 border-violet-500">
                        <h3 className="grow font-bold text-slate-400">Total:</h3>
                        <h3 className="font-bold">${total}</h3>
                    </div>
                </div>
            
                <input type="hidden" name="products" value={selectedProducts.join(',')}></input>
                <button type="submit" className="bg-violet-500 py-2 px-5 rounded-xl font-bold text-white w-full my-4 shadow-md shadow-lg">Pay ${total}</button>
            </form>
        </Layout>
    );
}