document.addEventListener("DOMContentLoaded", function () {
//variables
    let sum = 0;
    let pageInfo = document.getElementById("page-info");
    console.log(pageInfo);
    let checkBoxes = document.querySelectorAll(".section-2 input[type='checkbox']");
    let totalPrice = document.getElementById("price");
    let form = document.querySelector(".section-2 form");
    let nodesToArray = [].slice.call( document.querySelectorAll( "input[type='checkbox']" ) ); // change nodeList pseudoArray on array, on wich map(), filter() etc. may operate.
    let priceInputs = nodesToArray.filter(function (e) { return e.hasAttribute("data-price") === true } ); // take out inputs with price attached
    let prices = priceInputs.map(function (e) { return ( parseFloat(e.dataset.price) )}); //take out price values



//functions

    let enlarge = function(){
        let element = document.querySelector(".alert-container");
    };
    let fadeInOut = function(){
      let container = document.querySelector(".alert");
      let op = 0.1;
      let timer = window.setInterval(function () {

          if ( op >= 0.6){
              window.clearInterval(timer);

              window.setTimeout(function () {
                  container.style.backgroundColor ="rgba(0,0,0,0.6)";
                  container.style.opacity = "";
                  },20)
          }
          container.style.opacity = op;
          op += op * 0.05;
      },20)
    };

    let showAlert = function(){
        let alert = document.querySelector(".alert");
        alert.classList.toggle("hide");
        fadeInOut();
    };
    let checkUncheckAll = function(boolean, element){

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
    let handleInputs = function(element, index){

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
    let handleSubmit = function(){
        event.preventDefault();
        let info;
        let self = this;
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
        showAlert();
    };

//events
    checkBoxes.forEach(function ( element, index ) {

        element.addEventListener("change", function () {
            handleInputs( element, index )
        });
    });
    console.log(form);
    form.onsubmit = handleSubmit;
});