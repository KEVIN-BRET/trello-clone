// On selectionne tous les "items-container" et on les stocke dans un tableau
const itemsContainer = document.querySelectorAll(
  ".items-container"
) as NodeListOf<HTMLDivElement>;
// console.log(itemsContainer);

let actualContainer: HTMLDivElement,
  actualBtn: HTMLButtonElement,
  actualUL: HTMLUListElement,
  actualForm: HTMLFormElement,
  actualTextInput: HTMLInputElement,
  actualValidation: HTMLSpanElement;

//
function addContainerListeners(currentContainer: HTMLDivElement) {
  //
  const currentContainerDeletionBtn = currentContainer.querySelector(
    ".delete-container-btn"
  ) as HTMLButtonElement;

  const currentAddItemBtn = currentContainer.querySelector(
    ".add-item-btn"
  ) as HTMLButtonElement;

  const currentCloseFormBtn = currentContainer.querySelector(
    ".close-form-btn"
  ) as HTMLButtonElement;

  const currentForm = currentContainer.querySelector("form") as HTMLFormElement;

  deleteBtnListeners(currentContainerDeletionBtn);
  addItemBtnListener(currentAddItemBtn);
  closingFormBtnListeners(currentCloseFormBtn);
  addFormSubmitListeners(currentForm);
}

//
itemsContainer.forEach((container: HTMLDivElement) => {
  addContainerListeners(container);
});

//
function deleteBtnListeners(btn: HTMLButtonElement) {
  btn.addEventListener("click", handleContainerDeletion);
}

function addItemBtnListener(btn: HTMLButtonElement) {
  btn.addEventListener("click", handleAddItem);
}

function closingFormBtnListeners(btn: HTMLButtonElement) {
  btn.addEventListener("click", () => toggleForm(actualBtn, actualForm, false));
}

function addFormSubmitListeners(form: HTMLFormElement) {
  form.addEventListener("submit", createNewItem);
}

//
function handleContainerDeletion(e: MouseEvent) {
  const btn = e.target as HTMLButtonElement;
  const btnsArray = [
    ...document.querySelectorAll(".delete-container-btn"),
  ] as HTMLButtonElement[];
  const containers = [
    ...document.querySelectorAll(".items-container"),
  ] as HTMLDivElement[];
  containers[btnsArray.indexOf(btn)].remove();
  console.log("removed !");
}

function handleAddItem(e: MouseEvent) {
  const btn = e.target as HTMLButtonElement;
  // si un form est ouvert on le ferme automatiquement pour ouvrir l'actuel
  if (actualContainer) toggleForm(actualBtn, actualForm, false);

  setContainerItem(btn);
  toggleForm(actualBtn, actualForm, true);
}

function toggleForm(
  btn: HTMLButtonElement,
  form: HTMLFormElement,
  action: boolean
) {
  if (!action) {
    form.style.display = "none";
    btn.style.display = "block";
  } else if (action) {
    form.style.display = "block";
    btn.style.display = "none";
  }
}

function setContainerItem(btn: HTMLButtonElement) {
  actualBtn = btn;
  actualContainer = btn.parentElement as HTMLDivElement;
  actualUL = actualContainer.querySelector("ul") as HTMLUListElement;
  actualForm = actualContainer.querySelector("form") as HTMLFormElement;
  actualTextInput = actualContainer.querySelector("input") as HTMLInputElement;
  actualValidation = actualContainer.querySelector(
    ".validation-msg"
  ) as HTMLSpanElement;
}

function createNewItem(e: Event) {
  e.preventDefault();
  // Vàlidation
  if (actualTextInput.value.length === 0) {
    actualValidation.textContent = "Must be at least 1 caracter long";
    return;
  } else {
    actualValidation.textContent = "";
  }
  // Création d'un item
  const itemContent = actualTextInput.value;
  const li = `
    <li class="item" draggable=true>
    <p>${itemContent}</p>
    <button>X</button>
    </li>
  `;
  actualUL.insertAdjacentHTML("beforeend", li);
  const item = actualUL.lastElementChild as HTMLLIElement;
  const liBtn = item.querySelector("button") as HTMLButtonElement;
  handleItemDeletion(liBtn);
  actualTextInput.value = "";
}

function handleItemDeletion(btn: HTMLButtonElement) {
  btn.addEventListener("click", () => {
    const elToRemove = btn.parentElement as HTMLLIElement;
    elToRemove.remove();
  });
}

//* ADD NEW CONTAINER *//

const addContainerBtn = document.querySelector(
  ".add-container-btn"
) as HTMLButtonElement;
const addContainerForm = document.querySelector(
  ".add-new-container form"
) as HTMLFormElement;
const addContainerFormInput = document.querySelector(
  ".add-new-container input"
) as HTMLInputElement;
const validationNewContainer = document.querySelector(
  ".add-new-container .validation-msg"
) as HTMLSpanElement;
const addContainerCloseBtn = document.querySelector(
  ".close-add-list"
) as HTMLButtonElement;
const addNewContainer = document.querySelector(
  ".add-new-container"
) as HTMLDivElement;
const containersList = document.querySelector(
  ".main-content"
) as HTMLDivElement;

addContainerBtn.addEventListener("click", () => {
  toggleForm(addContainerBtn, addContainerForm, true);
});

addContainerCloseBtn.addEventListener("click", () => {
  toggleForm(addContainerBtn, addContainerForm, false);
});

addContainerForm.addEventListener("submit", createNewContainer);

function createNewContainer(e: Event) {
  e.preventDefault();

  // Vàlidation
  if (addContainerFormInput.value.length === 0) {
    validationNewContainer.textContent = "Must be at least 1 caracter long";
    return;
  } else {
    validationNewContainer.textContent = "";
  }

  const itemsContainer = document.querySelector(
    ".items-container"
  ) as HTMLDivElement;
  const newContainer = itemsContainer.cloneNode() as HTMLDivElement;

  const newContainerContent = `
        <div class="top-container">
          <h2>${addContainerFormInput.value}</h2>
          <button class="delete-container-btn">X</button>
        </div>
        <ul></ul>
        <button class="add-item-btn">Add an item</button>
        <form autocomplete="off">
          <div class="top-form-container">
            <label for="item">Add a new item</label>
            <button type="button" class="close-form-btn">X</button>
          </div>
          <input type="text" id="item" />
          <span class="validation-msg"></span>
          <button type="submit">Submit</button>
        </form>
  `;
  newContainer.innerHTML = newContainerContent;
  containersList.insertBefore(newContainer, addNewContainer);
  addContainerFormInput.value = "";
  addContainerListeners(newContainer);
}
