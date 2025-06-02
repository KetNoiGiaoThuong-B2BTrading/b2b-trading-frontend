import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';
import router from './router/index.tsx';
import { ToastProvider } from './context/ToastContext.tsx';
import { CartProvider } from './context/CardContext.tsx';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ToastProvider>
            <CartProvider>
                <RouterProvider router={router} />
            </CartProvider>
        </ToastProvider>
    </StrictMode>,
);
