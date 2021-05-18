import { fillCart } from "./modal";

export default function deleteBtn(rootId) {
  const rootRef = document.getElementById(rootId);

  const btnRef = rootRef.querySelector(".modal__delbtn");

  const id = rootRef.dataset.id;

  const data = JSON.parse(localStorage.getItem("cart"));

  btnRef.addEventListener("click", () => {
    const newArr = data.filter((e) => {
      return e.ID.toString() !== id;
    });

    console.log(data);
    console.log(newArr);

    localStorage.setItem("cart", JSON.stringify(newArr));
    fillCart();
  });
}
