/* eslint-disable react/prop-types */


// eslint-disable-next-line react/prop-types
const Product = ({ product, dispatch, REDUCER_ACTIONS, inCart }) => {

    const img = new URL(`../images/${product.sku}.jpg`, import.meta.url).href
    console.log(img)

    const onAddToCart = () => dispatch({ type: REDUCER_ACTIONS.ADD, payload: { ...product, qty: 1 } })

    const itemInCart = inCart ? ' → Item in Cart: ✔️' : null

    const content =
        <article className="product">
            <h3>{product.name}</h3>
            <img src={img} alt={product.name} className="product__img" />
            <p>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(product.price)}{itemInCart}</p>
            <button onClick={onAddToCart}>Add to Cart</button>
        </article>

    return content
}

// function areProductsEqual({ product: prevProduct, inCart: prevInCart }, { product: nextProduct, inCart: nextInCart }) {
//     return (
//         Object.keys(prevProduct).every(key => {
//             return prevProduct[key] ===
//                 nextProduct[key]
//         }) && prevInCart === nextInCart
//     )
// }
// const MemoizedProduct = memo(Product, areProductsEqual)

// export default MemoizedProduct

export default Product