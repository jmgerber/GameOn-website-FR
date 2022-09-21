function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const modalCloseBtn = document.querySelector(".close")
const modalForm = document.querySelector("#modal-form")
const modalBody = document.querySelector(".modal-body");
const completedModalForm = document.querySelector(".form-completed");
const completedFormCloseBtn = document.querySelector(".btn-close-completed");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
  // inputs and errors reset
  modalForm.reset();
  document.querySelectorAll(".formData").forEach(formdata => formdata.removeAttribute("data-error-visible"));
  modalBody.dataset.formComplete = false;
  isFormCompleted();
}

// close modal event
modalCloseBtn.addEventListener("click", closeModal);
completedFormCloseBtn.addEventListener("click", closeModal);

// close modal form
function closeModal() {
  modalbg.style.display = "none";
}

// Class for Regex verification
class Regex {
  static emailIsValid(value) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(value.toLowerCase());
  }

  static textIsValid(value) {
    const re = /^[A-Za-z][^0-9_!¡?÷?¿\/\\+=@#$%^"&*(){}|~<>;:[\]]{1,}$/;
    return re.test(value);
  }
}

function firstNameVerification (validForm) {
  // Firstname verification
  const firstNameInput = document.querySelector("#first");
  const firstName = firstNameInput.value;
  const firstNameFormData = firstNameInput.parentElement;
  if (firstName.length < 2 || !Regex.textIsValid(firstName)) {
    validForm = false;
    firstNameFormData.dataset.errorVisible = true;
  }
  if (firstName.length >= 2){
    if (Regex.textIsValid(firstName)){
      firstNameFormData.removeAttribute("data-error-visible");
      firstNameFormData.removeAttribute("data-error");
    } else {
      firstNameFormData.dataset.error = "Le prénom est incorrect.";
    }
  } else if (firstName.length === 0){
    firstNameFormData.dataset.error = "Veuillez entrer un prénom.";
  } else {
    firstNameFormData.dataset.error = "Veuillez entrer 2 caractères ou plus pour le champ du prénom.";
  }
  return validForm
}

function lastNameVerification (validForm) {
  // Lastname verification
  const lastNameInput = document.querySelector("#last");
  const lastName = lastNameInput.value;
  const lastNameFormData = lastNameInput.parentElement;
  if (lastName.length < 2 || !Regex.textIsValid(lastName)) {
    // if lastname is invalid
    validForm = false;
    lastNameFormData.dataset.errorVisible = true;
  }
  if (lastName.length >= 2){
    if (Regex.textIsValid(lastName)){
      lastNameFormData.removeAttribute("data-error-visible");
      lastNameFormData.removeAttribute("data-error");
    } else {
      lastNameFormData.dataset.error = "Le nom est incorrect.";
    }
  } else if (lastName.length === 0){
    lastNameFormData.dataset.error = "Veuillez entrer un nom.";
  } else {
    lastNameFormData.dataset.error = "Veuillez entrer 2 caractères ou plus pour le champ du nom.";
  }
  return validForm
}

function emailVerification (validForm) {
  // Email verification
  const emailInput = document.querySelector("#email");
  const email = emailInput.value;
  const emailFormData = emailInput.parentElement;
  if (email.length === 0 || !Regex.emailIsValid(email)) {
    validForm = false;
    emailFormData.dataset.errorVisible = true;
  }
  if (email.length === 0) {
    emailFormData.dataset.error = "Veuillez entrer une addresse mail.";
  } else if (email.length > 0) {
    if (Regex.emailIsValid(email)){
      emailFormData.removeAttribute("data-error-visible");
      emailFormData.removeAttribute("data-error");
    } else {
      emailFormData.dataset.error = "L'email est incorrect.";
    }
  }
  return validForm
}

function birthdateVerification (validForm) {
  // Birthdate verification
  const birthdate = new Date(document.querySelector("#birthdate").value);
  const birthdateInput = document.querySelector("#birthdate");
  const birthdateFormData = birthdateInput.parentElement;
  const actualDate = new Date();
  if (birthdate > actualDate || actualDate.getFullYear() - birthdate.getFullYear() > 118 || !birthdate.valueOf()) {
    validForm = false;
    birthdateFormData.dataset.errorVisible = true;
  }
  if (birthdate > actualDate || actualDate.getFullYear() - birthdate.getFullYear() > 118) {
    birthdateFormData.dataset.error = "La date est invalide.";
  } else if (!birthdate.valueOf()) {
    birthdateFormData.dataset.error = "Veuillez indiquer votre date de naissance.";
  } else {
    birthdateFormData.removeAttribute("data-error-visible");
    birthdateFormData.removeAttribute("data-error");
  }
  return validForm
}

function contestsQuantityVerification (validForm) {
  // Contests quantity verification
  const contestsQuantityInput = document.querySelector("#quantity")
  const contestsQuantity = contestsQuantityInput.value;
  const contestsQuantityFormData = contestsQuantityInput.parentElement;
  if (!contestsQuantity) {
    validForm = false;
    contestsQuantityFormData.dataset.errorVisible = true;
    contestsQuantityFormData.dataset.error = "Veuillez entrer une valeur."
  } else {
    contestsQuantityFormData.removeAttribute("data-error-visible");
    contestsQuantityFormData.removeAttribute("data-error");
  }
  return validForm
}

function locationChoiceVerification (validForm) {
  // Location choice verification
  const locationChoiceInput = document.getElementsByName("location");
  const locationChoiceFormData = locationChoiceInput[0].parentElement;
  if(Array.from(locationChoiceInput).find(r => r.checked) === undefined){
    validForm = false;
    locationChoiceFormData.dataset.errorVisible = true;
    locationChoiceFormData.dataset.error = "Vous devez choisir une option."
  } else {
    locationChoiceFormData.removeAttribute("data-error-visible");
    locationChoiceFormData.removeAttribute("data-error");
  }
  return validForm
}

function termsOfUseVerification (validForm) {
  // Terms of use verification
  const termOfUseInput = document.querySelector("#checkbox1");
  const termOfUseFormData = termOfUseInput.parentElement;
  if (!termOfUseInput.checked) {
    validForm = false;
    termOfUseFormData.dataset.errorVisible = true;
    termOfUseFormData.dataset.error = "Vous devez vérifier que vous acceptez les termes et conditions."
  } else {
    termOfUseFormData.removeAttribute("data-error-visible");
    termOfUseFormData.removeAttribute("data-error");
  }
  return validForm
}

function checkFormEntries() {
  let validForm = true;
  validForm = firstNameVerification(validForm);
  validForm = lastNameVerification(validForm);
  validForm = emailVerification(validForm);
  validForm = birthdateVerification(validForm);
  validForm = contestsQuantityVerification(validForm);
  validForm = locationChoiceVerification(validForm);
  validForm = termsOfUseVerification(validForm);
  return validForm
}

// submit form event
modalForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const valid = checkFormEntries();
  if (valid) {
    modalBody.dataset.formComplete = true;
  }
  isFormCompleted();
})

function isFormCompleted () {
  if (modalBody.dataset.formComplete === "true") {
    modalForm.style.display = "none";
    completedModalForm.style.display = "flex";
  } else {
    modalForm.style.display = "block";
    completedModalForm.style.display = "none";
  }
}