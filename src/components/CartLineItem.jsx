/* eslint-disable react/prop-types */
import { useMemo } from "react"


// eslint-disable-next-line react/prop-types
const CartLineItem = ( {item, dispatch, REDUCER_ACTIONS} ) => {

    // eslint-disable-next-line react/prop-types
    const img = new URL(`../images/${item.sku}.jpg`, import.meta.url).href

    // eslint-disable-next-line react/prop-types
    const lineTotal = (item.qty * item.price)

    // eslint-disable-next-line react/prop-types
    const highestQty = 20 > item.qty ? 20 : item.qty

    const optionValues = useMemo(() => {
            return [...Array(highestQty).keys()].map(i => i + 1)
    },[highestQty])

    const options = optionValues.map(val => {
        return <option key={`opt${val}`} value={val}>{val}</option>
    })

    const onChangeQty = (e) => {
        dispatch({
            // eslint-disable-next-line react/prop-types
            type: REDUCER_ACTIONS.QUANTITY,
            payload: { ...item, qty: Number(e.target.value) }
        })
    }

    const onRemoveFromCart = () => dispatch({
        // eslint-disable-next-line react/prop-types
        type: REDUCER_ACTIONS.REMOVE,
        payload: item,
    })

    const content = (
        <li className="cart__item">
            <img src={img} alt={item.name} className="cart__img" />
            <div aria-label="Item Name">{item.name}</div>
            <div aria-label="Price Per Item">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(item.price)}</div>

            <label htmlFor="itemQty" className="offscreen">
                Item Quantity
            </label>
            <select
                name="itemQty"
                id="itemQty"
                className="cart__select"
                value={item.qty}
                aria-label="Item Quantity"
                onChange={onChangeQty}
            >{options}</select>

            <div className="cart__item-subtotal" aria-label="Line Item Subtotal">
                {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(lineTotal)}
            </div>

            <button
                className="cart__button"
                aria-label="Remove Item From Cart"
                title="Remove Item From Cart"
                onClick={onRemoveFromCart}
            >
                ❌
            </button>
        </li>
    )

    return content
}

// function areItemsEqual({ item: prevItem }, { item: nextItem }) {
//     return Object.keys(prevItem).every(key => {
//         return prevItem[key] === nextItem[key]
//     })
// }

// const MemoizedCartLineItem = memo(CartLineItem, areItemsEqual)

// export default MemoizedCartLineItem

export default CartLineItem