import { useReducer, useMemo, createContext} from 'react'
import { REDUCER_ACTION_TYPE } from '../actionTypes/actionTypes'



// eslint-disable-next-line react-refresh/only-export-components
export const INITIAL_STATE = {
    sku: "",
    name: "",
    price: 0,
    qty: 0,
}

const initCartState = { cart:[]}

// eslint-disable-next-line react-refresh/only-export-components
export const reducer = (state, action) => {
    switch (action.type){
        case REDUCER_ACTION_TYPE.ADD: {
            if (!action.payload){
                throw new Error('action.payload missing in ADD action')
            }

            const { sku, name, price } = action.payload

            const filteredCart = state.cart.filter(item => item.sku !== sku)

            const itemExists = state.cart.find( item => item.sku === sku)

            const qty = itemExists ? itemExists.qty + 1 : 1

            return { ...state, cart: [...filteredCart, {sku, name, price, qty}] }
        }
        case REDUCER_ACTION_TYPE.REMOVE: {
            if (!action.payload) {
                throw new Error('action.payload missing in REMOVE action')
            }

            const { sku } = action.payload

            const filteredCart = state.cart.filter(item => item.sku !== sku)

            return { ...state, cart: [...filteredCart] }
        }
        case REDUCER_ACTION_TYPE.QUANTITY: {
            if (!action.payload) {
                throw new Error('action.payload missing in QUANTITY action')
            }

            const { sku, qty } = action.payload

            const itemExists = state.cart.find(item => item.sku === sku)

            if (!itemExists) {
                throw new Error('Item must exist in order to update quantity')
            }

            const updatedItem = { ...itemExists, qty }

            const filteredCart = state.cart.filter(item => item.sku !== sku)

            return { ...state, cart: [...filteredCart, updatedItem] }
        }
        case REDUCER_ACTION_TYPE.SUBMIT: {
            return { ...state, cart: [] }
        }

        default: 
            throw new Error(' Unidentified reducer action type')
    }
}

const useCartContext = (initCartState) => {
    const [state, dispatch] = useReducer(reducer, initCartState)

    const REDUCER_ACTIONS = useMemo(() => {
        return REDUCER_ACTION_TYPE
    }, [])

    const totalItems = state.cart.reduce((previousValue, cartItem) => {
        return previousValue + cartItem.qty
    }, 0)

    const totalPrice = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
        state.cart.reduce((previousValue, cartItem) => {
            return previousValue + (cartItem.qty * cartItem.price)
        }, 0)
    )

    const cart = state.cart.sort((a, b) => {
        const itemA = Number(a.sku.slice(-4))
        const itemB = Number(b.sku.slice(-4))
        return itemA - itemB
    })

    return { dispatch, REDUCER_ACTIONS, totalItems, totalPrice, cart }
}

const initCartContextState = {
    dispatch: () => { },
    REDUCER_ACTIONS: REDUCER_ACTION_TYPE,
    totalItems: 0,
    totalPrice: '',
    cart: [],
}

const CartContext =  createContext(initCartContextState)


// eslint-disable-next-line react/prop-types
export const CartProvider = ({children}) => {
    return (
        <CartContext.Provider value={useCartContext(initCartState)}>
            {children}
        </CartContext.Provider>
    )
}

export default CartContext