import { useContext, useEffect, useState } from "react";
import CartContext from "../../store/CartContext";
import classes from "./HeaderCartButton.module.css";
import CartIcon from "./CartIcon";

const HeaderCartButton = (props) => {
  const [btnIsHighlighted, setBtnIsHightlighted] = useState(false);
  const cartCxt = useContext(CartContext);
  const { items } = cartCxt;
  const numberOfCartItems = cartCxt.items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  const btnClasses = `${classes.button} ${
    btnIsHighlighted ? classes.bump : ""
  }`;

  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setBtnIsHightlighted(true);
    const timer = setTimeout(() => {
      setBtnIsHightlighted(false);
    }, 300);
    return () => {
      clearTimeout(timer);
    }
  }, [items]);

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
