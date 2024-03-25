let form = document.querySelector("#form")

let errorHTML = (element, message) => {
    if(element.parentElement.querySelector("p"))  (element.parentElement.querySelector("p")).remove();
    ////// 7  if in icerisinde deyirik ki submit olunanda inputun ana elementinin icinde p tegi varsa onu tab ve sil 
            
            element.parentElement.insertAdjacentHTML('beforeend', `<p class="text-red-500">${message}</p>`);
             ////////////// 8 burda ana elementin icerisindeki divin soununa inputun altina bu p tegini elave ed eger yuxarida birinci if in icerisindeki şert doğrudursa
            element.classList.add("border-red-500")
            ///// 9  ve inptun class ina da border-red di elave ed
}
let successHTML = (element) => {
    //// 10 eger inputun icerisindeki deyer doludursa oz zaman onceden olan p tab ve sil ve class.listindeki borderi de sil
    if(element.parentElement.querySelector("p")) (element.parentElement.querySelector("p")).remove();
    element.classList.remove("border-red-500");
}

//////// 5 asagidaki checkRequired funksiyasina oturduyumuz inputlari  checkRequired funksiyasinin icine elementlere otururuk ve colden gelen inputdu burda qebul edirik
let checkRequired = (element) => {
    if(element.value.trim() === '') {
        //////// 6 if in icerisinde deyirik ki element yeni input icerisindeki value esi bosdursa bunuda trim() metodunu beraber edirik "" bosa o zaman asagidaki kod islesin
        errorHTML(element, ` ${element.id} is Required`)
     }
     else {
        successHTML(element)
     }
}

let checkMinMax = (element) => {
    ///// birci if in icerisinde  deyilir ki !element.parentElement.querySelector('p')  yoxdursa axasgidaki kodu isled
    if(!element.parentElement.querySelector('p')) {
        ///////////   burda biz html de yazdigimiz data-min max burdan getattribute vasitesi ile aliriq 
        let min = element.getAttribute("data-min");
        let max = element.getAttribute("data-max");
/////////////////   bu if de ise eger elementin yeni inputun icerindeki value da ki deyerin uzunlugu nu gotururuk eger 7 den az olarsa yuxaridaki ayirdigimiz eror funksiyasini cagiririq
        if(element.value.length < parseInt(min)) {
            errorHTML(element, `min ${min} simvol olmalidir`);
        }
        //// bu sert de eger inputun icerisindeki deyeri in uzunlugu 15 den cox olarsa o zaman bu eror mesajini cixaririq
        else if(element.value.length > parseInt(max)) {
            errorHTML(element, `max ${max} simvol olmalidir`);
        }
    }
}

let checkPassword = (element) => {
    ///// some da yazdigimiz elementin atributunu da data some olani aliriq ve menimsedirik som deyisgenine
let some = element.getAttribute("data-some");
///// daha sonra biz id isi data-some enin icinde olan password ki var onu document.queryselectorda cagirdigimiz zaman deyirik ki ordaki id ni godur ikisinide id beraber oldugu ucun bize o da verir
let passwordInput = document.querySelector(`#${some}`)

if(passwordInput) {
    //// if in de icerisinde deyirik ki eger passwordInput almisiqsa o zaman yeni if ture dursa isle
    let passwordValue = passwordInput.value;
    //////  passwordValue deyiseninde passwordInput icindeki deyeri aliriq
    let elementValue = element.value;
    ///// ve passwordInput deyiskenine de elementdin valuesini de aldigdan sonra da
    if(passwordValue !== elementValue) {
        //// if icersinde deyirik ki eger passwordValue beraber deyilse elementValue bu zaman asagidaki bildirisi cixarsin brauzere
        errorHTML(element, "sifreler uygun deyil")
    }
}
}

form.addEventListener('submit', (e) => {
    //// 1  e.preventDefault() medodunda her submit hadisesinde default davranışını dayandırıram
    e.preventDefault()
  //// 2  for icerisinde e.target.elements yazdigimizda formun icerisindeki butun form elementlerini errey olaraq verir
    for(let element of e.target.elements) {
        /////// 3 for icerisinde e.target.elements element odururuk ve bize forumun icerisindeki input ve buttonu verir
        if(element.tagName !== "BUTTON") {
            /* 4 if in icerisibnde deyirik ki element tagname yeni teg deyerini godururuk deyirik ki eger button a beraber deyilse if in icindeki qalan her seyi yeni inputlari
             atsin checkRequired funksiyasina inputu element olaraq gonderirik 
            */
         if (element.getAttribute("data-required")) {

        ///////////// 11 yuxaridaki if in icerisindeki   bu (element.getAttribute("data-required")) funksiya isleyerse html deki hansi ki input da data-required="ture" verilibse o zaman yuxaridaki funsiya ona samil olunsun
            checkRequired(element)
         }
         ///// burdan aldigimiz deyerlerden biri varsa   checkMinMax(element) funksiyasini islet daha sonra yuxarida bu funksiyani yoxla
         if(element.getAttribute("data-min") || element.getAttribute("data-max")) {
            checkMinMax(element)
         }
         //// submit olan zaman eger data some varsa bunu checkPassword(element) metodunu cagiriram daha sonra yuxarida ki funksiyada bunu isledirem
         if(element.getAttribute("data-some")) {
            checkPassword(element)
         }

        }
    }
})