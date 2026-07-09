
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3OTY0ZmIzMDE4ZDc5ODZjMDZiODJkNWI4YjZkNDg2OSIsIm5iZiI6MTc4MzA3MDMzOC4yMjU5OTk4LCJzdWIiOiI2YTQ3N2U4MjA4ODk0N2EwNzY4YzFiNWIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.179RYgJUXChVkLSjWNtZnnV7dvdxsHrD8bXQN-UiEBo'
  }
  
};

  const imgPath =  `https://image.tmdb.org/t/p/w500`;

  const btn = document.querySelector('#clearBtn');


const tvShow = document.querySelector('#tvShow');

const movies = document.querySelector('#movie');


  const serchaIn = document.querySelector('#serchIn');


  //console.log('DOM jest');


  serchaIn.addEventListener('input', () => {
    const text = serchIn.value;
    sprawdzText(text);
    });

btn.addEventListener('click', () => {
        serchaIn.value = '';
        clearBtnDisapire(false,tvShow)
    });



 function sprawdzText(arg)
{
    if(arg == "")
    {
        discoverdShows(tvShow);
        discoverdMovies(movies);
        ////console.log('nie ma tesktu');
        clearBtnDisapire(false);
    }else{
        SerachTvShows(arg, tvShow);
        SerachMovies(arg, movies)
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

    if(params == "")urlObj.searchParams.append("Language", 'pl-PL');

    return urlObj.toString();
};

 const getRequest = async (url) => {
    const request = await fetch(url, options);
    const data = await request.json();

    const showList = data.results.map(show => {
        return {
        name: show.name || show.title || "nieznany tytuł",

        poster_path: show.poster_path
        }
    });

    return showList;
}

 function cardCreate(target, name, path)
{
  let cardHTML = '';
  ////console.log("w cardHTML");

      ////console.log("w if");
       cardHTML =
      `<div class="Card">
          <img src="${path}" alt="${name} Baner">
      </div>
    `
  
  target.insertAdjacentHTML('beforeend',cardHTML);
}

 function clearData(list, target)
{
    target.innerHTML = "";
    list.forEach(serial => {
        const name = serial.name || serial.title || "Nieznany tytuł";
        const path = imgPath + serial.poster_path;

        cardCreate(target, name,path);
    });
}

 const SerachTvShows = async (text,target) => 
{
    //pobranie text
    //pobranie odpowiedniego URL

    const url = await buildApiUrl('search/tv', {query: text});

    //zwrócone dane po zapytaniu 
    const showList = await getRequest(url);
    clearData(showList,target);

    //insertToCard();
}

 const discoverdShows = async(target) =>
{
    const url = await buildApiUrl('discover/tv');

    ////console.log(url);

    const showList = await getRequest(url);
    //console.log(showList);

    clearData(showList,target);
}
 function clearBtnDisapire(display, target)
{
    if(display == true)
    {
        btn.style.display = 'inline-block';
    }else 
    {
        btn.style.display = 'none';
        discoverdShows(target);
        discoverdMovies(movies)
    }
}




const discoverdMovies = async(target) =>
{
    const url = await buildApiUrl('discover/movie');

    ////console.log(url);

    const showList = await getRequest(url);
    //console.log(showList);

    clearData(showList,target);
}

const SerachMovies = async (text,target) => 
{
    //pobranie text
    //pobranie odpowiedniego URL

    const url = await buildApiUrl('search/movie', {query: text});

    //zwrócone dane po zapytaniu 
    const showList = await getRequest(url);
    clearData(showList,target);

    //insertToCard();
}


//console.log('reszta jest');


  discoverdShows(tvShow);
  discoverdMovies(movies);