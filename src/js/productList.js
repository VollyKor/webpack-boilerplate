import listTemplate from "../templates/list.handlebars";

const jsonData = localStorage.getItem("products");

const { ITEMS: products } = JSON.parse(jsonData);

// const markup = listTemplate(products);

// listRef.insertAdjacentHTML("beforeend", markup);
