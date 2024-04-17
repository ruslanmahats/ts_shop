import { CartItemType, ReducerAction, ReducerActionType } from '../context/CartProvider'
import { ChangeEvent, ReactElement, memo } from 'react'

type CartLineItemProps = {
	product: CartItemType
	dispatch: React.Dispatch<ReducerAction>
	REDUCER_ACTIONS: ReducerActionType
}

const CartLineItem = ({ product, dispatch, REDUCER_ACTIONS }: CartLineItemProps) => {
	const img: string = new URL(`../images/${product.sku}.jpg`, import.meta.url).href

	const lineTotal: number = product.qty * product.price

	const highestQty: number = 20 > product.qty ? 20 : product.qty

	const optionValues: number[] = [...Array(highestQty).keys()].map((i) => i + 1)

	const options: ReactElement[] = optionValues.map((val) => (
		<option key={`opt${val}`} value={val}>
			{val}
		</option>
	))

	const onChangeQty = (e: ChangeEvent<HTMLSelectElement>) => {
		dispatch({
			type: REDUCER_ACTIONS.QUANTITY,
			payload: {
				sku: product.sku,
				name: product.name,
				price: product.price,
				qty: +e.target.value,
			},
		})
	}

	const onRemoveFromCart = () => dispatch({ type: REDUCER_ACTIONS.REMOVE, payload: product })

	const content = (
		<li className='cart__item'>
			<img src={img} alt={product.name} className='cart__img' />
			<div aria-label='Product name'>{product.name}</div>
			<div aria-label='Price Per Item'>
				{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(product.price)}
			</div>

			<label htmlFor='itemQty' className='offscreen'>
				Item Quantity
			</label>

			<select
				name='itemQty'
				id='itemQty'
				className='cart__select'
				value={product.qty}
				aria-label='Item Quantity'
				onChange={onChangeQty}>
				{options}
			</select>

			<div className='cart__item-subtotal' aria-label='Line Item Subtotal'>
				{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(lineTotal)}
			</div>

			<button
				className='cart__button'
				aria-label='Remove Item From Cart'
				title='Remove Item From Cart'
				onClick={onRemoveFromCart}>
				❌
			</button>
		</li>
	)

	return content
}

const areItemsEqual = ({ product: prevItem }: CartLineItemProps, { product: nextItem }: CartLineItemProps) => {
	return Object.keys(prevItem).every((key) => {
		return prevItem[key as keyof CartItemType] === nextItem[key as keyof CartItemType]
	})
}

const MemoizedCartLineItem = memo<typeof CartLineItem>(CartLineItem, areItemsEqual)

export default MemoizedCartLineItem
