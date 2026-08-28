"use client";

import { createContext, ReactNode, useContext, useState } from "react";

interface CartNotificationContextType {
  isOpen: boolean;
  showNotification: () => void;
  hideNotification: () => void;
}

const CartNotificationContext =
  createContext<CartNotificationContextType | null>(null);

export function CartNotificationProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const showNotification = () => {
    setIsOpen(true);

    setTimeout(() => {
      setIsOpen(false);
    }, 2000);
  };

  const hideNotification = () => {
    setIsOpen(false);
  };

  return (
    <CartNotificationContext.Provider
      value={{
        isOpen,
        showNotification,
        hideNotification,
      }}
    >
      {children}
    </CartNotificationContext.Provider>
  );
}

export function useCartNotification() {
  const context = useContext(CartNotificationContext);

  if (!context) {
    throw new Error(
      "useCartNotification must be used inside CartNotificationProvider",
    );
  }

  return context;
}
