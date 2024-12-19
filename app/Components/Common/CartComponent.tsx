"use client"
import { useState } from 'react';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface CartComponentProps {
  cartItems: CartItem[];
  onRemoveItem?: (id: number) => void;
}

const CartComponent: React.FC<CartComponentProps> = ({ cartItems, onRemoveItem }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <>
      {/* Cart Icon Button */}
      <button
        onClick={toggleDrawer}
        className="fixed top-4 right-4 p-2 bg-[#2c3e50] text-white rounded-full"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
        <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
          {cartItems.length}
        </span>
      </button>

      {/* Cart Drawer */}
      <div
        className={`fixed right-0 top-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        tabIndex={0}
        aria-label="Shopping cart drawer"
      >
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Shopping Cart</h2>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-gray-100 rounded-full"
              aria-label="Close cart"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Cart Items List */}
          <div className="space-y-4">
            {cartItems.length === 0 ? (
              <p className="text-gray-500 text-center">Your cart is empty</p>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center border-b pb-2 hover:bg-gray-50 cursor-pointer p-2 rounded"
                  tabIndex={0}
                  role="button"
                >
                  <div className="flex-grow">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-gray-500">
                      Quantity: {item.quantity}
                    </p>
                    <p className="text-sm font-medium">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemoveItem?.(item.id);
                    }}
                    className="text-red-500 hover:text-red-700 p-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                    aria-label={`Remove ${item.name} from cart`}
                  >
                    Remove
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Cart Total */}
          {cartItems.length > 0 && (
            <div className="mt-6 border-t pt-4">
              <div className="flex justify-between items-center">
                <span className="font-bold">Total:</span>
                <span className="font-bold">${calculateTotal().toFixed(2)}</span>
              </div>
              <button className="w-full mt-4 bg-[#2e0e90] text-white py-2 px-4 rounded hover:bg-[#2c3e90]">
                Checkout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={handleClose}
          aria-label="Close cart overlay"
        />
      )}
    </>
  );
};

export default CartComponent;
