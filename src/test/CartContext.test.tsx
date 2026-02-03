import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { CartProvider, useCart } from '../contexts/CartContext';

// Mock analytics
vi.mock('../lib/analytics', () => ({
  ecommerce: {
    addToCart: vi.fn(),
    removeFromCart: vi.fn(),
  },
}));

describe('CartContext', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  it('should initialize with empty cart', () => {
    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider,
    });

    expect(result.current.items).toEqual([]);
    expect(result.current.totalItems).toBe(0);
    expect(result.current.totalPrice).toBe(0);
  });

  it('should add item to cart', () => {
    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider,
    });

    const testItem = {
      id: 'test-1',
      name: 'Test Hat',
      price: 50,
      image: '/test.jpg',
      variant: 'Black',
      shopifyVariantId: 'gid://shopify/ProductVariant/123',
    };

    act(() => {
      result.current.addItem(testItem);
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0]).toMatchObject({
      ...testItem,
      quantity: 1,
    });
    expect(result.current.totalItems).toBe(1);
    expect(result.current.totalPrice).toBe(50);
  });

  it('should increment quantity when adding existing item', () => {
    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider,
    });

    const testItem = {
      id: 'test-1',
      name: 'Test Hat',
      price: 50,
      image: '/test.jpg',
    };

    act(() => {
      result.current.addItem(testItem);
      result.current.addItem(testItem);
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].quantity).toBe(2);
    expect(result.current.totalItems).toBe(2);
    expect(result.current.totalPrice).toBe(100);
  });

  it('should remove item from cart', () => {
    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider,
    });

    const testItem = {
      id: 'test-1',
      name: 'Test Hat',
      price: 50,
      image: '/test.jpg',
    };

    act(() => {
      result.current.addItem(testItem);
      result.current.removeItem('test-1');
    });

    expect(result.current.items).toHaveLength(0);
    expect(result.current.totalItems).toBe(0);
    expect(result.current.totalPrice).toBe(0);
  });

  it('should update item quantity', () => {
    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider,
    });

    const testItem = {
      id: 'test-1',
      name: 'Test Hat',
      price: 50,
      image: '/test.jpg',
    };

    act(() => {
      result.current.addItem(testItem);
      result.current.updateQuantity('test-1', 3);
    });

    expect(result.current.items[0].quantity).toBe(3);
    expect(result.current.totalItems).toBe(3);
    expect(result.current.totalPrice).toBe(150);
  });

  it('should remove item when updating quantity to 0', () => {
    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider,
    });

    const testItem = {
      id: 'test-1',
      name: 'Test Hat',
      price: 50,
      image: '/test.jpg',
    };

    act(() => {
      result.current.addItem(testItem);
      result.current.updateQuantity('test-1', 0);
    });

    expect(result.current.items).toHaveLength(0);
  });

  it('should clear all items from cart', () => {
    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider,
    });

    const testItem1 = {
      id: 'test-1',
      name: 'Test Hat 1',
      price: 50,
      image: '/test1.jpg',
    };

    const testItem2 = {
      id: 'test-2',
      name: 'Test Hat 2',
      price: 75,
      image: '/test2.jpg',
    };

    act(() => {
      result.current.addItem(testItem1);
      result.current.addItem(testItem2);
      result.current.clearCart();
    });

    expect(result.current.items).toHaveLength(0);
    expect(result.current.totalItems).toBe(0);
    expect(result.current.totalPrice).toBe(0);
  });

  it('should calculate total price correctly with multiple items', () => {
    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider,
    });

    const testItem1 = {
      id: 'test-1',
      name: 'Test Hat 1',
      price: 50,
      image: '/test1.jpg',
    };

    const testItem2 = {
      id: 'test-2',
      name: 'Test Hat 2',
      price: 75,
      image: '/test2.jpg',
    };

    act(() => {
      result.current.addItem(testItem1);
      result.current.addItem(testItem1); // 2x $50 = $100
      result.current.addItem(testItem2); // 1x $75 = $75
    });

    expect(result.current.totalItems).toBe(3);
    expect(result.current.totalPrice).toBe(175);
  });

  it('should persist cart to localStorage', () => {
    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider,
    });

    const testItem = {
      id: 'test-1',
      name: 'Test Hat',
      price: 50,
      image: '/test.jpg',
    };

    act(() => {
      result.current.addItem(testItem);
    });

    const stored = localStorage.getItem('aspenova_cart');
    expect(stored).toBeTruthy();
    
    const parsed = JSON.parse(stored!);
    expect(parsed).toHaveLength(1);
    expect(parsed[0]).toMatchObject({
      ...testItem,
      quantity: 1,
    });
  });

  it('should load cart from localStorage on mount', () => {
    // Pre-populate localStorage
    const testItem = {
      id: 'test-1',
      name: 'Test Hat',
      price: 50,
      image: '/test.jpg',
      quantity: 2,
    };

    localStorage.setItem('aspenova_cart', JSON.stringify([testItem]));

    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider,
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0]).toMatchObject(testItem);
    expect(result.current.totalItems).toBe(2);
  });

  it('should open cart when adding item', () => {
    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider,
    });

    const testItem = {
      id: 'test-1',
      name: 'Test Hat',
      price: 50,
      image: '/test.jpg',
    };

    expect(result.current.isOpen).toBe(false);

    act(() => {
      result.current.addItem(testItem);
    });

    expect(result.current.isOpen).toBe(true);
  });

  it('should toggle cart open/close', () => {
    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider,
    });

    expect(result.current.isOpen).toBe(false);

    act(() => {
      result.current.openCart();
    });

    expect(result.current.isOpen).toBe(true);

    act(() => {
      result.current.closeCart();
    });

    expect(result.current.isOpen).toBe(false);
  });
});
