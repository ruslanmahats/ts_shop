import CartContext, { UseCartContextType } from '../context/CartProvider'

import { useContext } from 'react'

const useCart = (): UseCartContextType => useContext(CartContext)

export default useCart
