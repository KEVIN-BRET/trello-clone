"use strict";
// On selectionne tous les "items-container" et on les stocke dans un tableau
const itemsContainer = document.querySelectorAll(".items-container");
// console.log(itemsContainer);
let actualContainer, actualBtn, actualUL, actualForm, actualTextInput, actualValidation;
//
function addContainerListeners(currentContainer) {
    //
    const currentContainerDeletionBtn = currentContainer.querySelector(".delete-container-btn");
    const currentAddItemBtn = currentContainer.querySelector(".add-item-btn");
    const currentCloseFormBtn = currentContainer.querySelector(".close-form-btn");
    const currentForm = currentContainer.querySelector("form");
    deleteBtnListeners(currentContainerDeletionBtn);
    addItemBtnListener(currentAddItemBtn);
    closingFormBtnListeners(currentCloseFormBtn);
    addFormSubmitListeners(currentForm);
}
//
itemsContainer.forEach((container) => {
    addContainerListeners(container);
});
//
function deleteBtnListeners(btn) {
    btn.addEventListener("click", handleContainerDeletion);
}
function addItemBtnListener(btn) {
    btn.addEventListener("click", handleAddItem);
}
function closingFormBtnListeners(btn) {
    btn.addEventListener("click", () => toggleForm(actualBtn, actualForm, false));
}
function addFormSubmitListeners(form) {
    form.addEventListener("submit", createNewItem);
}
//
function handleContainerDeletion(e) {
    const btn = e.target;
    const btnsArray = [
        ...document.querySelectorAll(".delete-container-btn"),
    ];
    const containers = [
        ...document.querySelectorAll(".items-container"),
    ];
    containers[btnsArray.indexOf(btn)].remove();
    console.log("removed !");
}
function handleAddItem(e) {
    const btn = e.target;
    // si un form est ouvert on le ferme automatiquement pour ouvrir l'actuel
    if (actualContainer)
        toggleForm(actualBtn, actualForm, false);
    setContainerItem(btn);
    toggleForm(actualBtn, actualForm, true);
}
function toggleForm(btn, form, action) {
    if (!action) {
        form.style.display = "none";
        btn.style.display = "block";
    }
    else if (action) {
        form.style.display = "block";
        btn.style.display = "none";
    }
}
function setContainerItem(btn) {
    actualBtn = btn;
    actualContainer = btn.parentElement;
    actualUL = actualContainer.querySelector("ul");
    actualForm = actualContainer.querySelector("form");
    actualTextInput = actualContainer.querySelector("input");
    actualValidation = actualContainer.querySelector(".validation-msg");
}
function createNewItem(e) {
    e.preventDefault();
    // Vàlidation
    if (actualTextInput.value.length === 0) {
        actualValidation.textContent = "Must be at least 1 caracter long";
        return;
    }
    else {
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
    const item = actualUL.lastElementChild;
    const liBtn = item.querySelector("button");
    handleItemDeletion(liBtn);
    actualTextInput.value = "";
}
function handleItemDeletion(btn) {
    btn.addEventListener("click", () => {
        const elToRemove = btn.parentElement;
        elToRemove.remove();
    });
}
