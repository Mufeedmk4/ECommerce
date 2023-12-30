import { useContext } from "react"
import { ProductsContext } from "./ProductsContext"

export default function Product({_id, name, price, description, picture}) {
    const {setSelectedProducts} =useContext(ProductsContext);
    function addProduct() {
        setSelectedProducts(prev => [...prev,_id])
    }
    return (
        <div className="w-64">
            <div className="bg-white p-5 rounded-xl shadow-md border-violet-200 border">
              <img className="rounded-lg" src={picture} alt="milky yellow switches"></img>
            </div>
            <div className="mt-2">
              <h3 className="font-bold text-lg text-neutral-950">{name}</h3>
            </div>
            <p className="text-sm mt-1 leading-4 text-neutral-800">{description}</p>
            <div className="flex mt-1">
              <div className="text-2xl font-bold grow">${price}</div>
              <button onClick={addProduct} className="bg-violet-500 text-white py-1nb px-3 rounded-xl">+</button>
            </div>
          </div>
    )
}