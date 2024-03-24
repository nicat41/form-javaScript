let form = document.querySelector("#form")

let checkRequired = (element) => {

    if(element.value.trim() === '') {
        if(element.parentElement.querySelector("p")) (element.parentElement.querySelector("p")).remove();
        element.parentElement.insertAdjacentHTML('beforeend', `<p class="text-red-500">Required</p>`);
        element.classList.add("border-red-500")
     }
     else {
        if(element.parentElement.querySelector("p")) (element.parentElement.querySelector("p")).remove();
        element.classList.remove("border-red-500");
     }
}

form.addEventListener('submit', (e) => {
    e.preventDefault()
  
    for(let element of e.target.elements) {
        if(element.tagName !== "BUTTON") {
            checkRequired(element)
        }
    }
})