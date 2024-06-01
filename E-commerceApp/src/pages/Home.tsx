import { Link } from "react-router-dom";
import ProductCart from "../components/ProductCart";

const Home = () => {

  const addToCartHandler = {}

  return (
    <div className="home">
      <section></section>

      <h1>
        Latest Products
        <Link to={"/search"} className="findmore">
          More
        </Link>
      </h1>
      <main>
        <ProductCart productId="asdf" name="Mackbook" price={344} stock={3} handler={addToCartHandler} photo="https://m.media-amazon.com/images/I/61fd2oCrvyL._AC_SL1500_.jpg" />
      </main>
    </div>
  );
};

export default Home;
