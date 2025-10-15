import { useState } from "react";
import { products } from "../assets/frontend_assets/assets";
import { ShopContext } from "./contextFile";
import { toast } from "react-toastify";

const ShopContextProvider = (props) => {
  const currency = "₹";
  const delivery_fee = 10;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartitems, setCartItems] = useState({});

  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Select Product Size");
      return;
    }

    let cartData = structuredClone(cartitems);

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    setCartItems(cartData);
  };

  const getCardCount = () => {
    let totalCount = 0;

    for (const itemId in cartitems) {
      for (const size in cartitems[itemId]) {
        const qty = cartitems[itemId][size];
        try {
          if (qty > 0) {
            totalCount += cartitems[itemId][size];
          }
        } catch (error) {
          console.error(error);
        }
      }
    }
    return totalCount;
  };

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartitems,
    addToCart,
    getCardCount,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
