import Product from "@/components/Product";
import {useEffect, useState} from "react";




export default function Home() {
  const [productsInfo, setProductsInfo] = useState([]);
  useEffect (() => {
    fetch('/api/products') 
    .then(response => response.json())
    .then(json => setProductsInfo(json));
  }, []);

  const categoriesNames = [...new Set(productsInfo.map(p => p.category))];

  console.log(categoriesNames)
  return (
    <div className="p-5">
      <div>
        {categoriesNames.map(categoryName => (
          <div key={categoryName}>
            <h2 className="text-2xl capitalize">{categoryName}</h2>
            {productsInfo.filter(p => p.category === categoryName).map(productInfo => (
              <div>
                <Product {...productInfo}/>
              </div>
            ))}
          </div>

        ))}

        <div className="py-4">
          
        </div>
      </div>
    </div>
  )
}
