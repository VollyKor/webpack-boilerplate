import shortid from "shortid";

import ratioController from "./ratioController";
import addToCartController from "./addToCart";
import colorPickerController from "./color-picker";
import qtyController from "./qty-controller";
import carouselController from "./carouselController";

import { fillCart } from "./modal";

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

fillCart();
