import React, { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { MdArrowBackIosNew } from "react-icons/md";
// Define types for order items and order summary
type OrderItem = {
  id: number;
  name: string;
  quantity: number;
  price: number;
  image: string;
};

const OrderSummary: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [customerName] = useState<string>(user?.name || "John Doe");
  const [customerAddress] = useState<string>("123 Pasir Ris, 13810, Singapore"); // Simulated customer data
  const [orderId] = useState<string>("21340"); // Simulated order ID

  useEffect(() => {
    // Load cart data from localStorage
    const cartData = localStorage.getItem("cart");
    if (cartData) {
      setOrderItems(JSON.parse(cartData));
    }
  }, []);

  const totalOrder = orderItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="flex justify-center items-center h-screen w-full bg-[#E7F5FD]">
      <div
        onClick={() => navigate(-1)}
        className="absolute top-4 left-4 text-[#0099EE] z-20"
      >
        <MdArrowBackIosNew size={40} />
      </div>
      <div className=" max-w-[80%] mx-auto  p-4   flex flex-col justify-center">
        {/* Header */}
        <div className="bg-[#0099EE] text-white text-center py-3 rounded-t-lg">
          <h2 className="text-xl font-bold">ORDER SUMMARY</h2>
        </div>

        {/* Customer Information */}
        <div className="bg-white p-4">
          <div className="flex justify-between items-center">
            <h3 className="font-bold">{customerName}</h3>
            <span className="text-blue-500 font-medium">ORDER #{orderId}</span>
          </div>
          <p className="text-gray-600 text-sm mt-1">{customerAddress}</p>
        </div>

        {/* Order Items (Scrollable Section) */}
        <div
          className="bg-white divide-y divide-gray-200 overflow-y-auto"
          style={{ maxHeight: "300px" }} // Set a fixed height for scrolling
        >
          {orderItems.length > 0 ? (
            orderItems.map((item) => (
              <div key={item.id} className="flex items-center gap-4 py-4 px-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded-md object-cover"
                />
                <div className="flex-1">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-gray-500 text-sm">Qty: {item.quantity}</p>
                </div>
                <div className="font-medium text-blue-600">
                  $ {(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-4">
              <p className="text-gray-500">Your cart is empty.</p>
            </div>
          )}
        </div>

        {/* Total Order */}
        <div className="bg-[#0099EE] text-white text-lg font-bold p-4 rounded-b-lg flex justify-between items-center ">
          <span>TOTAL ORDER</span>
          <span>${totalOrder.toFixed(2)}</span>
        </div>

        <div className="mt-4 text-center w-full">
          <button
            onClick={() => {
              const whatsappMessage = encodeURIComponent(
                `Order Summary:\n\n${orderItems
                  .map(
                    (item) =>
                      `${item.name} - Qty: ${item.quantity} - Total: $${(
                        item.price * item.quantity
                      ).toLocaleString()}`
                  )
                  .join("\n")}\n\nTOTAL ORDER: $${totalOrder.toLocaleString()}`
              );
              window.open(`https://wa.me/?text=${whatsappMessage}`, "_blank");
            }}
            className="bg-[#25D366] w-full text-white py-3 px-6 rounded-lg text-lg flex items-center justify-center gap-2 shadow-md hover:bg-green-500"
          >
            <FaWhatsapp size={25} />
            WHATSAPP US
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
