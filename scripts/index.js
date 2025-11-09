const initialCards = [
  {
    name: "El Capitan",
    link: "https://images.unsplash.com/photo-1498429089284-41f8cf3ffd39?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2070",
  },
  {
    name: "Half Dome",
    link: "https://plus.unsplash.com/premium_photo-1673603988651-99f79e4ae7d3?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
  },
  {
    name: "Birmingham",
    link: "https://images.unsplash.com/photo-1440582096070-fa5961d9d682?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2076",
  },
  {
    name: "Doodle Bug",
    link: "https://images.unsplash.com/photo-1511532514522-a14584b0ad3b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1074",
  },
  {
    name: "Ninja 300",
    link: "https://images.unsplash.com/photo-1619441159429-352f81bddca2?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687",
  },
  {
    name: "Web Design",
    link: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1169",
  },
];

// selecting edit profile elements
const profileEditBtn = document.querySelector(".profile__edit-button");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileCloseBtn =
  editProfileModal.querySelector(".modal__close-bttn");
const editProfileForm = editProfileModal.querySelector(".modal__form");

// selecting profile content
const profileName = document.querySelector(".profile__name");
const profileNameInput = editProfileModal.querySelector("#profile-name-input");
const profileDesc = document.querySelector(".profile__description");
const profileDescInput = editProfileModal.querySelector("#profile-desc-input");

// selecting new post elements
const profileAddBtn = document.querySelector(".profile__add-button");
const newPostModal = document.querySelector("#new-post-modal");
const newPostCloseBtn = newPostModal.querySelector(".modal__close-bttn");
const addPostForm = newPostModal.querySelector(".modal__form");
const captionInput = newPostModal.querySelector("#card-caption-input");
const imageLinkInput = newPostModal.querySelector("#card-image-input");

// modal functions
function handleEditSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileDesc.textContent = profileDescInput.value;
  closeModal(editProfileModal);
}

function handleAddPostSubmit(evt) {
  evt.preventDefault();
  console.log(imageLinkInput.value);
  console.log(captionInput.value);
  newPostModal.classList.remove("modal_is-opened");
  addPostForm.reset();
}

function openModal(modal) {
  modal.classList.add("modal_is-opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
}

// edit profile event listeners
profileEditBtn.addEventListener("click", function () {
  openModal(editProfileModal);
  profileNameInput.value = profileName.textContent;
  profileDescInput.value = profileDesc.textContent;
});

editProfileCloseBtn.addEventListener("click", function () {
  closeModal(editProfileModal);
});

editProfileForm.addEventListener("submit", handleEditSubmit);

// profile add btn event listeners
profileAddBtn.addEventListener("click", function () {
  openModal(newPostModal);
});

newPostCloseBtn.addEventListener("click", function () {
  closeModal(newPostModal);
});

addPostForm.addEventListener("submit", handleAddPostSubmit);

initialCards.forEach(function (card) {
  console.log(card.name);
});
