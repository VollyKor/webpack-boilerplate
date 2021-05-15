import ItemsData from "../../public/ITEMS.json";

// console.log(ItemsData); // Object > Array

const isDataExist = localStorage.getItem("products");

if (!isDataExist) localStorage.setItem("products", JSON.stringify(ItemsData));
