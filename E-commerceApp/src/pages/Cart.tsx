import { useEffect, useState } from "react";
import { VscError } from "react-icons/vsc";
import CartItems from "../components/CartItems";
import { RiH1 } from "react-icons/ri";
import { Link } from "react-router-dom";

const cartItems = [

  {
    productId: "lajdsn",
    photo: "https://m.media-amazon.com/images/I/61fd2oCrvyL._AC_SL1500_.jpg",
    name: "Mackbook",
    price: 3000,
    quantity: 4,
    stock: 10,
  }
];
const subtotal = 4000;
const tax = Math.round(subtotal * 0.18);
const shippingCharges = 200;
const total = subtotal + tax + shippingCharges;
const discount = 400;

const Cart = () => {
  const [couponCode, setCouponCode] = useState<string>("");
  const [isValidcouponCode, setIsValidCouponCode] = useState<boolean>(false);

  useEffect(() => {
    const timeOutID = setTimeout(() => {
      if (Math.random() > 0.5) setIsValidCouponCode(true);
      else setIsValidCouponCode(false);
    }, 1000);

    return () => {
      clearTimeout(timeOutID);
      setIsValidCouponCode(false);
    };
  }, [couponCode]);

  return (
    <div className="cart">
      <main>
        {cartItems.length > 0 ? 
          cartItems.map((i, index) => (
            <CartItems key={index} cartItem={i} />
          ))
        : <h1>No Items added</h1>}
      </main>
      <aside>
        <p>Subtotal $ {subtotal}</p>
        <p>Shipping Charges $ {shippingCharges}</p>
        <p>Tax $ {tax}</p>
        <p>
          Discount : <em>$ - {discount}</em>{" "}
        </p>
        <p>
          <b>Total : ${total}</b>
        </p>
        <input
          type="text"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          placeholder="Coupon Code"
        />

        {couponCode &&
          (isValidcouponCode ? (
            <span className="green">${discount} off using <code>{couponCode}</code> </span>
          ) : (
            <span className="red">
              InValid Coupon Code <VscError />
            </span>
          ))}
          {cartItems.length > 0 && <Link to="/shipping">Checkout</Link>}
      </aside>
    </div>
  );
};

export default Cart;
