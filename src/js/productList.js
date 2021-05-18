const jsonData = localStorage.getItem("products");

const { ITEMS: products } = JSON.parse(jsonData);
