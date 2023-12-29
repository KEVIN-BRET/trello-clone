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

  deleteBtnListeners(currentContainerDeletionBtn);
  addItemBtnListener(currentAddItemBtn);
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
    "validation-msg"
  ) as HTMLSpanElement;
}
