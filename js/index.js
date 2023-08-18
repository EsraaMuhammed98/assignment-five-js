var displayWeather = document.getElementById('display-weather')

 window.addEventListener('load',()=>{
    let loader = document.getElementById('loading')
    loader.classList.add('d-none')
    loader.addEventListener('transitionend',()=>{
        loader.classList.remove('d-none')
    })
 })

let currentMonth=''
let monthNumber=0
let currentDay=''
let nextDay=''
let dayaftertomorrow=''
let current=''
let forecastDate=[]
let forecastday=[]
let data ={}
async function getApi(country) {
 
    const xml= await fetch(`https://api.weatherapi.com/v1/forecast.json?key=44bb44c6dba940e289f160556221705&q=${country}&aqi=no&days=3`) 
 data =await xml.json()
   current = data.current.last_updated
    forecastday= data.forecast.forecastday;
    forecastDate =forecastday.map((el)=>{return el.date })  
    // console.log(forecastDate)
    displayData();
}

getApi('cairo')


function displayData(){
   getTimeFunc()
 displayWeather.innerHTML = `
 <section class="inputs p-0">
     <input type="text"  id="search" class="form-control rounded-pill" placeholder="Find Your Location...." oninput="findCountry(search.value)">
     <input value="Find" class="btn rounded-pill" type="submit"> 
 </section>
 <div class="col-12 col-md-4 p-0">
 <div class="card" id="weather-today">
<div class="card-header">
<p>${currentDay}</p>
<p>${monthNumber+currentMonth}</p>
</div>

     <div class="card-body">
         <h6 class="card-location">${data.location.name}</h6>
         <h4 class="card-temp">${data.current.temp_c}<span><sup>o</sup>C</span>
             <img src=${data.current.condition.icon} alt="">
         </h4>
         <p class="card-text">${data.current.condition.text}</p>
         <ul class="weather-icons d-flex">
             <li>
                 <img src="./images/icon-umberella@2x.png"/>
                 20%
             </li>
             <li>
                 <img src="./images/icon-wind@2x.png"/>
                 18km/h
             </li>
             <li>
                 <img src="./images/icon-compass@2x.png"/>
                 East
             </li>
         </ul>
     </div>
 </div>
</div>

<div class="col-12 col-md-4 p-0">
 <div class="card"  id="weather-tomorrow">
<div class="card-header d-flex justify-content-center align-items-center">
 <p>${nextDay}</p>

</div>

     <div class="card-body d-flex align-items-center  justify-content-center flex-column">
     <div class="temp-icon mb-4">
     <img class="p-0" src=${forecastday[1].day.condition.icon} alt="">
</div>
        <h3 class="maximum-temperatures">
       ${forecastday[1].day.maxtemp_c}<span><sup>o</sup>C</span>
        </h3> 
        <h6 class="Minimum-temperatures">
        ${forecastday[1].day.mintemp_c}<span><sup>o</sup>C</span>

        </h6> 
        <p class="card-text">${forecastday[1].day.condition.text}</p>
     </div>
 </div>
</div>

<div class="col-12 col-md-4 p-0">
 <div class="card"  id="weather-day-after-tomorrow">
<div class="card-header d-flex justify-content-center">
 <p>${dayaftertomorrow}</p>

</div>

     <div class="card-body d-flex align-items-center justify-content-center flex-column">
     <div class="temp-icon mb-4">
     <img class="p-0" src=${forecastday[2].day.condition.icon} alt="">
</div>
        <h3 class="maximum-temperatures">
        ${forecastday[2].day.maxtemp_c}<span><sup>o</sup>C</span>
        </h3> 
        <h6 class="Minimum-temperatures">
        ${forecastday[2].day.mintemp_c}<span><sup>o</sup>C</span>
        </h6> 
        <p class="card-text">${forecastday[2].day.condition.text}</p>
     </div>
 </div>
</div>
 `
        }


 
 
function getTimeFunc(){
let d =new Date(current)
currentDay= d.toLocaleDateString('en-us',{weekday:"long"});
 currentMonth = d.toLocaleString('en-us',{month:'long'})
 monthNumber = d.getDate()
 for(let i=0; i<2; i++){
     let nd = new Date(forecastDate[i])
 nextDay=nd.toLocaleDateString('en-us',{weekday:"long"});
 let dat = new Date(forecastDate[i+1])
 dayaftertomorrow=dat.toLocaleDateString('en-us',{weekday:"long"});
 

 }
}
   
 
  function findCountry(country){
    getApi(country)
   
}


 