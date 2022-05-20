const dropList = document.querySelectorAll(".drop-list select"),
fromCurrency = document.querySelector(".from select"),
toCurrency = document.querySelector(".to select"),
getButton = document.querySelector("form button")

for (let i = 0; i < dropList.length; i++) {
    for(currency_code in country_code){
        console.log(currency_code)
        let selected;
        if(i == 0){
            selected = currency_code == "USD" ? "selected": "";
        }else if(i == 0){
            selected = currency_code == "NGN" ? "selected": "";
        }
        let optionTag = '<option value="${currency_code}">${currency_code}</option>' ;
        dropList[i].insertAdjacentHTML("beforeend", optionTag);
    }
    dropList[i].addEventListener("change", e =>{
        loadFlag(e.target);
    });
}

function loadFlag(element) {
    for(code in country_code){
        if(code == element.value){
            let imgTag = element.parentElement.querySelector("img");
            imgTag.src = 'https://countryflagsapi.com/png/${country_code[code]}'
        }
    }
}

window.addEventListener("load", () =>{
    getExchangeRate();
});

getButton.addEventListener("click", e =>{
    e.preventDefault();
    getExchangeRate();
});

const exchangeIcon = document.querySelector(".drop-list .icon");
exchangeIcon.addEventListener("click", () => {
    let tempCode = fromCurrency.value;
    fromCurrency = toCurrency.value;
    toCurrency.value = tempCode;
    loadFlag(fromCurrency);
    loadFlag(toCurrency);
    getExchangeRate()
})

function getExchangeRate() {
    const amount = document.querySelector(".amount input");
    exchangeRateTxt = document.querySelector(".exchange-rate");
    let amountVal = amount.value;
    if (amountVal == "" || amountVal == "0") {
        amount.value = "1";
        amountVal = 1;
    }
    exchangeRateTxt.innerHTML = "Getting exchange rate...";
    let url = 'https://v6.exchangerate-api.com/v6/YOUR-API-Key/latest/${fromCurrency.value}';
    fetch(url).then(response => response.json()).then(result => {
        let exchangeRate = result.conversion_rates[toCurrency.value];
        console.log(result);
        let totalExchangeRate = (amountVal * exchangeRate).toFixed(2);
        console.log(totalExchangeRate)
        
        exchangeRateTxt.innerHTML = '${amountVal} ${fromCurrency.value} = ${totalExchangeRate} ${toCurrency.value}';
    }).catch(() => {
        exchangeRateTxt.innerHTML = "Something went wrong";
    });
}