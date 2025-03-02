// Select DOM elements
const form = document.getElementById("form");
const successDisplay = document.getElementById("successDisplay");
const firstName = document.getElementById("first-name");
const lastName = document.getElementById("last-name");
const generalEnq = document.getElementById("general_enq");
const supportReq = document.getElementById("support_req");
const email = document.getElementById("email");
const message = document.getElementById("message");
const consent = document.getElementById("consent");
const firstNameError = document.getElementById("first_name-error");
const lastNameError = document.getElementById("last_name-error");
const emailError = document.getElementById("email-error");
const queryTypeError = document.getElementById("query_type-error");
const messageError = document.getElementById("message_error");
const consentError = document.getElementById("consent_error");
const submitBtn = document.getElementById("submitBtn");

// Regular expression for email validation as per HTML specification
const emailRegExp =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

// Check if a field is filled
const isFieldFilled = (field) => field.value.trim().length > 0;

// Check if the email is valid
const isValidEmail = () => {
  const validity = email.value.length !== 0 && emailRegExp.test(email.value);
  return validity;
};

// Check if a query type is selected
const isQueryTypeSelected = () => generalEnq.checked || supportReq.checked;

// Check if consent is given
const isConsentGiven = () => consent.checked;

// Update input class based on the validity
const setInputClass = (inputEl, isValid) => {
  inputEl.classList.toggle("error", !isValid);
};

// Update error message and visibility
const updateError = (isValid, errorField, errorMsg) => {
  errorField.textContent = isValid ? "" : errorMsg;
  errorField.classList.toggle("d-none", isValid);
};

// Validate all fields and update errors
const validateForm = () => {
  const isFirstNameValid = isFieldFilled(firstName);
  const isLastNameValid = isFieldFilled(lastName);
  const isEmailValid = isValidEmail();
  const isQueryTypeValid = isQueryTypeSelected();
  const isMessageValid = isFieldFilled(message);
  const isConsentValid = isConsentGiven();

  // Update input classes and error messages
  setInputClass(firstName, isFirstNameValid);
  updateError(isFirstNameValid, firstNameError, " This field is required");

  setInputClass(lastName, isLastNameValid);
  updateError(isLastNameValid, lastNameError, " This field is required");

  setInputClass(email, isEmailValid);
  updateError(isEmailValid, emailError, " Please enter a valid email address");

  setInputClass(queryTypeError, isQueryTypeValid);
  updateError(isQueryTypeValid, queryTypeError, " Please select a query type");

  setInputClass(message, isMessageValid);
  updateError(isMessageValid, messageError, "This field is required");

  setInputClass(consent, isConsentValid);
  updateError(
    isConsentValid,
    consentError,
    "To submit this form, please consent to being contacted",
  );

  // Return overall form validity
  return (
    isFirstNameValid &&
    isLastNameValid &&
    isEmailValid &&
    isQueryTypeValid &&
    isMessageValid &&
    isConsentValid
  );
};

// Scroll to the first invalid input field
const scrollToFirstError = () => {
  const firstInvalidInput = form.querySelector(".error");
  if (firstInvalidInput) {
    firstInvalidInput.scrollIntoView({ behavior: "smooth", block: "center" });
  }
};

const handleSubmit = (e) => {
  e.preventDefault();

  // Validate the form
  const isFormValid = validateForm();

  if (isFormValid) {
    // Show success message
    successDisplay.classList.remove("d-none");
    window.scrollTo({ top: 0, behavior: "smooth", block: "center" });
    form.reset(); // Reset the form
  } else {
    // Form is invalid, log errors and scroll to the first invalid field
    console.log("Form submission failed due to validation errors.");
    scrollToFirstError();
  }
};

// Add input event listeners for real-time validation
firstName.addEventListener("input", () => validateForm());
lastName.addEventListener("input", () => validateForm());
email.addEventListener("input", () => validateForm());
generalEnq.addEventListener("input", () => validateForm());
supportReq.addEventListener("input", () => validateForm());
message.addEventListener("input", () => validateForm());
consent.addEventListener("input", () => validateForm());

// Add form submission event listener
form.addEventListener("submit", handleSubmit);
