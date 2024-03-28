const conteudoGeral = document.getElementById('containerConteudo');
const form = document.getElementById('containerBusca');
const elementosErro = [...document.getElementsByClassName('erro')]


form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const cityName = document.getElementById('buscaLocal').value;
    const apiKey = '130b6f0dd0d7a89288c36894735b6209'
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(cityName)}&appid=${apiKey}&units=metric&lang=pt_br`;
    const results = await fetch(apiUrl);
    const json = await results.json();
    console.log(json);
    if (json.cod === 200) {
        elementosErro.map((el,i)=>{
            el.classList.add('none')
        })
        conteudoGeral.classList.remove('none')
        showInfos({
            city: json.name,
            country: json.sys.country,
            temp: json.main.temp,
            tempMax: json.main.temp_max,
            tempMin: json.main.temp_min,
            description: json.weather[0].description,
            tempIcon: json.weather[0].icon,
            velVento: json.wind.speed,
            umidade: json.main.humidity
        })
    } else {
        console.log("erro detectado")
        elementosErro.map((el,i)=>{
            el.classList.remove('none')
        })
    
    }
})
function showInfos(json) {
    document.getElementById('titulo').innerHTML = `${json.city}, ${json.country}`
    document.getElementById('iconMain').setAttribute('src', `https://openweathermap.org/img/wn/${json.tempIcon}@2x.png`)
    document.getElementById('valorTempAtual').innerHTML = `${json.temp} <sup>°C</sup>`
    document.getElementById('descricaoTempAtual').innerHTML = `${json.description}`
    document.getElementById('valorUmidade').innerHTML = `${json.umidade} % `
    document.getElementById('valorTempMax').innerHTML = `${json.tempMax} <sup>°C</sup>`
    document.getElementById('valorTempMin').innerHTML = `${json.tempMin} <sup>°C</sup>`
    document.getElementById('valorVento').innerHTML = `${json.velVento} km/h`

}





