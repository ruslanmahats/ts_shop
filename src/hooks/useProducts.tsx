import { ProductsContext, UseProductsContextType } from '../context/ProductsProvider'

import { useContext } from 'react'

const useProducts = (): UseProductsContextType => useContext(ProductsContext)

export default useProducts
