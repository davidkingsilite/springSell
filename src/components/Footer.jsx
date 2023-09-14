import useCart from "../hooks/useCart"


// eslint-disable-next-line react/prop-types
const Footer = ( {viewCart} ) => {
    const { totalItems, totalPrice } = useCart()

    const year = new Date().getFullYear()

    const pageContent = viewCart
        ? <p>Shopping Cart &copy; {year}</p>
        : (
            <>
                <p>Total Items: {totalItems}</p>
                <p>Total Price: {totalPrice}</p>
                <p>Shopping Cart &copy; {year}</p>
            </>
        )

    const content = (
        <footer className="footer">
            {pageContent}
        </footer>
    )

    return content
}
export default Footer