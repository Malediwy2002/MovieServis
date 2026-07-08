
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3OTY0ZmIzMDE4ZDc5ODZjMDZiODJkNWI4YjZkNDg2OSIsIm5iZiI6MTc4MzA3MDMzOC4yMjU5OTk4LCJzdWIiOiI2YTQ3N2U4MjA4ODk0N2EwNzY4YzFiNWIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.179RYgJUXChVkLSjWNtZnnV7dvdxsHrD8bXQN-UiEBo'
  }
};

const serchIn = document.querySelector('#serchIn');

function discoverTvShows()
{
  fetch('https://api.themoviedb.org/3/discover/tv', options)
  .then(res => res.json())
  .then(res => {
    console.log(res);
        const container = document.querySelector('#container');
  container.innerHTML = "";

  const listaFilmow = res.results;

  listaFilmow.forEach(serial => {
      const{name} = serial;
      const{overview} = serial;
      const{backdrop_path} = serial;
      const fullPath = `https://image.tmdb.org/t/p/w500${backdrop_path}`;
     /* const cardHTML = 
`
  <div class="Card">
    <div class="grid-item foto" style="background-image:url('${fullPath}');"></div>
    <div class="grid-item text">
      <h3>${name}</h3>
      <p>Opis: ${overview}<p/>
      </div>
  </div>
`;*/
    
      cardCreate(name, overview, fullPath );
    });
  
  })
  .catch(err => {
    console.error(err);
    const container = document.querySelector('#container');
    container.innerHTML = "Błąd";
  });
}

function serchTvShows()
{
  let pos = serchIn.value;
  fetch('https://api.themoviedb.org/3/search/tv?query='+pos+'&language=pl-PL', options)
  .then(res => res.json())
  .then(res => {
    console.log(res);
        const container = document.querySelector('#container');
  container.innerHTML = "";

  const listaFilmow = res.results;

  listaFilmow.forEach(serial => {
      const{name} = serial;
      const{overview} = serial;
      const{backdrop_path} = serial;
      const fullPath = `https://image.tmdb.org/t/p/w500${backdrop_path}`;
     /* const cardHTML = 
`
  <div class="Card">
    <div class="grid-item foto" style="background-image:url('${fullPath}');"></div>
    <div class="grid-item text">
      <h3>${name}</h3>
      <p>Opis: ${overview}<p/>
      </div>
  </div>
`;*/
    
      cardCreate(name, overview, fullPath );
    });
  
  })
  .catch(err => {
    console.error(err);
    const container = document.querySelector('#container');
    container.innerHTML = "Błąd";
  });
}

function cardCreate(name, overview, path)
{
  const container = document.querySelector('#container');
  let cardHTML = '';
  console.log("w cardHTML");
    if(overview != "")
    {
      //console.log("w if");
       cardHTML =
      `<div class="Card">
          <img src="${path}" alt="${name} Baner">
      </div>
    `}
  container.insertAdjacentHTML('beforeend',cardHTML);
}


serchIn.addEventListener('input', () => {
  //console.log("Jest!");
  const wpisanyTekst = serchIn.value;
  const clear = document.querySelector('#clearBtn');
  if(wpisanyTekst == "")
  {
    discoverTvShows();
    clear.style.display = "none";
  }else
  {
    serchTvShows();
    clear.style.display = "inline-block";
    console.log(buildApiUrl('search.tv', {query: wpisanyTekst}));
  }

  clear.addEventListener('click', () => {
    serchIn.value = "";
    clear.style.display = "none";
    discoverTvShows();
  });
});


discoverTvShows();

