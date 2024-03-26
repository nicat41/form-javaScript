let form = document.querySelector("#form");

let errorHTML = (element, message) => {
  if (element.parentElement.querySelector("p")) element.parentElement.querySelector("p").remove();
  element.parentElement.insertAdjacentHTML("beforeend",`<p class="text-red-500">${message}</p>`);
  element.classList.add("border-red-500");
};
let successHTML = (element) => {
  //// 10 eger inputun icerisindeki value bir deyer alibsa o zaman onceden olan p tab ve sil ve class.listindeki borderi de sil
  if (element.parentElement.querySelector("p")) element.parentElement.querySelector("p").remove(); element.classList.remove("border-red-500");
};

//1 funksiya::
let checkRequired = (element) => {
  if (element.value.trim() === "") {
    errorHTML(element, `${element.id} is Required`);
  } else {
    successHTML(element);
  }
};
//2 funksiya::
let checkMinMax = (element) => {
  if (!element.parentElement.querySelector("p")) {
    let min = element.getAttribute("data-min");
    let max = element.getAttribute("data-max");
    if (element.value.length < parseInt(min)) {
      errorHTML(element, `min ${min} simvol olmalidir`);
    }
    else if (element.value.length > parseInt(max)) {
      errorHTML(element, `max ${max} simvol olmalidir`);
    }
  }
};

// funksiya  :3
let checkPassword = (element) => {
  let some = element.getAttribute("data-some");
  ///// yuxarida goturduyumuz data-some icerindekini asagida document.queryselector da daxil olunan idsini dinaik edirik
  let passwordInput = document.querySelector(`#${some}`);
  if (passwordInput) {
    let passwordValue = passwordInput.value;
  console.log(passwordValue)
    let elementValue = element.value;
    if (passwordValue !== elementValue) {
      errorHTML(element, "sifreler uygun deyil");
    }
  }
};

//// 4 funksiya:: ValidateEmail
const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};
let checkEmail = (element) => {
  let isEmail = validateEmail(element.value);
  if (!isEmail && !element.parentElement.querySelector("p"))
    errorHTML(element, "zehmet olmasa email duzgun daxil edin");
};

//// 5 funksiya:: Validate Number
let validateUSPhoneNumber = (number) => {
  var regExp = /^(\([0-9]{3}\) |[0-9]{3})[0-9]{3}[0-9]{2}[0-9]{2}/;
  let phone = number.match(regExp);
  if (phone) {
    return true;
  } else {
    return false;
  }
};
//// 5 funksiya:: 
let checkPhone = (element) => {
  let value = element.value;
  if (!validateUSPhoneNumber(value) && !element.parentElement.querySelector("p")) {
    errorHTML(element, "zehmet olmasa telefon nomresi duzgun daxil edin");
  }
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  //// 2  for icerisinde e.target.elements yazdigimizda formun icerisindeki butun form elementlerini errey olaraq verir geri verir bize
  for (let element of e.target.elements) {
    /////// 3 for icerisinde e.target.elements element olaraq bir bir otuturuk for icersinde
    if (element.tagName !== "BUTTON") {
      /* 4 if in icerisibnde deyirik ki element tagname yeni teg deyerini godururuk deyirik ki eger buttona beraber deyilse if in icindeki qalan her seyi yeni inputlari
             atsin checkRequired funksiyasina inputu element olaraq gonderirik 
            */
            ///// 1 funksiya::
      if (element.getAttribute("data-required")) {
        checkRequired(element);
      }
      ///// 2 funksiya:: burdan aldigimiz deyerlerden biri varsa   checkMinMax(element) funksiyasini islet daha sonra yuxarida bu funksiyani yoxla
      if (element.getAttribute("data-min") || element.getAttribute("data-max")) {
        checkMinMax(element);
      }
      //// 3 funksiya:: submit olan zaman eger data some varsa bunu checkPassword(element) metodunu cagiriram daha sonra yuxarida ki funksiyada bunu isledirem
      if (element.getAttribute("data-some")) {
        checkPassword(element);
      }
        //// 4 funksiya::
      if (element.getAttribute("data-email")) {
        checkEmail(element);
      }
        //// 5 funksiya::
      if (element.getAttribute("data-phone")) {
        checkPhone(element);
      }
    }
  }
});
