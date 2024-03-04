import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from "./app/store"
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Productsection from './components/Productsection.jsx'
import Product from './components/Product.jsx'
import './index.css'
import Cart from './components/cart.jsx'
import Memoproduct from './components/Product.jsx'
import Login from './components/login.jsx'
import Searchcomponent from './components/search.jsx'
import Scrolltotop from './components/scrolltotop.jsx'
import Pagenotfound from './components/pagenotfound.jsx'
import Historycomponent from './components/History.jsx'
import Checkout from './components/Checkout.jsx'
// import { ErrorBoundary } from 'react-error-boundary'

const router = createBrowserRouter([
    {
        path: '/',
        element: <>
            {/* <ErrorBoundary fallback={<div>something went wrong</div>}> */}
                <App />
                <Scrolltotop />
            {/* </ErrorBoundary> */}
        </>,
        children: [
            {
                path: '/',
                element: <Productsection />
            },
            {
                path: '/search/?',
                element: <Searchcomponent />,
            },
            {
                path: '/product/:id',
                element: <Memoproduct />
            },
            {
                path: '/cart',
                element: <Cart />
            },
            {
                path: '/history',
                element: <Historycomponent/>
            },
            {
                path: '/contact',
                element: <div>contact</div>
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/checkout',
                element: <Checkout/>
            },
            ,
            {
                path: '/buy/:id',
                element: <Checkout/>
            }, 
            {
                path: '*',
                element: <Pagenotfound />
            }
        ]
    }
])
ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
)
