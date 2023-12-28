"use strict";
// commentaires en francais :
const itemsContainer = document.querySelectorAll(".items-container");
console.log(itemsContainer);
// on parcours les items-container
function addContainerListeners(currentContainer) {
    //
    const currentContainerDeletionBtn = currentContainer.querySelector(".delete-container-btn");
    deleteBtnListeners(currentContainerDeletionBtn);
}
itemsContainer.forEach((container) => {
    addContainerListeners(container);
});
function deleteBtnListeners(btn) {
    btn.addEventListener("click", handleContainerDeletion);
}
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
