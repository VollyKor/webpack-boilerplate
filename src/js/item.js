import shortid from "shortid";

const { ITEMS: products } = JSON.parse(localStorage.getItem("products"));

const listRef = document.querySelector("#products");

products.map((e) => {
  const rootId = shortid.generate();

  const template = `
            <li class="product-item" data-id="${e.ID}" id=${rootId}>
                <div class="product-item__logo"><img src="${e.BRAND.LOGO}" height="30" alt="logo" /></div>
                <p class="product-item__serial">Model: ${e.ID}</p>
                <h2 class="product-item__title">${e.NAME}</h2>
                <p class="product-item__desc">${e.DESCRIPTION}</p>
    
                <div class="ratio">
                    <div class="ratio__stars">1,2,3,4,5</div>
                    <span class="ratio__number">${e.RAT.RATING}</span>
                    <span class="ratio__reviews">(${e.RAT.REVIEWS} reviews)</span>
                </div>
    
                <div class="price-wrapper flex space-between">
                    <div class="price">${e.PRICE}</div>
                    
                    <div >
                    <p>Choose Your color</p>
                            <form id=${e.ID} class="color-picker">
                            </form>
                    </div>
                </div>
    
                <div class="block">
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
                <div class="thumb"><img src="${e.IMAGES[0]}" alt="headphones" /></div>
                <div class="carousel">Carousel</div>
                <div class="image-icons">Imageicons</div>
            </li>`;

  listRef.insertAdjacentHTML("beforeend", template);

  colorPickerController(e);
  qtyController(rootId);
  addToCartController(rootId);
});

//  render CheckBox
function colorPickerController(product) {
  const FormRef = document.getElementById(product.ID);

  product.MODELS.COLORS.map((e) => {
    const id = shortid.generate();
    FormRef.insertAdjacentHTML(
      "beforeend",
      `<div  class="color-picker__bckg ${checkIsActiveClass(e)}" id="${id}">
      <label class="color-picker__label" id=${`${product.ID}${e.ID}`}>
            <input type="radio" class="visually-hidden" name="color" data-id=${id}
            ${checkIsActive(e)} 
            value="${e.COLOR}" />  
      </label>
       </div>`
    );

    const lableRef = document.getElementById(`${product.ID}${e.ID}`);
    lableRef.style.backgroundColor = e.COLOR;

    checkBoxController(FormRef);
  });
}

function checkIsActive(e) {
  if (e.ACTIVE) return `checked`;
  return "";
}

function checkIsActiveClass(e) {
  if (e.ACTIVE) return `active`;
  return "";
}

function checkBoxController(RootRef) {
  const checkBoxes = RootRef.querySelectorAll('input[type="radio"]');
  const checkBoxWrappers = RootRef.querySelectorAll(".color-picker__bckg");

  const checkBoxesArr = [...checkBoxes];
  const checkBoxWrappersArr = [...checkBoxWrappers];

  checkBoxesArr.map((e) => {
    e.addEventListener("click", (event) => {
      checkBoxWrappersArr.forEach((e) => {
        e.classList.remove("active");
      });

      const id = event.target.getAttribute("data-id");
      const wrapperRef = document.getElementById(id);

      if (event.target.checked) {
        wrapperRef.classList.add("active");
      }
    });
  });
}

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

  const qtyRef = rootRef.querySelector("input[data-qnty]");
  const colorRefs = rootRef.querySelectorAll('input[type="radio"]');

  const colorRefArr = [...colorRefs];

  buttonRef.addEventListener("click", () => {
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
      localStorage.setItem("cart", JSON.stringify([...cartArr, productToCart]));

      // const result = JSON.parse(localStorage.getItem("cart"));
      // console.log("result", result);
      return;
    }

    localStorage.setItem("cart", JSON.stringify([productToCart]));
  });
}
