export default function carouselController(rootId, data) {
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
