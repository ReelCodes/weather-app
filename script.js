 const apiKey = "6235d7ca0c5bbe288c0618afe90bfc98";

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');
const url = (city)=> `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
const time = new Date().toLocaleTimeString();
const date = new Date().toLocaleDateString();



async function getWeatherByLocation(city){
     
         const resp = await fetch(url(city), {
             origin: "cros" });
         const respData = await resp.json();
     
           addWeatherToPage(respData);
          
     }

      function addWeatherToPage(data){
          const temp = Ktoc(data.main.temp);

          const weather = document.createElement('div')
          weather.classList.add('weather');

          weather.innerHTML = `
          <div>
          <h1>${search.value}</h1>
          <h2 class="temp"><img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /> ${temp}°C <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /></h2>
          <h3>${data.weather[0].main}</h3>
          <table>
              <tr>
                  <td>Description</td>
                  <td>${data.weather[0].description}</td>
              </tr>
              <tr>
                  <td>Pressure</td>
                  <td>${data.main.pressure}</td>
              </tr>
              <tr>
                    <td>Humidity</td>
                    <td>${data.main.humidity}</td>
               </tr>
               <tr>
                     <td>Time</td>
                     <td>${time}</td>
                </tr>
                <tr>
                      <td>Date</td>
                      <td>${date}</td>
                 </tr>
          </table>    
          </div>      
          `;


        //   cleanup 
          main.innerHTML= "";
           main.appendChild(weather);
      };


     function Ktoc(K){
         return Math.floor(K - 273.15);
     }



     form.addEventListener('submit',(e) =>{
        e.preventDefault();

        const city = search.value;

        if(city){
            getWeatherByLocation(city)
        }

     });

