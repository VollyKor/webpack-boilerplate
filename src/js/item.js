import shortid from "shortid";

import { fillCart } from "./modal";
import colorPickerController from "./color-picker";

const { ITEMS: products } = JSON.parse(localStorage.getItem("products"));

const listRef = document.querySelector("#products");

products.map((e) => {
  const rootId = shortid.generate();

  const template = `
        <li class="product-item" data-id="${e.ID}" id=${rootId}>
          <div class="product-item__logo"><img src="${e.BRAND.LOGO}" height="30" alt="logo" /></div>
          <div class="product-item__wrapper">
              <div class="product-item__info">
                <p class="product-item__serial">Model: ${e.ID}</p>
                <h2 class="product-item__title">${e.NAME}</h2>
                <p class="product-item__desc">${e.DESCRIPTION}</p>
    
                <div class="ratio" data-ratio="${e.RAT.RATING}">
                    <div class="ratio__stars">
                        <div class="ratio__point "></div>
                        <div class="ratio__point "></div>
                        <div class="ratio__point "></div>
                        <div class="ratio__point"></div>
                        <div class="ratio__point"></div>
                    </div>
                    <span class="ratio__number">${e.RAT.RATING}</span>
                    <span class="ratio__reviews">(${e.RAT.REVIEWS} reviews)</span>
                </div>
    
                <div class="price-wrapper flex space-between">
                    <p class="price">${e.PRICE}</p>
                    
                    <div >
                    <p>Choose Your color</p>
                            <form id=${e.ID} class="color-picker">
                            </form>
                    </div>
                </div>
    
                <div>
                    <div class="flex space-between">
                        <div class="quantity flex">
                            <span class="quantity__title"> Quantity</span>
                            <input class="quantity__number" value="01" data-qnty type="number" />
                            <div class="quantity__arrows">
                              <button type="button" data-inc class="quantity__up">
                              <img
                                class="arrow-icon rotate"
                                src="../assets/arrow-down.png"
                                alt="arrow icon"
                                width="10"
                              />
                            </button>
                                 <button type="button" data-dec class="quantity__down">
                                    <img
                                      class="arrow-icon"
                                      src="../assets/arrow-down.png"
                                      alt=" arrow icon"
                                      width="10"
                                    />
                                  </button>
                            </div>
                        </div>
                        <button type="button" data-add data-id="${e.ID}" class="add-product"><span> Add to cart</span></button>
                     </div>
                  </div>
               </div>
              

            <div class="carousel">
              <div class="carousel__thumb">
                <img
                  class="carousel__img"
                  data-index="0"
                  src="${e.IMAGES[0]}"
                  alt="headphones"
                />
              </div>
              <div class="carousel__arrows">
                <button class="arrow__left">
                  <img
                    class="arrow-icon"
                    src="../assets/arrow-down.png"
                    alt=" arrow icon"
                  />
                </button>
                <button class="arrow__center">
                  <img
                    class="hand-icon"
                    src="../assets/hand.png"
                    alt=" arrow icon"
                  />
                </button>
                <button class="arrow__right">
                  <img
                    class="arrow-icon"
                    src="../assets/arrow-down.png"
                    alt=" arrow icon"
                  />
                </button>
              </div>
              <div class="carousel__burger">
              </div>
              </div>
            </div>
            </li>`;

  listRef.insertAdjacentHTML("beforeend", template);

  ratioController(rootId);

  colorPickerController(e);

  qtyController(rootId);

  addToCartController(rootId);

  carouselController(rootId, e);
});

// qty controller
function qtyController(rootId) {
  const rootRef = document.getElementById(rootId);

  const qtyRef = rootRef.querySelector("input[data-qnty]");
  const incButton = rootRef.querySelector("button[data-inc]");
  const decButton = rootRef.querySelector("button[data-dec]");

  incButton.addEventListener("click", (e) => {
    let qty = parseInt(qtyRef.value, 10);
    qty += 1;

    qtyRef.value = qty.toString().padStart(2, "0");
  });

  decButton.addEventListener("click", () => {
    let qty = parseInt(qtyRef.value, 10);
    if (qty === 0) return;
    qty -= 1;

    qtyRef.value = qty.toString().padStart(2, "0");
  });
}

//  addToCart controller
function addToCartController(rootId) {
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

// ratio controller
function ratioController(rootId) {
  const rootRef = document.getElementById(rootId);

  const ratioRootRef = rootRef.querySelector(".ratio");
  const ratio = ratioRootRef.dataset.ratio;

  const ratioBtns = ratioRootRef.querySelectorAll(".ratio__point");
  const rationBtnsArr = [...ratioBtns];

  rationBtnsArr.forEach((e, i) => {
    if (i + 1 < ratio) e.classList.add("active");
  });
}

// images carousel
function carouselController(rootId, data) {
  const rootRef = document.getElementById(rootId);

  const carouselRootRef = rootRef.querySelector(".carousel__burger");

  data.IMAGES.forEach((e, i) => {
    if (i === 0) {
      const btnTemplate = `<div data-index="${i}" class="carousel__item active"></div>`;
      carouselRootRef.insertAdjacentHTML("beforeend", btnTemplate);
      return;
    }

    const btnTemplate = `<div data-index="${i}" class="carousel__item"></div>`;
    carouselRootRef.insertAdjacentHTML("beforeend", btnTemplate);
  });

  const imgRef = rootRef.querySelector(".carousel__img");
  const imagesArr = data.IMAGES;

  const arrowLeftRef = rootRef.querySelector(".arrow__left");
  const arrowRightRef = rootRef.querySelector(".arrow__right");
  const burgerItemsRef = rootRef.querySelectorAll(".carousel__item");

  arrowLeftRef.addEventListener("click", () => {
    const imgIndex = parseInt(imgRef.dataset.index);

    burgerItemsRef.forEach((e, i, arr) => {
      if (imgIndex === 0) {
        arr.length - 1 === i
          ? e.classList.add("active")
          : e.classList.remove("active");
        return;
      }

      imgIndex - 1 === i
        ? e.classList.add("active")
        : e.classList.remove("active");
    });

    if (imgIndex === 0) {
      imgRef.dataset.index = imagesArr.length - 1;
      imgRef.src = imagesArr[imagesArr.length - 1];
      return;
    }

    imgRef.dataset.index = imgIndex - 1;
    imgRef.src = imagesArr[imgIndex - 1];
  });

  arrowRightRef.addEventListener("click", () => {
    const imgIndex = parseInt(imgRef.dataset.index);

    burgerItemsRef.forEach((e, i) => {
      if (imgIndex === imagesArr.length - 1) {
        0 === i ? e.classList.add("active") : e.classList.remove("active");
        return;
      }

      imgIndex + 1 === i
        ? e.classList.add("active")
        : e.classList.remove("active");
    });

    if (imgIndex === imagesArr.length - 1) {
      imgRef.dataset.index = 0;
      imgRef.src = imagesArr[0];
      return;
    }

    imgRef.dataset.index = imgIndex + 1;
    imgRef.src = imagesArr[imgIndex + 1];
  });
}
