import { createContext, useState } from "react"


//const initState: ProductType[] = []
const initState = [
    {
        "sku": "item0001",
        "name": "Widget",
        "price": 9.99
    },
    {
        "sku": "item0002",
        "name": "Premium Widget",
        "price": 19.99
    },
    {
        "sku": "item0003",
        "name": "Deluxe Widget",
        "price": 29.99
    }

]


const initContextState = { products: [] }

const ProductsContext = createContext(initContextState)


// eslint-disable-next-line react/prop-types
export const ProductsProvider = ({ children }) => {
    const [products] = useState(initState)

    // useEffect(() => {
    //     const fetchProducts = async (): Promise<ProductType[]> => {
    //         const data = await fetch('http://localhost:3500/products').then(res => {
    //             return res.json()
    //         }).catch(err => {
    //             if (err instanceof Error) console.log(err.message)
    //         })
    //         return data
    //     }

    //     fetchProducts().then(products => setProducts(products))
    // }, [])

    return (
    <ProductsContext.Provider value={{products}}>
            {children}
        </ProductsContext.Provider>
    )

}

export default ProductsContext 