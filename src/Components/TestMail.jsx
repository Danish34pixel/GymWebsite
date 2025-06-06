import emailjs from "emailjs-com";

const templateParams = {
  name: "James",
  notes: "Check this out!",
};
const serviceID = "service_e8ui0id";
const templateID = "template_ckmu8z8";
const userID = "HPatAYbWo_57IPJu6";
emailjs.send(serviceID, templateID, templateParams, userID).then(
  (response) => {
    console.log("SUCCESS!", response.status, response.text);
  },
  (err) => {
    console.log("FAILED...", err);
  }
);
