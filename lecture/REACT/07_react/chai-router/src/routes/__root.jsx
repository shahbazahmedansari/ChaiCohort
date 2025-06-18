import * as React from 'react';
import { Link, Outlet, createRootRoute } from '@tanstack/react-router';
import "../index.css";
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { useNotification } from '../context/NotificationContext';
import { createCartStore } from '../store/cartStore';

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const { count } = useNotification();
  const cartCount = createCartStore((state) => state.cart.length);
  const addToCart = createCartStore((state) => state.addToCart);
  return (
    <React.Fragment>
      <div>Hello "__root"!</div>
      <div>{count}</div>
      <div>{cartCount}</div>
      <div>{addToCart}</div>
      <div className='p-2 flex gap-2'>
        <Link to="/" className='[&.active]:font-bold'>Home</Link>{" "}
        <Link to="/about" className='[&.active]:font-bold'>About</Link>{" "}
        <Link to="/products" className='[&.active]:font-bold'>Products</Link>
      </div>
      <hr />

      <Outlet />
      <TanStackRouterDevtools />
    </React.Fragment>
  );
}
