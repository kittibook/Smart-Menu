import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Product from './pages/customer/product.tsx';
import { CartProvider } from './Contexts/Cart/CartContext.tsx';
import Cart from './pages/customer/cart.tsx';
import Summary from './pages/customer/payment.tsx';
import Transfer from './pages/customer/transfer.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      { path: "", element: <App /> },
      { path: "product/:id", element: <Product /> },
      { path: "cart", element: <Cart /> },
      { path: "payment", element: <Summary /> },
      { path: "transfer", element: <Transfer /> },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  </StrictMode>
)
