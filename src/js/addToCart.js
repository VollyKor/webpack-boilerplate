import { fillCart } from "./modal";

const { ITEMS: products } = JSON.parse(localStorage.getItem("products"));

export default function addToCartController(rootId) {
  const rootRef = document.getElementById(rootId);
  const buttonRef = rootRef.querySelector("button[data-add]");
  const modalRef = document.querySelector(".modal");
  const qtyRef = rootRef.querySelector("input[data-qnty]");
  const colorRefs = rootRef.querySelectorAll('input[type="radio"]');

  const colorRefArr = [...colorRefs];

  buttonRef.addEventListener("click", () => {
    modalRef.style.display = "block";

    const activeColor = colorRefArr.find((e) => {
      return e.checked;
    });
    const productId = rootRef.getAttribute("data-id");

    const product = products.find((e) => e.ID == productId);

    product.qty = qtyRef.value;
    const productToCart = {
      ...product,
      QTY: parseInt(qtyRef.value, 10),
      COLOR: activeColor.value,
    };
    const cartArr = JSON.parse(localStorage.getItem("cart"));

    if (cartArr) {
      const newArr = cartArr.filter((e) => !(productToCart.ID === e.ID));

      localStorage.setItem("cart", JSON.stringify([...newArr, productToCart]));
      fillCart();
      return;
    }

    localStorage.setItem("cart", JSON.stringify([productToCart]));
    fillCart();
    return;
  });
}
