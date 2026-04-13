
let bank = [];
let odds = [];
let evens = [];

const style = document.createElement("style");
style.textContent = `
  .box-container {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    border: 2px solid #ccc;
    padding: 10px;
    min-height: 40px;
    margin-bottom: 12px;
    background-color: #fafafa;
  }

  .box {
    border: 2px solid #333;
    border-radius: 4px;
    padding: 6px 12px;
    background-color: white;
    font-weight: bold;
    text-align: center;
    min-width: 40px;
  }
`;
document.head.appendChild(style);

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
    <label>Enter numbers (comma-separated):</label>
    <input name="num" type="text" />
    <button>Add number(s)</button>
    <button type="button" id="sortOneBtn">Sort 1</button>
    <button type="button" id="sortAllBtn">Sort All</button>
  `;

  $form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData($form);
    const raw = data.get("num").trim();

    // ✅ Do nothing if input is empty
    if (raw === "") return;

    const numbers = raw
      .split(",")
      .map(n => Number(n.trim()))
      .filter(n => !isNaN(n));

    if (numbers.length > 0) {
      bank.push(...numbers);
      render();
    }

    $form.reset();
  });

  $form.querySelector("#sortOneBtn").addEventListener("click", sortOne);
  $form.querySelector("#sortAllBtn").addEventListener("click", sortAll);

  return $form;
}

function NumberList(title, arr) {
  const section = document.createElement("section");
  const h2 = document.createElement("h2");
  h2.textContent = title;

  const container = document.createElement("div");
  container.classList.add("box-container");

  arr.forEach(num => {
    const box = document.createElement("div");
    box.classList.add("box");
    box.textContent = num;
    container.appendChild(box);
  });

  section.append(h2, container);
  return section;
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

