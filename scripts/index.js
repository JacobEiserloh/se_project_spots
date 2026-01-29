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
  {
    name: "San Fran",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
  },
];

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

function handleEditSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileDesc.textContent = profileDescInput.value;
  closeModal(editProfileModal);
}

function handleAddPostSubmit(evt) {
  evt.preventDefault();
  const newCard = {
    name: captionInput.value,
    link: imageLinkInput.value,
  };
  const newPost = getCardElement(newCard);
  cardsList.prepend(newPost);
  closeModal(newPostModal);
  addPostForm.reset();
}

function openModal(modal) {
  modal.classList.add("modal_is-opened");
  addModalCloseListener(modal);
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
  removeModalCloseListener(modal);
}

const handleEscapeKey = (evt) => {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".modal_is-opened");
    if (openedModal) closeModal(openedModal);
  }
};

const addModalCloseListener = (modal) => {
  document.addEventListener("keydown", handleEscapeKey);
};

const removeModalCloseListener = (modal) => {
  document.removeEventListener("keydown", handleEscapeKey);
};

document.querySelectorAll(".modal").forEach((modal) => {
  modal.addEventListener("click", (evt) => {
    if (evt.target === modal) {
      closeModal(modal);
    }
  });
});

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

editProfileCloseBtn.addEventListener("click", function () {
  closeModal(editProfileModal);
});

editProfileForm.addEventListener("submit", handleEditSubmit);

profileAddBtn.addEventListener("click", function () {
  openModal(newPostModal);
});

newPostCloseBtn.addEventListener("click", function () {
  closeModal(newPostModal);
});

addPostForm.addEventListener("submit", handleAddPostSubmit);

previewClose.addEventListener("click", () => {
  closeModal(previewModal);
});

function getCardElement(data) {
  const cardElement = cardTemplate.content.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");

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
    card.remove();
  });

  cardImage.addEventListener("click", () => {
    previewCaption.textContent = cardTitle.textContent;
    previewImage.src = cardImage.src;
    previewImage.alt = cardImage.alt;
    openModal(previewModal);
  });

  return cardElement;
}

initialCards.forEach(function (card) {
  const cardElement = getCardElement(card);
  cardsList.prepend(cardElement);
});
