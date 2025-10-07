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

// functions
function handleEditSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileDesc.textContent = profileDescInput.value;
  editProfileModal.classList.remove("modal_is-opened");
}

function handleAddPostSubmit(evt) {
  evt.preventDefault();
  console.log(imageLinkInput.value);
  console.log(captionInput.value);
  newPostModal.classList.remove("modal_is-opened");
}

function openModal(modal) {
  modal.classList.add("modal_is-opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
}

// edit profile event listeners
profileEditBtn.addEventListener("click", function () {
  // editProfileModal.classList.add("modal_is-opened");
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
