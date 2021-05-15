const { ITEMS: products } = JSON.parse(localStorage.getItem("products"));

const listRef = document.querySelector("#products");

products.map((e) => {
  const template = `<main>
            <li class="product-item">
                <div class="product-item__logo"><img src="${e.BRAND.LOGO}" width="100px" height="30px" alt="logo" /></div>
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
                    <div class="color-picker">
                            <form id=${e.ID}>
                            <label>Choose Your colors:</label>
                            </form>
                    </div>
                </div>
    
                <div class="block">
                    <div class="flex space-between">
                        <div class="quantity flex">
                            <span class="quantity__title"> Quantity</span>
                            <input class="quantity__number" value="01" type="number" />
                            <div class="quantity__arrows">
                                <button type="button" class="quantity__up">up</button>
                                <button type="button" class="quantity__down">down</button>
                            </div>
                        </div>
                        <button type="button" data-id={{ID}} class="add-product"><span> Add to cart</span></button>
                    </div>
                </div>
                <div class="thumb"><img src="" alt="headphones" /></div>
            </li>`;

  listRef.insertAdjacentHTML("beforeend", template);
});

//  render CheckBox
products.map((product) => {
  const FormRef = document.getElementById(product.ID);

  product.MODELS.COLORS.map((e) => {
    FormRef.insertAdjacentHTML(
      "beforeend",
      `<input type="radio" name="color" ${checkIsActive(e)} data-color=${
        e.COLOR
      } id=${`${product.ID}${e.ID} `} class="black" value=${e.COLOR} />`
    );
  });
});

function checkIsActive(e) {
  console.log(e.ACTIVE);
  if (e.ACTIVE) return `checked`;
  return "";
}
