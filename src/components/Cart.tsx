import CartLineItem from './CartLineItem'
import useCart from '../hooks/useCart'
import { useState } from 'react'

const Cart = () => {
	const [confirm, setConfirm] = useState<boolean>(false)
	const { dispatch, REDUCER_ACTIONS, totalItems, totalPrice, cart } = useCart()

	const onSubmitOrder = () => {
		dispatch({ type: REDUCER_ACTIONS.SUBMIT })
		setConfirm(true)
	}

	const pageContent = confirm ? (
		<h2>Thank you for your order.</h2>
	) : (
		<>
			<h2 className='offscreen'>Cart</h2>
			<ul className='cart'>
				{cart.map((product) => (
					<CartLineItem
						key={product.sku}
						product={product}
						dispatch={dispatch}
						REDUCER_ACTIONS={REDUCER_ACTIONS}
					/>
				))}
			</ul>
			<div className='cart__totals'>
				<p>Total Items: {totalItems}</p>
				<p>Total Price: {totalPrice}</p>
				<button className='cart__submit' disabled={!totalItems} onClick={onSubmitOrder}>
					Submit
				</button>
			</div>
		</>
	)

	const content = <main className='main main--cart'>{pageContent}</main>

	return content
}

export default Cart
