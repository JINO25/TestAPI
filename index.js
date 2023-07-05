const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const apiKey = '2d2e5d75bea14138bc4124448230407';
const URL = 'http://api.weatherapi.com/v1/forecast.json?key='+apiKey+'&q=VietNam&days=7&aqi=yes&alerts=no';
handleData('Vietnam', render, URL);
document.addEventListener('DOMContentLoaded', function() {
    const inputElement = $('.input');
    if (inputElement) {
        inputElement.addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
                const searchValue = inputElement.value;
                const URL = 'http://api.weatherapi.com/v1/forecast.json?key='+apiKey+'&q='+searchValue+'&days=7&aqi=yes&alerts=no';
                handleData(searchValue, render, URL);
            }
        });
    } else {
        console.log('Input element not found.');
    }
});

function handleData(searchValue, callback, URL) {
    fetch(URL)
        .then(res => res.json())
        .then(callback)
}

function render(data) {
    const icon = data.current.condition.icon;
    const viewWeatherContent = $('.view-weather__content');
    const html = `
        <h1 class="view-weather-info">${data.location.name}</h1>
        <h1 class="view-weather-infor">${data.current.temp_c}°C</h1>
    `;
    viewWeatherContent.innerHTML = html;
    const view__img = $('.view-weather_img');
    const imageUrl = `https:${icon}`;
    const imgHtml = `<img src="${imageUrl}" alt="">`;
    view__img.innerHTML = imgHtml;

    const forecastInfor = $('.forecast');
    forecastInfor.innerHTML = '';
    const iconIfor = data.forecast.forecastday[0].hour[7].condition.icon;
   
    const iconInfor = `https:${iconIfor}`;
    const imgInfor = `<img src="${iconIfor}" alt="">`;
    
    for (let i = 0; i < 15; i=i+2) {
    const time = data.forecast.forecastday[0].hour[7+i].time;
    const temp_c = data.forecast.forecastday[0].hour[7+i].temp_c;
    const dateTime = time;
    const Time = dateTime.substring(11, 16);
    const forecastInfor__render = `
        <div class="forecast__infor">
            <div class="forecast__infor__time">${Time}</div>
            <div class="forecast__infor__img">${imgInfor}</div>
            <div class="temperture">${temp_c}°C</div>
        </div>
    `;

    forecastInfor.innerHTML += forecastInfor__render;
    }
    
    const condittion = $('.condition__infor');
    condittion.innerHTML = '';
    const wind = data.current.wind_kph;
    const realFeel = data.current.feelslike_c;
    const uv = data.current.uv;
    const cloud = data.current.cloud
    const condition__render=`
     <div class="condition__infor-content">
                                            <div class="condition__name real-feel">
                                                <i class="fa-solid fa-temperature-half"></i>
                                                Real Feel
                                                <div class="condition-attribute condition__infor-temperate">${realFeel}C
                                                </div>
                                            </div>
                                            <div class="condition__name wind">
                                                <i class="fa-solid fa-wind"></i>
                                                Wind
                                                <div class="condition-attribute condition__infor-wind">${wind}/h</div>
                                            </div>
                                        </div>




                                        <div class="condition__infor-content">
                                            <div class="condition__name cloud">
                                                <i class="fa-duotone fa-clouds"></i>
                                                Cloud
                                                <div class="condition-attribute condition__infor-cloud">${cloud}</div>
                                            </div>
                                            <div class="condition__name UV">
                                                <i class="fa-solid fa-sun"></i>
                                                UV
                                                <div class="condition-attribute condition__infor-uv">${uv}</div>
                                            </div>
                                        </div>
    `
    condittion.innerHTML = condition__render;


// Mảng tên các ngày trong tuần
const daysOfWeek = ['Mon', 'Tus','Wed','Thu','Fri','Sat','Sun'];
    // forecast.forecastday[0].day.condition.icon
    // forecast.forecastday[1].day.condition.icon
    const day__infor = $('.dayInWeek');
    day__infor.innerHTML = '';
for (let i = 0; i < 7; i++){
    const day__infor__icon = data.forecast.forecastday[i].day.condition.icon;
    const iconDay__infor = `https:${day__infor__icon}`;
    const imgDay__infor = `<img src="${iconDay__infor}">`;
    const status = data.forecast.forecastday[i].day.condition.text
    const status__render = status;
    const day_infor__render=`
         <div class="day_infor">
         <div class="day">${daysOfWeek[i]}</div>
         <div class="weather">${imgDay__infor}</div>
          <div class="day__status style="font-size:10px">${status__render}</div>
          </div>
        `
        day__infor.innerHTML += day_infor__render;
        console.log(imgDay__infor)
    }
}


