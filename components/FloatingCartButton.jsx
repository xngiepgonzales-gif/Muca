"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useAppContext } from "@/context/AppContext";

export default function FloatingCartButton() {
  const { cartItems, products, getCartAmount, currency } = useAppContext();
  const [mounted, setMounted] = useState(false);
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_PHONE || "51929065772";

  useEffect(() => {
    setMounted(true);
  }, []);

  const sendToWhatsApp = () => {
    const items = [];

    for (const id in cartItems) {
      const product = products.find((p) => p._id === id);
      if (product) {
        const price = product.offerPrice ?? product.price;
        items.push({
          name: product.name,
          price,
          quantity: cartItems[id],
        });
      }
    }

    if (items.length === 0) {
      alert("El carrito está vacío");
      return;
    }

    // Usar escapes Unicode para los emojis
    let message = "\u{1F6D2} Pedido desde la tienda\n\n";

    items.forEach((item, i) => {
      const subtotal = item.price * item.quantity;
      message += `${i + 1}. ${item.name}\n`;
      message += `Cantidad: ${item.quantity}\n`;
      message += `Precio: ${currency}${item.price}\n`;
      message += `Subtotal: ${currency}${subtotal}\n\n`;
    });

    message += `\u{1F4B0} Total: ${currency}${getCartAmount()}`;

    if (message.length > 4000) {
      alert("El pedido es muy largo. Por favor contacta directamente por WhatsApp.");
      return;
    }

    // Usar la URL de api.whatsapp.com en lugar de wa.me
    const url = `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  const totalItems = Object.values(cartItems).reduce((acc, qty) => acc + qty, 0);

  if (!mounted) return null;

  return createPortal(
    <button
      onClick={sendToWhatsApp}
      className="fixed bottom-6 right-6 z-[9999] bg-[#25D366] hover:bg-[#1ebe5d] text-white rounded-full p-4 shadow-xl transition-all hover:scale-110 active:scale-95"
      aria-label="Enviar pedido por WhatsApp"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
        className="w-8 h-8 fill-white"
      >
        <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.2-99.6 224.2-222 0-59.3-25.2-115-67.2-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54.5-29.1-75.5-66-5.7-9.9 5.7-9.2 16.3-30.6 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.5 19.1-19.5 46.6 0 27.5 20 54.1 22.8 57.8 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.3-5-3.7-10.5-6.5z"/>
      </svg>
      {totalItems > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center shadow-md">
          {totalItems}
        </span>
      )}
    </button>,
    document.body
  );
}