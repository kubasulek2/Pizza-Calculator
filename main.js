document.addEventListener("DOMContentLoaded", function () {
//variables
    let sum = 0;
    let btn1 = document.getElementById("accept-1");
    let btn2 = document.getElementById("accept-2");
    let pageInfo = document.getElementById("page-info");
    let alertBtn = document.querySelector("#alert-button");
    let checkBoxes = document.querySelectorAll(".section-2 input[type='checkbox']");
    let totalPrice = document.getElementById("price");
    const form = document.querySelector(".section-2 form");
    const alertPage = document.querySelector(".alert");
    const sizeSelect = document.querySelectorAll(".section-1-list");
    const doughSelect = document.querySelectorAll(".section-1-list2");

//functions
    // sekcja 1, przekalkulowanie kosztów i przejscie dalej
    let handleSize = function(){
        console.log("dzialam");
    };

    //zmiana podstrony, plus efekty fade

    let changeSection = function (n) {

        const allSections = document.querySelectorAll(".section");
        const navBarItems = document.querySelectorAll(".navbar-item");
        let activeSectionIndex = findIndex();
        let activeSection = allSections[activeSectionIndex];
        let activeNavBarItem = navBarItems[activeSectionIndex];
        let newSection = allSections[activeSectionIndex + n];
        let newNavBarItem = navBarItems[activeSectionIndex + n];
        let op1 = 0;
        let op2 = 1;

        function findIndex() {
            for(let i = 0; i < allSections.length; i++){
                if(! allSections[i].classList.contains("hide")){ return i}
            }
        }
        activeSection.style.opacity = 1;
        newSection.style.opacity = 0;

        let timerOut = window.setInterval(function () {

            if (op2 <= 0.05){

                window.clearInterval(timerOut);
                window.setTimeout( function (){

                    activeSection.style.opacity = '';
                    activeSection.classList.add("hide");
                    activeNavBarItem.classList.remove("active");
                    newNavBarItem.classList.add("active");
                    newSection.classList.remove("hide");
                    },0 );

                let timerIn = window.setInterval(function () {

                    if (op1 >= 0.95){
                        window.clearInterval(timerIn);
                        window.setTimeout( function (){

                            newSection.style.opacity = '';
                            }, 0);
                    }
                    newSection.style.opacity = op1;
                    op1 += 0.1 * 0.65
                },16);
            }
            activeSection.style.opacity = op2;
            op2 -= 0.1 * 0.65
        },16);

    };
    document.querySelector("#accept-1").addEventListener("click", function () {
       changeSection(1);
    });

    //zamkniecie alertu po kliknieciu poza jego boxem
    let outsideBoxClick = function(){
        if ( ! alertPage.classList.contains("hide") ){
            if ( ! event.target.closest(".alert-container") ){showAlert(false)}
        }
    };

    //funkcja ktora konczy otwieranie okna alertu, lub zaczyna jego zamykanie

    let zoomInOut = function(boolean){
        let element = document.querySelector(".alert-container");
        let heightUnit = boolean ? 45 : -45;
        let height = boolean ? 0 : 800;
        let timer = window.setInterval(function () {

            if ( boolean && height >= 800 ) {
                window.clearInterval(timer)

            } else if ( ! boolean && height <= 40 ){
                element.style.height = "0";
                fadeOut();
                window.clearInterval(timer)
            }

            element.style.height = height + "px";
            height += heightUnit;
        },10)
    };

    //zaczyna otwierac okno alertu
    let fadeIn = function(boolean){

        alertPage.classList.remove("hide");
        let container = document.querySelector(".alert");
        let op = 0.1;
        let timer = window.setInterval(function () {
            if ( op >= 0.7){
                  window.clearInterval(timer);
                  window.setTimeout(function () {
                      container.style.backgroundColor ="rgba(0,0,0,0.7)";
                      container.style.opacity = "";
                      zoomInOut(boolean);
                      },20)
            }
          container.style.opacity = op;
          op += op * 0.15;
      },10)
    };

    //konczy zamykac okno alertu
    let fadeOut = function(){

        let container = document.querySelector(".alert");
        container.style.backgroundColor ="rgba(0,0,0,0.7)";
        container.style.opacity = "0.7";
        let op = 0.7;
        let timer = window.setInterval(function () {
            if ( op <= 0.1){
                alertPage.classList.add("hide");
                container.style.backgroundColor="";
                op ="0";
                window.clearInterval(timer);
            }
          container.style.opacity = op;
          op = op - 0.1 * 0.15;
      },10)
    };
    // wywoluje lub chowa alert
    let showAlert = function(boolean){

        boolean ? fadeIn(boolean) : zoomInOut(boolean);
        //dodaje lub usuwa event ktory zamyka ramke alertu po kliknieciu poza nia
        boolean ? document.addEventListener("click",outsideBoxClick) : document.removeEventListener("click",outsideBoxClick)

    };

    //funkcja odpowiedzialna za zaznaczanie lub odznaczanie wszystkich checkboxow
    let checkUncheckAll = function(boolean, element){

        let nodesToArray = [].slice.call( document.querySelectorAll( "input[type='checkbox']" ) ); // change nodeList pseudoArray on array, on wich map(), filter() etc. may operate.
        let priceInputs = nodesToArray.filter(function (e) { return e.hasAttribute("data-price") === true } ); // take out inputs with price attached
        let prices = priceInputs.map(function (e) { return ( parseFloat(e.dataset.price) )}); //take out price values

        for(let i = 0; i < checkBoxes.length -1; i++){ checkBoxes[i].checked = boolean}

        if (boolean){
            sum = 0;
            prices.forEach(function (e  ) { sum += e } );
        } else{
            sum = 0
        }

        window.setTimeout(function () {
            element.checked = false;
        }, 300)
    };
    //operacje na checkboxach
    let handleInputs = function(element, index){

        let nodesToArray = [].slice.call( document.querySelectorAll( "input[type='checkbox']" ) ); // change nodeList pseudoArray on array, on wich map(), filter() etc. may operate.
        let priceInputs = nodesToArray.filter(function (e) { return e.hasAttribute("data-price") === true } ); // take out inputs with price attached
        let prices = priceInputs.map(function (e) { return ( parseFloat(e.dataset.price) )}); //take out price values

        let elChecked = element.checked;
        sum = Number(document.querySelector("#price").innerText);

        if ( !index ) {

            if ( elChecked ) {
                checkUncheckAll( true, element )
            }

        } else if ( index === checkBoxes.length - 1 ){

            checkUncheckAll(false, element);
        } else {

            if ( elChecked ){ sum += parseFloat(prices[index - 1].toFixed(2)) }
            else {
                console.log(sum);
                console.log(prices[index - 1]);
                sum -= parseFloat(prices[index - 1].toFixed(2))
            }
        }
        sum = sum.toFixed(2);
        totalPrice.innerText = sum;
    };

    //zaakceptowanie skladnikow
    let handleSubmit = function(){

        event.preventDefault();
        let info;
        let alright = false;


        for ( let i = 1; i < checkBoxes.length - 1; i++ ){
            if ( checkBoxes[i].checked ){ alright = true }
        }

        if ( alright ) {
            info = "Total cost of your Pizza is " + sum +"$. Are You sure You want to proceed?";
        } else {
            info = "You must choose at least one ingredient!";
        }

        pageInfo.innerText = info;
        showAlert(true);
    };

//events
    checkBoxes.forEach(function ( element, index ) {

        element.addEventListener("change", function () {
            handleInputs( element, index )
        });
    });
//event na formularz, plus zablokowanie przycisku na czas animacji(nie chce dzialac na czas!!)
    form.addEventListener("submit", function () {
        window.setTimeout( function () {btn2.style.pointerEvents = "none"},0 );
        window.setTimeout( function () {btn2.style.pointerEvents = ""},800 );

        handleSubmit();
    });

    //zamkniecie alertu po kliknieciu w przycisk
    alertBtn.addEventListener("click", function () {
        showAlert(false)
    });

    // Section 1 Size choice
    sizeSelect.forEach(function (el) {
        el.onclick = handleSize;
    })
});