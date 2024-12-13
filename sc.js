const ap ={
    saitama: "https://www.jma.go.jp/bosai/forecast/data/forecast/110000.json",
    tokyo: "https://www.jma.go.jp/bosai/forecast/data/forecast/130000.json",
    tiba: "https://www.jma.go.jp/bosai/forecast/data/forecast/120000.json",
    kanagawa: "https://www.jma.go.jp/bosai/forecast/data/forecast/140000.json",
    nagano: "https://www.jma.go.jp/bosai/forecast/data/forecast/200000.json",
    yamanasi: "https://www.jma.go.jp/bosai/forecast/data/forecast/190000.json"
};
   
async function displayWeather(){
    const city=document.getElementById('city').value;
    const url = ap[city];
   
   
    try{
        const response = await fetch(url);
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        console.error('Error fetching weather data',error);
    }
}
   
function displayWeather(data){
    const container = document.getElementById('wether-container');
       /*container.innerHTML = '';*/
   
    const area = data[0].timeSeries[0].areas[0];
    const weatherCodes = area.weatherCodes;
    const timed = data[0].timeSeries[0].timeDefines;
           
    const tempsMin = data[1].timeSeries[1].areas[0].tempsMin;
    const tempsMax = data[1].timeSeries[1].areas[0].tempsMax;
   
    let table = `
       <table>
           <thead>
            <tr>
                <th>日付</th>
                <th>天気</th>
                <th>最高気温</th>
                <th>最低気温</th>
            </tr>
            </thead>
            </table>
        `;
   
    for(let i=0;i<6;i++){
        const data = new Date(timed[i]);
        const weatherCodes = weatherCodes[i];
        const tempsMin = tempsMin[i] !==undefined ? tempsMin[i]:'-';
        const tempsMax = tempsMax[i] !==undefined ? tempsMin[i]:'-';
   
        table += `
                <tr>
                    <td>${data.toLcaleDateString('ja-jp')}</td>
                    <td>${tempsMax}</td>
                    <td>${tempsMin}</td>
                </tr>
                `;
    }

    table +=`
        </tbody>
        </table>`;

    container.innerHTML = table;
}
   