import { ReactElement, createContext, useEffect, useState } from 'react'

export type ProductType = {
	sku: string
	name: string
	price: number
}

export type UseProductsContextType = {
	products: ProductType[]
}

type ChildrenType = { children?: ReactElement | ReactElement[] }

const initState: ProductType[] = []

const initContextState: UseProductsContextType = { products: [] }

export const ProductsContext = createContext<UseProductsContextType>(initContextState)

export const ProductsProvider = ({ children }: ChildrenType) => {
	const [products, setProducts] = useState<ProductType[]>(initState)

	useEffect(() => {
		const fetchProducts = async (): Promise<ProductType[]> => {
			const data = await fetch('./../../data/products.json')
				.then((res) => res.json())
				.catch((error) => {
					if (error instanceof Error) console.log(error.message)
				})
			return data
		}

		fetchProducts().then((products) => setProducts(products))
	}, [])

	return <ProductsContext.Provider value={{ products }}>{children}</ProductsContext.Provider>
}
