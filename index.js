
let bank = [];
let odds = [];
let evens = [];


function addNumber(n) {
  bank.push(n);
  render();
}

function sortOne() {
  if (bank.length === 0) return;
  const num = bank.shift();
  if (num % 2 === 0) {
    evens.push(num);
  } else {
    odds.push(num);
  }
  render();
}

function sortAll() {
  while (bank.length > 0) {
    sortOne();
  }
}


function NumberForm() {
  const $form = document.createElement("form");
  $form.innerHTML = `
    <label>
      Enter a number:
      <input name="num" type="number" />
    </label>
    <button>Add number</button>
    <button type="button" id="sortOneBtn">Sort 1</button>
    <button type="button" id="sortAllBtn">Sort All</button>
  `;


  $form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData($form);
    const n = Number(data.get("num"));
    if (!isNaN(n)) addNumber(n);
  });

  // click events for sorting
  $form.querySelector("#sortOneBtn").addEventListener("click", sortOne);
  $form.querySelector("#sortAllBtn").addEventListener("click", sortAll);

  return $form;
}

function NumberList(title, arr) {
  const $section = document.createElement("section");
  const $h2 = document.createElement("h2");
  $h2.textContent = title;

  const $list = document.createElement("ul");
  arr.forEach(num => {
    const $li = document.createElement("li");
    $li.textContent = num;
    $list.appendChild($li);
  });

  $section.append($h2, $list);
  return $section;
}


function render() {
  const $app = document.querySelector("#app");
  $app.innerHTML = `
    <h1>Odds and Evens</h1>
    <NumberForm></NumberForm>
    <main>
      <NumberList id="bank"></NumberList>
      <NumberList id="odds"></NumberList>
      <NumberList id="evens"></NumberList>
    </main>
  `;

  $app.querySelector("NumberForm").replaceWith(NumberForm());
  $app.querySelector("NumberList#bank").replaceWith(NumberList("Number Bank", bank));
  $app.querySelector("NumberList#odds").replaceWith(NumberList("Odd Numbers", odds));
  $app.querySelector("NumberList#evens").replaceWith(NumberList("Even Numbers", evens));
}

render();

