import { createContext, useContext, useState, ReactNode } from 'react';

type CartItem = {
    productID: number;
    productName: string;
    unitPrice: number;
    stockQuantity: number;
    status: string;
    createdDate: string;
};

type CartContextType = {
    cart: CartItem[];
    addToCart: (item: CartItem) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cart, setCart] = useState<CartItem[]>([]);

    const addToCart = (item: CartItem) => {
        setCart((prevCart) => {
            const index = prevCart.findIndex((i) => i.productID === item.productID);
            if (index !== -1) {
                const updatedCart = [...prevCart];
                updatedCart[index] = { ...updatedCart[index], stockQuantity: item.stockQuantity };
                return updatedCart;
            } else {
                return [...prevCart, item];
            }
        });
    };

    return <CartContext.Provider value={{ cart, addToCart }}>{children}</CartContext.Provider>;
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error('useCart must be used within a CartProvider');
    return context;
};
