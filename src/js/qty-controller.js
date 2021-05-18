export default function qtyController(rootId) {
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
