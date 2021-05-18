import qtyController from "./qty-controller";
import shortid from "shortid";
import deleteBtn from "./deleteFromCart";

const cartRef = document.querySelector(".cart");
const modalRef = document.querySelector(".modal");
const productsRootRef = document.querySelector(".modal__products");

const subtitleRef = document.querySelector(".modal__subtitle");
const summaryeRef = document.querySelector(".modal__summary");
const notificationRef = document.getElementById("notification");
const mainNotificationRef = document.getElementById("main-notification");

const summaryBtnRef = document.querySelector(".modal__confirm");

cartRef.addEventListener("click", () => {
  modalRef.style.display = "block";
  fillCart();
});

modalRef.addEventListener("click", (e) => {
  if (e.target === e.currentTarget) modalRef.style.display = "none";
});

export function fillCart() {
  const cartData = JSON.parse(localStorage.getItem("cart"));

  let totalPrice = 0;
  if (cartData)
    cartData.map((e) => {
      const value = e.PRICE;
      const qty = parseInt(e.qty);
      const number = parseInt(value.slice(1));
      totalPrice = totalPrice + number * qty;
    });

  if (cartData) {
    subtitleRef.textContent = `Subtotal (${cartData.length} item)`;
  }
  if (cartData) {
    mainNotificationRef.textContent = `${cartData.length}`;
    notificationRef.textContent = `${cartData.length}`;
  }
  summaryeRef.textContent = `₴${totalPrice}`;

  if (cartData) {
    productsRootRef.innerHTML = "";
    cartData.map((e) => {
      const rootId = shortid.generate();

      const { ID, qty, NAME, PRICE, IMAGES } = e;

      const template = `
            <div class="modal__item" id="${rootId}" data-id="${e.ID}">
              <button class="modal__delbtn">X</button>
              <div class="modal-thumb">
                <img
                  class="modal__item__image"
                  src="${IMAGES[0]}"
                  alt=""
                  width="72"
                  height="92"
                />
              </div>
              <p class="modal__item__title">${NAME}</p>
              <p class="modal__item__price">${PRICE}</p>
              <div class="quantity flex justify">
                <input class="quantity__number" placeholder="01" data-qnty value="${qty}" type="number" />
                <div class="quantity__arrows">
                  <button class="quantity__up" data-inc>
                    <img
                      class="arrow-icon rotate"
                      src="../assets/arrow-down.png"
                      alt="arrow icon"
                      width="10"
                    />
                  </button>
                  <button class="quantity__down" data-dec>
                    <img
                      class="arrow-icon block"
                      src="../assets/arrow-down.png"
                      alt=" arrow icon"
                      width="10"
                    />
                  </button>
                </div>
              </div>
            </div>
  `;
      productsRootRef.insertAdjacentHTML("beforeend", template);

      qtyController(rootId);
      deleteBtn(rootId);
    });
  }
}

// fillCart();
