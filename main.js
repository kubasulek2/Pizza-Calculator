document.addEventListener("DOMContentLoaded", function () {
//variables
    let sum = 0;
    let pageInfo = document.getElementById("page-info");
    let checkBoxes = document.querySelectorAll("input[type='checkbox']");
    let totalPrice = document.getElementById("price");
    let form = document.querySelector("form");
    console.log(form);
    let nodesToArray = [].slice.call( document.querySelectorAll( "input[type='checkbox']" ) ); // change nodeList pseudoArray on array, on wich map(), filter() etc. may operate.
    let priceInputs = nodesToArray.filter(function (e) { return e.hasAttribute("data-price") === true } ); // take out inputs with price attached
    let prices = priceInputs.map(function (e) { return ( parseFloat(e.dataset.price) )}); //take out price values


//functions
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
        if ( !index ) {

            if ( elChecked ) {
                checkUncheckAll( true, element )
            } else {
                checkUncheckAll( false, element )
            }
        } else if ( index === checkBoxes.length - 1 ){

            checkUncheckAll(false, element);
        } else {

            if ( elChecked ){ sum += prices[index - 1]}
            else { sum -= prices[index - 1]}

        }
        sum = parseFloat(sum.toFixed(2));
        totalPrice.innerText = sum + "zł";
    };
    let submitHandle = function(){

        event.preventDefault();
        let info;
        let self = this;
        let alright = false;

        for ( let i = 1; i < checkBoxes.length - 1; i++ ){
            if ( checkBoxes[i].checked ){ alright = true }
        }

        if ( alright ) {
            info = "Total cost of your Pizza is " + sum +"zł. Are You sure You want to proceed?";
        } else {
            info = "You must choose atleast one ingredient";
        }

        pageInfo.innerText = info;
        pageInfo.nextElementSibling.addEventListener("click", function () {
            self.submit();
        })

    };

//events
    checkBoxes.forEach(function ( element, index ) {

        element.addEventListener("click", function () {
            handleInputs( element, index )
        });
    });

    form.onsubmit = submitHandle;
});