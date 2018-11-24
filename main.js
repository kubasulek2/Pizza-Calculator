document.addEventListener("DOMContentLoaded", function () {
//variables

    let sum = 0;
    let sizeCost = 0;
    let doughCost = 0;
    let inputs = document.querySelectorAll(".section-3 input");
    let btn1 = document.getElementById("accept-1");
    let btn2 = document.getElementById("accept-2");
    const btnPrev1 = document.getElementById("prev-1");
    const btnPrev2 = document.getElementById("prev-2");
    let pageInfo = document.getElementById("page-info");
    let alertBtn = document.querySelector("#alert-button");
    let checkBoxes = document.querySelectorAll(".section-2 input[type='checkbox']");
    let totalPrice = document.getElementById("price");
    let basePrice = document.getElementById("cost");
    let size = document.getElementById("size");
    let dough = document.getElementById("dough");
    const form = document.querySelector(".section-2 form");
    const alertPage = document.querySelector(".alert");
    const sizeSelect = document.querySelectorAll(".section-1-list li");
    const doughSelect = document.querySelectorAll(".section-1-list2 li");
    let initialPrices = resetPrices();

    let pizzaData = {
        size: "",
        dough: "",
        ingredients: [],
        cost: []
    };
    let orderData = {
        name: '',
        surname: '',
        street: '',
        apartment: '',
        postalCode: '',
        email: '',
        telNumber: '',
        comments: ''
    };



//functions
    // sekcja 1, przekalkulowanie kosztów i przejscie dalej
    function resetPrices(){
        let initialPrices = [];
        for ( let i = 1; i < checkBoxes.length - 1; i++ ){
            initialPrices.push(parseFloat(checkBoxes[i].dataset.price).toFixed(2));
        }
        return initialPrices
    }
    let handleSize = function(){

        sizeCost = 0;
        let price = parseFloat(this.dataset.price);
        let multiply = parseFloat(this.dataset.multiply);

        size.innerText = this.innerText;
        sizeCost += price;
        let calculatedPrice = (sizeCost + doughCost).toFixed(2);
        basePrice.innerText = calculatedPrice;

        //wyzerowanie cen
        for ( let i = 1; i < checkBoxes.length - 1; i++ ){
            checkBoxes[i].dataset.price = initialPrices[i-1];
        }
        //zastosowanie mnoznika na ceny
        for ( let i = 1; i < checkBoxes.length - 1; i++ ){
            checkBoxes[i].dataset.price = parseFloat(checkBoxes[i].dataset.price * multiply).toFixed(2);
            checkBoxes[i].nextElementSibling.innerText = checkBoxes[i].dataset.price;
        }
    };
    let handleDough = function(){

        doughCost = 0;
        let price = parseFloat(this.dataset.price);

        dough.innerText = this.innerText;
        doughCost += price;
        let calculatedPrice = (sizeCost + doughCost).toFixed(2);
        basePrice.innerText = calculatedPrice;
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


    //zamkniecie alertu po kliknieciu poza jego boxem
    let outsideBoxClick = function(){
        if ( ! alertPage.classList.contains("hide") ){

            if ( ! event.target.closest(".alert-container") ){showAlert(false)}
        }
    };

    //funkcja ktora konczy otwieranie okna alertu, lub zaczyna jego zamykanie

    let zoomInOut = function(boolean){
        let element = document.querySelector(".alert-container");
        let heightUnit = boolean ? 4 : -4;
        let height = boolean ? 0 : 90;
        let timer = window.setInterval(function () {

            if ( boolean && height >= 90 ) {
                window.clearInterval(timer);
                document.addEventListener("click",outsideBoxClick);

            } else if ( ! boolean && height <= 1 ){
                element.style.height = "0";
                fadeOut();
                window.clearInterval(timer)
            }

            element.style.height = height + "vh";
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
                document.removeEventListener("click",outsideBoxClick);
                if ( pageInfo.innerText.includes( "Total" ) ){ changeSection(1) }
            }
          container.style.opacity = op;
          op = op - 0.1 * 0.15;
      },10)
    };
    // wywoluje lub chowa alert
    let showAlert = function(boolean){

        boolean ? fadeIn(boolean) : zoomInOut(boolean);
        //dodaje lub usuwa event ktory zamyka ramke alertu po kliknieciu poza nia


    };

    //funkcja odpowiedzialna za zaznaczanie lub odznaczanie wszystkich checkboxow
    let checkUncheckAll = function(boolean){

        let nodesToArray = [].slice.call( document.querySelectorAll( "input[type='checkbox']" ) ); // change nodeList pseudoArray on array, on wich map(), filter() etc. may operate.
        let priceInputs = nodesToArray.filter(function (e) { return e.hasAttribute("data-price") === true } ); // take out inputs with price attached
        let prices = priceInputs.map(function (e) { return ( parseFloat(e.dataset.price) )}); //take out price values

        for(let i = 0; i < checkBoxes.length -1; i++){ checkBoxes[i].checked = boolean}

        if (boolean){
            sum = 0;
            prices.forEach(function (e) { sum += e } );
        } else{
            sum = 0
        }
    };
    //operacje na checkboxach
    let handleInputs = function(element, index){

        let nodesToArray = [].slice.call( document.querySelectorAll( "input[type='checkbox']" ) ); // change nodeList pseudoArray on array, on wich map(), filter() etc. may operate.
        let priceInputs = nodesToArray.filter(function (e) { return e.hasAttribute("data-price") === true } ); // take out inputs with price attached
        let prices = priceInputs.map(function (e) { return ( parseFloat(e.dataset.price) )}); //take out price values

        let elChecked = element.checked;

        if ( !index ) {

            if ( elChecked ) {
                checkUncheckAll( true,);
                window.setTimeout(function () {
                    element.checked = false;
                }, 300)
            }

        } else if ( index === checkBoxes.length - 1 ){

            checkUncheckAll(false);
            window.setTimeout(function () {
                element.checked = false;
            }, 300)
        } else {

            if ( elChecked ){ sum += parseFloat(prices[index - 1].toFixed(2)) }
            else {
                console.log(sum);
                console.log(prices[index - 1]);
                sum -= parseFloat(prices[index - 1].toFixed(2))
            }
        }
        // zczytanie ceny z sekcji1 dodanie do ceny sekcji 2 i wstawienie do elementu html
        totalPrice.innerText = (sum + parseFloat(basePrice.innerText)).toFixed(2);
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
            info = "Total cost of your Pizza is " + (sum + parseFloat(basePrice.innerText)).toFixed(2) +"$.";
            createPizzaData(true);
        } else {
            info = "You must choose at least one ingredient!";
        }

        pageInfo.innerText = info;
        showAlert(true);
    };

    let createPizzaData = function (boolean) {
        let resumeItem1 = document.querySelector("#resume-item1");
        let resumeItem2 = document.querySelector("#resume-item2");
        let resumeCost = document.getElementById("resume-cost");

        if (! boolean){
            pizzaData.size = '';
            pizzaData.dough = '';
            pizzaData.cost = '';
            pizzaData.ingredients = []
        } else{
            pizzaData.size = size.innerText;
            pizzaData.dough = dough.innerText;
            pizzaData.cost = totalPrice.innerText;

            for(let i = 1; i < checkBoxes.length -1 ; i++){
                if ( checkBoxes[i].checked ){
                    let ingredient = checkBoxes[i].parentElement.innerText.split(",");
                    pizzaData.ingredients.push(ingredient[0]);
                }
            }
            resumeCost.innerText = " " + pizzaData.cost + " $";
            resumeItem1.innerText = pizzaData.size +",  " + pizzaData.dough;
            resumeItem2.innerText = pizzaData.ingredients.join(",  ")+"."
        }
    };

    //validacja inputow z sekcji 3
    let inputsValidate = function(el){

        let type = el.id;
        let correct = false;

        if ( (type === "name" || type === "surname") && (el.value.length >= 2 && /^[a-zA-Z]+$/.test(el.value) ) ){     //czy string zawiera same litery
            correct = true;

        } else if (type === "street" && ( (el.value.length >= 4 && el.value.match(/[a-z]/i)) )){
           correct = true;
        }


        if(correct){
            document.querySelector("#formAlertMessage").innerText = ''

        }else {
            document.querySelector("#formAlertMessage").innerText = "Please enter correct data.";
            el.style.color = "red"
        }
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
        if( pageInfo.innerText === "Are You Sure?" ){
            console.log(pageInfo.innerText);
            location.reload();
        }
        showAlert(false);

    });

    // Section 1 Size choice
    sizeSelect.forEach(function (el) {
        el.addEventListener( "click", handleSize )

    });
    doughSelect.forEach(function (el) {
        el.addEventListener( "click", handleDough )

    });

    //zmiany podstron
    btn1.addEventListener("click", function () {

        if ( dough.innerText === "" || size.innerText === ""){
            pageInfo.innerText = "You must choose size and dough!";
            showAlert(true)
        } else {
            changeSection(1);
            // ustawienie ceny z sekcji 1 na start sekcji 2
            totalPrice.innerText = basePrice.innerText;
        }
    });

    //eventy na przyciskach do zmiany sekcji na poprzednia
    btnPrev1.addEventListener("click", function () {
        changeSection(-1);
        //odcheckowanie wszystkich skladników i powrot do ceny z sekcji 1
        checkUncheckAll(false);
        totalPrice.innerText = basePrice.innerText
    });
    btnPrev2.addEventListener( "click", function () {
        createPizzaData(false);
        changeSection(-1)
    });

    document.querySelector("#reset").addEventListener("click", function () {
        pageInfo.innerText = "Are You Sure?";
        showAlert(true)
    });
    
    
    // handling section 3 inputs
    
    inputs.forEach(function (el) {
        el.addEventListener("blur", function () {
            inputsValidate(el)
        });
        el.addEventListener("focus", function () {
            el.style.color = "";
        })
    })


});