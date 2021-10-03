//fetching the api data
var url='https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.min.json'
fetchData = async () => {
    
    try {
        jsdata = await fetch(url);
    convertedData = await jsdata.json();
   
    
    return convertedData
    } catch(err) {
        console.error(err);
    }
}

//inserting the fetched currencies into the table
function SetData(currencies) {
    
    acronyms = Object.keys(currencies);
    table = document.getElementById('table');

    for (i = 0; i < acronyms.length;i++) {
        
        tr = table.insertRow(i+1);
        td = tr.insertCell();
        td.innerHTML = acronyms[i].toUpperCase();

        td = tr.insertCell();
        td.innerHTML = currencies[acronyms[i]];
    }



}


//filtering the required data as per user input
function filter(data) {
  
 //checking which filter function is being called
    var searchwords;
    if (data === 0) {
        searchwords = document.getElementById('inp_acronym').value.toUpperCase();
    } else {
        searchwords = document.getElementById('inp_currency').value.toUpperCase();
    }

    rows = document.getElementsByTagName('tr');


    for(let i=1; i<rows.length; i++){
        td=rows[i].getElementsByTagName("td")[data];
        val= td.innerHTML;
        if(val.toUpperCase().indexOf(searchwords) > -1){
        console.log(val.toUpperCase().indexOf(searchwords));
        rows[i].style.display='';
        }
        else
        rows[i].style.display="none";
    }

}

//clearing the nearby filter when switching to other
function clearCurrency() {
    
    document.getElementById('inp_currency').value = ''
}

function clearAcronym() {
    document.getElementById('inp_acronym').value = ''
}

//calling the filter function
function filterbyacro() {

    filter(0);
    
}


function filterbycurr() {
    
    filter(1);
}

 // main function
 async function start () {
    let currency_details = await fetchData();
     SetData(currency_details);
}

//program execution starts here
start();