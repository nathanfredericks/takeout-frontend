"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  merchantId: number;
  description?: string;
}

interface MerchantCart {
  items: CartItem[];
}

interface CartContextType {
  items: CartItem[];
  merchantId: number | null;
  setMerchantId: (id: number) => void;
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (itemId: number) => void;
  updateQuantity: (itemId: number, quantity: number) => void;
  clearCart: () => void;
  clearMerchantCart: (merchantId: number) => void;
  getTotal: () => number;
  getTotalItems: () => number;
  getMerchantItems: (merchantId: number) => CartItem[];
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [merchantCarts, setMerchantCarts] = useState<
    Record<number, MerchantCart>
  >({});
  const [currentMerchantId, setCurrentMerchantId] = useState<number | null>(
    null,
  );

  const getMerchantItems = (merchantId: number) => {
    return merchantCarts[merchantId]?.items || [];
  };

  const items = currentMerchantId ? getMerchantItems(currentMerchantId) : [];

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const loadedCarts: Record<number, MerchantCart> = {};
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key?.startsWith("cart-")) {
            const merchantId = parseInt(key.replace("cart-", ""));
            const storedCart = localStorage.getItem(key);
            if (storedCart) {
              loadedCarts[merchantId] = { items: JSON.parse(storedCart) };
            }
          }
        }
        setMerchantCarts(loadedCarts);
      } catch {
        setMerchantCarts({});
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      Object.entries(merchantCarts).forEach(([merchantId, cart]) => {
        if (cart.items.length > 0) {
          localStorage.setItem(
            `cart-${merchantId}`,
            JSON.stringify(cart.items),
          );
        } else {
          localStorage.removeItem(`cart-${merchantId}`);
        }
      });
    }
  }, [merchantCarts]);

  const setMerchantId = (id: number) => {
    setCurrentMerchantId(id);
  };

  const addItem = (item: Omit<CartItem, "quantity">) => {
    const targetMerchantId = item.merchantId;
    setCurrentMerchantId(targetMerchantId);

    setMerchantCarts((prevCarts) => {
      const merchantCart = prevCarts[targetMerchantId]?.items || [];
      const existingItem = merchantCart.find((i) => i.id === item.id);

      const updatedItems = existingItem
        ? merchantCart.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i,
          )
        : [...merchantCart, { ...item, quantity: 1 }];

      return {
        ...prevCarts,
        [targetMerchantId]: { items: updatedItems },
      };
    });
  };

  const removeItem = (itemId: number) => {
    if (!currentMerchantId) return;

    setMerchantCarts((prevCarts) => {
      const currentCart = prevCarts[currentMerchantId];
      if (!currentCart) return prevCarts;

      const updatedItems = currentCart.items.filter(
        (item) => item.id !== itemId,
      );

      if (updatedItems.length === 0) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { [currentMerchantId]: _, ...remainingCarts } = prevCarts;
        if (typeof window !== "undefined") {
          localStorage.removeItem(`cart-${currentMerchantId}`);
        }
        setCurrentMerchantId(null);
        return remainingCarts;
      }

      return {
        ...prevCarts,
        [currentMerchantId]: { items: updatedItems },
      };
    });
  };

  const updateQuantity = (itemId: number, quantity: number) => {
    if (!currentMerchantId) return;

    if (quantity <= 0) {
      removeItem(itemId);
      return;
    }

    setMerchantCarts((prevCarts) => {
      const currentCart = prevCarts[currentMerchantId];
      if (!currentCart) return prevCarts;

      return {
        ...prevCarts,
        [currentMerchantId]: {
          items: currentCart.items.map((item) =>
            item.id === itemId ? { ...item, quantity } : item,
          ),
        },
      };
    });
  };

  const clearMerchantCart = (merchantId: number) => {
    setMerchantCarts((prevCarts) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [merchantId]: _, ...remainingCarts } = prevCarts;
      if (typeof window !== "undefined") {
        localStorage.removeItem(`cart-${merchantId}`);
      }
      if (currentMerchantId === merchantId) {
        setCurrentMerchantId(null);
      }
      return remainingCarts;
    });
  };

  const clearCart = () => {
    setMerchantCarts({});
    setCurrentMerchantId(null);

    if (typeof window !== "undefined") {
      Object.keys(merchantCarts).forEach((merchantId) => {
        localStorage.removeItem(`cart-${merchantId}`);
      });
      localStorage.removeItem("currentMerchantId");
    }
  };

  const getTotal = () => {
    return items.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        merchantId: currentMerchantId,
        setMerchantId,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        clearMerchantCart,
        getTotal,
        getTotalItems,
        getMerchantItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
