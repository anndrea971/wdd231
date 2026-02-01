const submittedDetails = document.querySelector("#submission-details");
const getString = new URLSearchParams(window.location.search);

const firstName = getString.get("first_name");
const lastName = getString.get("last_name");
const email = getString.get("email");
const PhoneNumber = getString.get("phone");
const orgName = getString.get("org_name");
const timestamp = getString.get("timestamp");

const detailedLists = `
<ul>
  <li><strong>First Name:</strong> ${firstName}</li>
  <li><strong>Last Name:</strong> ${lastName}</li>
  <li><strong>Email Address:</strong> ${email}</li>
  <li><strong>Phone Number:</strong> ${PhoneNumber}</li>
  <li><strong>Business Name:</strong> ${orgName}</li>
  <li><strong>Form Opened at:</strong> ${timestamp}</li>
</ul>
`;

submittedDetails.innerHTML = detailedLists;