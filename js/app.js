// alert('12')

const click = document.querySelector(".butt");
let p = document.querySelector(".advice");
const span = document.querySelector(".active span");

click.addEventListener("click", getAdvice);

class getData {
  constructor(id, advice) {
    this.id = id;
    this.advice = advice;
  }
  dom(reck) {
    const div = document.createElement("div");
    div.className = "body";
    const p = document.createElement("p");
    const p1 = document.createElement("p");
    p.textContent = reck.id;
    p1.textContent = reck.advice;
    div.append(p, p1);

    document.querySelector("#dom").append(div);
    // console.log(dul);
  }
  getItem() {
    if (localStorage.getItem("item") === null) {
      return;
    } else {
      const ls = JSON.parse(localStorage.getItem("item"));
      ls.forEach((element) => {
        this.dom(element);
        console.log(element);
      });
    }
  }
  addLs(get) {
    let items;
    if (localStorage.getItem("item") === null) {
      items = [];
    } else {
      items = JSON.parse(localStorage.getItem("item"));
    }
    items.push(get);
    localStorage.setItem("item", JSON.stringify(items));
  }
}

const doms = new getData();
document.addEventListener("DOMContentLoaded", getAdvice());
document.addEventListener("DOMContentLoaded", doms.getItem());
function getAdvice() {
  fetch("https://api.adviceslip.com/advice")
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return;
      }
    })

    .then((data) => {
      let slip = data.slip;
      let { id, advice } = slip;
      p.textContent = advice;
      span.textContent = `#${id}`;

      const get = new getData(id, advice);
      get.addLs(get);
    })
    .catch((err) => {
      p.textContent = "Something Went Wrong " + err.message;
      p.style.color = "red";
    });
}

const dev = document .querySelector("strong.advice1")
  .addEventListener("click", function () {
    if (localStorage.getItem("item") === null) {
      return;
    } else {
      localStorage.clear();
      window.location.reload();
    }
  });

