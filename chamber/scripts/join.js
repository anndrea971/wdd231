// 1. Populate Hidden Timestamp
const timeStamp = document.querySelector("#timestamp");
if (timeStamp) {
  const now = new Date();
  timeStamp.value = now.toLocaleDateString();
}

// 2. Card Animation Staggering
const cards = document.querySelectorAll(".membership-card");
cards.forEach((card, index) => {
  card.style.animationDelay = `${index * 0.3}s`;
});

// javaScript For The Modal Box
const modalOverlay = document.querySelector(".modal-overlay");
const openModalButtons = document.querySelectorAll(".modal-open");
const closeModalButton = document.querySelectorAll(".modal-close");

openModalButtons.forEach((modalButton) => {
  modalButton.addEventListener("click", () => {
    const modalId = modalButton.getAttribute("data-modal");
    const modal = document.getElementById(modalId);
    modal.showModal();
    modalOverlay.style.display = "block";
    
  });
});

closeModalButton.forEach((closeButton) => {
  closeButton.addEventListener("click", () => {
    closeButton.closest("dialog").close();
    modalOverlay.style.display = "none";
  });
});


  // javaScript For Form Validation
   const form = document.getElementById("membership-form");
  const firstName = document.getElementById("first-name");
  const lastName = document.getElementById("last-name");
   const email = document.getElementById("email");
   const phoneNumber = document.getElementById("phone-number");
   const orgTitle = document.getElementById("org-title");
   const orgName = document.getElementById("org-name");

   form.addEventListener("submit", (e) => {
     e.preventDefault();

     submitForm();
   });

   function submitForm() {
     const firstNameValue = firstName.value;
    const lastNameValue = lastName.value;
     const emailValue = email.value;
     const phoneNumberValue = phoneNumber.value;
     const orgTitleValue = orgTitle.value;
     const orgNameValue = orgName.value;

     if (firstNameValue === '') {
       setErrorFor(firstName, "Username Cannot Be Empty!");
     } else {
       setSuccessFor(firstName);
    }

     if (lastNameValue === "") {
       setErrorFor(lastName, "Username Cannot Be Empty!");
     } else {
       setSuccessFor(lastName);
     }

     if (emailValue === "") {
       setErrorFor(emailValue, "Username Cannot Be Empty!");
     } else {
       setSuccessFor(emailValue);
     }

     if (phoneNumberValue === "") {
       setErrorFor(phoneNumber, "Username Cannot Be Empty!");
     } else {
       setSuccessFor(phoneNumber);
     }

     if (orgTitleValue === "") {
     setErrorFor(orgTitle, "Username Cannot Be Empty!");
     } else {
     setSuccessFor(orgTitle);
     }

   if (orgNameValue === "") {
     setErrorFor(orgName, "Username Cannot Be Empty!");
   } else {
     setSuccessFor(orgName);
   }

   function setErrorFor(input, message) {
     const formContent = input.parentElement;
     const errorMessage = formContent.querySelector(".error-message");
     errorMessage.textContent = message;

     formContent.classList.add("error");
     formContent.classList.remove("success");
   }

   function setSuccessFor(input) {
     const formContent = input.parentElement;

     formContent.classList.add("success");
     formContent.classList.remove("error");
   }
 }