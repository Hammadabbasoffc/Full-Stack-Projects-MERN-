import  { ChangeEvent, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const Shipping = () => {
  const [shippingInfo, setShippingInfo] = useState({
    address: "",
    city: "",
    state: "",
    country: "",
    pinCde: "",
  });

  const navigate = useNavigate()

  const changeHandler = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {

    setShippingInfo((prev)=>({...prev, [e.target.name]:e.target.value}))
  };

  return (
    <div className="shipping">
      <button className="back-btn" onClick={()=>navigate("/cart")}>
        <BiArrowBack />
      </button>

      <form>
        <h1>Shipping Address</h1>
        <input
          required
          type="text"
          placeholder="Address"
          name="address"
          value={shippingInfo.address}
          onChange={changeHandler}
        />
        <input
          required
          type="text"
          placeholder="city"
          name="city"
          value={shippingInfo.city}
          onChange={changeHandler}
        />
        <input
          required
          type="text"
          placeholder="state"
          name="state"
          value={shippingInfo.state}
          onChange={changeHandler}
        />

        <select
          name="country"
          required
          value={shippingInfo.country}
          onChange={changeHandler}
        >
          <option value="">Chose Contry</option>
          <option value="Pakistan">Pakistan</option>
        </select>

        <input
          required
          type="number"
          placeholder="pinCde"
          name="pinCde"
          value={shippingInfo.pinCde}
          onChange={changeHandler}
        />
              <button type="submit">Pay Now</button>

      </form>
    </div>
  );
};

export default Shipping;
