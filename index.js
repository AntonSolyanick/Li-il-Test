import "./reset.css";
import "./styles.css";

const sidebarMenu = document.querySelector("#sidebarMenu");
const data = null;

const getData = async () => {
  try {
    const response = await fetch(
      "https://my-json-server.typicode.com/AntonSolyanick/fakeApi/db"
    );
    let data = await response.json();
    data = data.services;
    renderThree(data);
  } catch (err) {
    console.error(err.message);
  }
};

const renderThree = (data) => {
  data.forEach((element) => {
    let margin = data.filter((obj) => obj.id === element.head)[0];
    if (!margin) margin = 0;
    if (margin.head === null) margin = 1;
    if (margin.head) margin = margin.head;

    if (element.head === null) {
      element.node === 0
        ? sidebarMenu.insertAdjacentHTML(
            "afterbegin",
            `<li style="order:${element.sorthead}; margin-left:${
              margin * 12
            }px"> ${element.name}  <span class="price">___ ${
              element.price
            }р.</span></li>`
          )
        : sidebarMenu.insertAdjacentHTML(
            "beforeend",
            `<li class="list--title" style="order:${
              element.sorthead
            }; margin-left:${margin * 12}px"> ${element.name}<ul  id="${
              element.id
            }" style="margin-left:${
              margin * 12
            }px; font-weight:bold"> </ul></li>`
          );
    } else {
      const list = document.getElementById(element.head);
      if (!list) return;

      element.node === 0
        ? list.insertAdjacentHTML(
            "beforeend",
            `<li style="order:${element.sorthead}; margin-left:${
              margin * 12
            }px"> ${element.name} <span class="price">___ ${
              element.price
            }р.</span></li>`
          )
        : list.insertAdjacentHTML(
            "beforeend",
            `<li class="list--title" style="order:${
              element.sorthead
            }; margin-left:${margin * 12}px; font-weight:bold">
            ${element.name}
            <ul id="${element.id}">  </ul></li>`
          );
    }
  });
};

const addListener = () => {
  document.querySelector(
    "sidebarMenu",
    addEventListener("click", (e) => {
      if (e.target.classList.contains("list--title")) {
        const listContainer = e.target.lastChild.parentNode.querySelector("ul");
        listContainer.classList.toggle("hide");
        e.target.classList.toggle("plus");
      }
    })
  );
};

getData();
addListener();
