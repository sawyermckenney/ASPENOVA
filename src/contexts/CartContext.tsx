import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { ecommerce } from '../lib/analytics';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  variant?: string;
  color?: string;
  shopifyVariantId?: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'aspenova_cart';

// Load cart from localStorage
function loadCartFromStorage(): CartItem[] {
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('[Cart] Failed to load from localStorage:', error);
  }
  return [];
}

// Save cart to localStorage
function saveCartToStorage(items: CartItem[]) {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  } catch (error) {
    console.error('[Cart] Failed to save to localStorage:', error);
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(loadCartFromStorage);
  const [isOpen, setIsOpen] = useState(false);

  // Persist cart to localStorage whenever items change
  useEffect(() => {
    saveCartToStorage(items);
  }, [items]);

  const addItem = (newItem: Omit<CartItem, 'quantity'>) => {
    setItems((current) => {
      const existing = current.find((item) => item.id === newItem.id);
      if (existing) {
        // Track analytics for adding existing item
        ecommerce.addToCart({
          id: newItem.id,
          name: newItem.name,
          price: newItem.price,
          quantity: 1,
          variant: newItem.variant,
        });
        
        return current.map((item) =>
          item.id === newItem.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      
      // Track analytics for new item
      ecommerce.addToCart({
        id: newItem.id,
        name: newItem.name,
        price: newItem.price,
        quantity: 1,
        variant: newItem.variant,
      });
      
      return [...current, { ...newItem, quantity: 1 }];
    });
    setIsOpen(true);
  };

  const removeItem = (id: string) => {
    setItems((current) => {
      const item = current.find((item) => item.id === id);
      if (item) {
        // Track analytics for item removal
        ecommerce.removeFromCart({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        });
      }
      return current.filter((item) => item.id !== id);
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }

    setItems((current) =>
      current.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => setItems([]);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  const totalItems = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );
  const totalPrice = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items]
  );

  const value = useMemo(
    () => ({
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      isOpen,
      openCart,
      closeCart,
      totalItems,
      totalPrice,
    }),
    [items, isOpen, totalItems, totalPrice]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

