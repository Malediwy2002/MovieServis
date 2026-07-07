//Pobranie wartości
//zbudowanie url
//zapytanie
//wsadzenie do cartyHTML
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3OTY0ZmIzMDE4ZDc5ODZjMDZiODJkNWI4YjZkNDg2OSIsIm5iZiI6MTc4MzA3MDMzOC4yMjU5OTk4LCJzdWIiOiI2YTQ3N2U4MjA4ODk0N2EwNzY4YzFiNWIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.179RYgJUXChVkLSjWNtZnnV7dvdxsHrD8bXQN-UiEBo'
  }
};
const imgPath =  `https://image.tmdb.org/t/p/w500`;

const serchaIn = document.querySelector('#serchIn');

const btn = document.querySelector('#clearBtn');

serchaIn.addEventListener('input', () => {
    const text = serchIn.value;
    sprawdzText(text);
})

btn.addEventListener('click', () => {
        serchaIn.value = '';
        clearBtnDisapire(false)
    });

function sprawdzText(arg)
{
    if(arg == "")
    {
        discoverdShows();
        console.log('nie ma tesktu');
        clearBtnDisapire(false);
    }else{
        SerachTvShows(arg);
        clearBtnDisapire(true);
    }
}

 const buildApiUrl = async (endpoint, params = {}) => {

    const baseUrl = "https://api.themoviedb.org/3/";

    const urlObj = new URL(endpoint, baseUrl);


    Object.keys(params).forEach(key => {
    if (params[key] !== undefined && params[key] !== null && params[key] !== "") {
        urlObj.searchParams.append(key, params[key]);
        }
    });

    if(params !== "")urlObj.searchParams.append("Language", 'pl-PL');

    return urlObj.toString();
};

const getRequest = async (url) => {
    const request = await fetch(url, options);
    const data = await request.json();

    const showList = data.results;

    showList.forEach( show => {
       const {name, overview, path} = show;
    });

    return showList;
}

function cardCreate(target, name, overview, path)
{
  let cardHTML = '';
  //console.log("w cardHTML");
    if(overview != "")
    {
      //console.log("w if");
       cardHTML =
      `<div class="Card">
        <div class="grid-item">
          <img src="${path}" alt="${name} Baner">
        </div>
        <div class="grid-item text">
          <p>Opis: ${overview}<p/>
          </div>
          <div><h3>${name}</h3></div>
      </div>
    `
  }else{
    //console.log("w else");
     cardHTML=
      `<div class="Card">
        <div class="grid-item">
          <img src="${path}" alt="${name} Baner">
        </div>
          <div><h3>${name}</h3></div>
      </div>
    `
  };
  target.insertAdjacentHTML('beforeend',cardHTML);
}

function clearData(list, target)
{
    target.innerHTML = "";
    list.forEach(serial => {
        const name = serial.name;
        const overview = serial.overview;
        const path = imgPath + serial.poster_path;

        cardCreate(target, name, overview, path);
    });
}

const SerachTvShows = async (text) => 
{
    //pobranie text
    //pobranie odpowiedniego URL

    const url = await buildApiUrl('search/tv', {query: text});

    //zwrócone dane po zapytaniu 
    const showList = await getRequest(url);
    const container = document.querySelector('#container');
    clearData(showList,container);

    //insertToCard();
}

const discoverdShows = async() =>
{
    const url = await buildApiUrl('discover/tv');

    //console.log(url);

    const showList = await getRequest(url);
    console.log(showList);

    const container = document.querySelector('#container');
    clearData(showList,container);
}
function clearBtnDisapire(display)
{
    if(display == true)
    {
        btn.style.display = 'inline-block';
    }else
    {
        btn.style.display = 'none';
    }
}



discoverdShows();