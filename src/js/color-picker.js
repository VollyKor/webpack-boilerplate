import shortid from "shortid";

export default function colorPickerController(product) {
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

//  render CheckBox

function checkIsActive(e) {
  if (e.ACTIVE) return `checked`;
  return "";
}

function checkIsActiveClass(e) {
  if (e.ACTIVE) return `active`;
  return "";
}
