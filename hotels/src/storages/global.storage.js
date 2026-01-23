/*
    ? Recibe el nombre del item y el valor en formato JSON
    ? setItemJson("usuario", {nombre: "Wilson", edad: 25});
*/
function setItemJson(nameItem, item) {
  localStorage.setItem(nameItem, JSON.stringify(item));
  return;
}

/*
    ? Recibe el nombre del item y el valor en formato unico
    ? setOnlyItem("token", "abc123xyz");
*/
function setOnlyItem(nameItem, item) {
  localStorage.setItem(nameItem, String(item));
  return;
}

/*
    ? Recibe el nombre del item y obtenemos el valor en formato JSON
    ? getItemJson("usuario");
*/
function getItemJson(nameItem, item) {
  return JSON.parse(localStorage.getItem(nameItem));
}

/*
    ? Recibe el nombre del item y el valor en formato unico
    ? getOnlyItem("token");
*/
function getOnlyItem(nameItem) {
  return localStorage.getItem(nameItem);
}
