import React, { useState } from 'react'
import { Route } from 'react-router-dom'
import data from './data'

// Components
import Navigation from './components/Navigation'
import Products from './components/Products'
import ShoppingCart from './components/ShoppingCart'

// Contexts
import { ProductContext } from './contexts/ProductContext'
import { CartContext } from './contexts/CartContext'

// Hooks
import useLocalStorage from './hooks/useLocalStorage'

function App() {
	const [products] = useState(data)
	const [cart, setCart] = useLocalStorage('prevCart', [])

	const addItem = item => {
		!cart.includes(item) ? setCart([...cart, item]) : setCart([...cart])
	}

	const removeItem = id => {
		cart.map((item, index) => {
			if (id === item.id) {
				let newCart = [...cart]
				newCart.splice(index, 1)
				setCart(newCart)
			}
		})
	}

	return (
		<ProductContext.Provider value ={{products, addItem}}>
			<CartContext.Provider value ={{cart, removeItem}}>
				<div className="App">
					<Navigation />

					{/* Routes */}
					<Route exact path="/" component={Products}/>

					<Route path="/cart" component={ShoppingCart}/>
				</div>
			</CartContext.Provider>
		</ProductContext.Provider>
	)
}

export default App
