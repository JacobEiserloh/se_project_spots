const profileEditBtn = document.querySelector(".profile__edit-button");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileCloseBtn =
  editProfileModal.querySelector(".modal__close-bttn");

const profileAddBtn = document.querySelector(".profile__add-button");
const newPostModal = document.querySelector("#new-post-modal");
const newPostClostBtn = newPostModal.querySelector(".modal__close-bttn");

profileEditBtn.addEventListener("click", function () {
  editProfileModal.classList.add("modal_is-opened");
});

editProfileCloseBtn.addEventListener("click", function () {
  editProfileModal.classList.remove("modal_is-opened");
});

profileAddBtn.addEventListener("click", function () {
  newPostModal.classList.add("modal_is-opened");
});

newPostClostBtn.addEventListener("click", function () {
  newPostModal.classList.remove("modal_is-opened");
});
