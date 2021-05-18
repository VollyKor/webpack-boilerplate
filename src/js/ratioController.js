export default function ratioController(rootId) {
  const rootRef = document.getElementById(rootId);

  const ratioRootRef = rootRef.querySelector(".ratio");
  const ratio = ratioRootRef.dataset.ratio;

  const ratioBtns = ratioRootRef.querySelectorAll(".ratio__point");
  const rationBtnsArr = [...ratioBtns];

  rationBtnsArr.forEach((e, i) => {
    if (i + 1 < ratio) e.classList.add("active");
  });
}
