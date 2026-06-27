import {settings, enableValidation, resetValidation, toggleBtnState} from "../scripts/validation.js";
import './index.css';
import Api from "../utils/Api.js";

// selecting edit profile elements
const profileEditBtn = document.querySelector(".profile__edit-button");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileCloseBtn =
  editProfileModal.querySelector(".modal__close-bttn");
const editProfileForm = editProfileModal.querySelector(".modal__form");

// selecting profile elements
const profileName = document.querySelector(".profile__name");
const profileNameInput = editProfileModal.querySelector("#profile-name-input");
const profileDesc = document.querySelector(".profile__description");
const profileDescInput = editProfileModal.querySelector("#profile-desc-input");
const profileAvatar = document.querySelector(".profile__avatar");

// selecting new post elements
const profileAddBtn = document.querySelector(".profile__add-button");
const newPostModal = document.querySelector("#new-post-modal");
const newPostCloseBtn = newPostModal.querySelector(".modal__close-bttn");
const addPostForm = newPostModal.querySelector(".modal__form");
const captionInput = newPostModal.querySelector("#card-caption-input");
const imageLinkInput = newPostModal.querySelector("#card-image-input");

// selecting card elements
const cardTemplate = document.querySelector("#cards__template");
const cardsList = document.querySelector(".cards__list");

// selecting preview modal elements
const previewModal = document.querySelector("#preview-modal");
const previewCaption = previewModal.querySelector(".modal__caption");
const previewImage = previewModal.querySelector(".modal__preview-image");
const previewClose = previewModal.querySelector(".modal__close-bttn");

// create api class
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "3eaca0f8-fd35-44df-b757-ab2ec5198e69",
    "Content-Type": "application/json"
  }
});

api
.getAppInfo()
.then(([cards, user]) => {
  cards.forEach((card) => {
    const cardElement = getCardElement(card);
    cardsList.prepend(cardElement);
  });

  profileAvatar.src = user.avatar;
  profileName.textContent = user.name;
  profileDesc.textContent = user.about;
})
.catch(console.error);

// edit submit handler
function handleEditSubmit(evt) {
  evt.preventDefault();
  
  api.editUserInfo({name: profileNameInput.value, about: profileDescInput.value})
  .then((userInfo) => {
    profileName.textContent = userInfo.name;
    profileDesc.textContent = userInfo.about;
    closeModal(editProfileModal);
  }) .catch(console.error);
}

// add post submit handler
function handleAddPostSubmit(evt) {
  evt.preventDefault();

  const newCard = {
    name: captionInput.value,
    link: imageLinkInput.value,
  };

  api.addCard(newCard)
    .then((card) => {
      const cardElement = getCardElement(card);
      cardsList.prepend(cardElement);
      closeModal(newPostModal);
      addPostForm.reset();
      const addPostInputs = Array.from(
      addPostForm.querySelectorAll(settings.inputSelector),
      );
      const addPostBtn = addPostForm.querySelector(settings.submitButtonSelector);
      toggleBtnState(addPostInputs, addPostBtn, settings);
    })
    .catch((err) => {
      console.error(err);
    });
}

// open modal func
function openModal(modal) {
  modal.classList.add("modal_is-opened");
  addModalCloseListener(modal);
}

// close modal func
function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
  removeModalCloseListener(modal);
}

// close on escape func
const closeOnEscape = (evt) => {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".modal_is-opened");
    if (openedModal) closeModal(openedModal);
  }
};

// close and open modal listeners
const addModalCloseListener = (modal) => {
  document.addEventListener("keydown", closeOnEscape);
};

const removeModalCloseListener = (modal) => {
  document.removeEventListener("keydown", closeOnEscape);
};

document.querySelectorAll(".modal").forEach((modal) => {
  modal.addEventListener("click", (evt) => {
    if (evt.target === modal) {
      closeModal(modal);
    }
  });
});

// edit profile btn listener
profileEditBtn.addEventListener("click", function () {
  profileNameInput.value = profileName.textContent;
  profileDescInput.value = profileDesc.textContent;
  resetValidation(
    editProfileForm,
    [profileNameInput, profileDescInput],
    settings,
  );
  openModal(editProfileModal);
});

// edit profile close modal listener
editProfileCloseBtn.addEventListener("click", function () {
  closeModal(editProfileModal);
});

// edit profile submit listener
editProfileForm.addEventListener("submit", handleEditSubmit);

// add post btn listener
profileAddBtn.addEventListener("click", function () {
  openModal(newPostModal);
});

// new post close modal listener
newPostCloseBtn.addEventListener("click", function () {
  closeModal(newPostModal);
});

// add post submit listener
addPostForm.addEventListener("submit", handleAddPostSubmit);

// preview close btn listener
previewClose.addEventListener("click", () => {
  closeModal(previewModal);
});

// create card element func
function getCardElement(data) {
  const cardElement = cardTemplate.content.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const card = cardElement.querySelector(".card")

  card.id = data._id;

  cardImage.src = data.link;
  cardImage.alt = data.name;

  cardTitle.textContent = data.name;

  const likeBtn = cardElement.querySelector(".card__like-button");
  likeBtn.addEventListener("click", (evt) => {
    evt.currentTarget.classList.toggle("card__like-button_active");
  });

  const deleteBtn = cardElement.querySelector(".card__delete-button");
  deleteBtn.addEventListener("click", (evt) => {
    const card = evt.currentTarget.closest(".card");
    api.removeCard(card.id)
    .then(card.remove())
    .catch(console.error);
  });

  cardImage.addEventListener("click", () => {
    previewCaption.textContent = cardTitle.textContent;
    previewImage.src = cardImage.src;
    previewImage.alt = cardImage.alt;
    openModal(previewModal);
  });

  return cardElement;
}

// enabling form validation 
enableValidation(settings);
