// fetch("https://pokeapi.co/api/v2/pokemon/1")
//   .then((result) => result.json())
//   .then((res) => console.log("result", res));

// const loadData = async () => {
//     try {
//         const result = await fetch("https://pokeapi.co/api/v2/pokemon/1");
//         const proccesedData = await result.json();
//         console.log("result", proccesedData);
//     } catch (error) {
//         console.log("error:", error);
//     } finally {
//         console.log('forever');
//     }
// }

// loadData();

//--------------------------------------------------------------

// const searchBtn = document.querySelector(".btn");

// const fetchData = async (id) => {
//   return fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
//     .then((result) => result.json())
//     .then((res) => res);
// };

// // fetchData().then(res => console.log('result', res));

// const loadPokemon = async (pokemonId) => {
//     const container = document.querySelector(".pokemon-container");
//     container.innerHTML = '<p>Loading...</>'
//     try {
//         const pokemon = await fetchData(pokemonId);

//         const htmlStr = `<div class="card" style="width: 18rem;">
//         <img src="${pokemon.sprites.back_default}" class="card-img-top" alt="...">
//         <div class="card-body">
//           <h5 class="card-title">${pokemon.name}</h5>
//           ${
//             pokemon.abilities.map((item) => (
//                 `<p>${item.ability.name}</p>`
//             )).join('')
//           }
//           <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
//         </div>
//           </div> `;
//           container.innerHTML = htmlStr;
//     } catch (error) {
//         container.innerHTML = '<p>ERROR</p>'
//     }
// };

// const searchPokemon = (e) => {
//   e.preventDefault();
//   const inputField = document.querySelector("#exampleInputEmail1");
//   loadPokemon(inputField.value);
//   inputField.value = "";
// };

// searchBtn.addEventListener("click", searchPokemon);

//--------------------------------------------------------------------------------------

// const searchBtn = document.querySelector(".btn-search");
// const loadNewsBtn = document.querySelector(".btn-load");
// const container = document.querySelector(".news-container");

// const fetchManager = (path) => {
//   const options = {
//     headers: {
//       Authorization: "2c9afa106d274e3b84e0e314f4590b89",
//     },
//   };
//   return fetch(`https://newsapi.org/v2/${path}`, options).then((res) =>
//     res.json()
//   );
// };

// const fetchEverythink = (page = 1, quit) => {
//   return fetchManager(`everything?page=${page}&pageSize=5&q=${quit}`);
// };

// let page = 1;
// let news = [];
// let quit = "";

// const loadNews = async () => {
//   const loadedNews = await fetchEverythink(page, quit);
//   news = [...news, ...loadedNews.articles];
//   displayData();
//   page++;
// };

// const displayData = () => {
//   console.log("news", news);
//   container.innerHTML = `
//         ${news
//           .map(
//             (element) =>
//               `
//             <div class="card">
//               <div class="card-body">${element.title}</div>
//             </div>
//             `
//           )
//           .join("")}
//     `;
// };

// const searchNews = (e) => {
//   e.preventDefault();
//   container.innerHTML = "";
//   page = 1;
//   news = [];
//   const inputField = document.querySelector("#exampleInputEmail1");
//   quit = inputField.value;
//   loadNews();
//   inputField.value = "";
// };

// loadNewsBtn.addEventListener("click", loadNews);
// searchBtn.addEventListener("click", searchNews);

//--------------------------------------------------------------------------------------

//test

//task 2
//tochno zakinchiv

//konflict from task-2

const searchInput = document.querySelector(".search-input");
const container = document.querySelector(".container");

let countries = [];
let search = "";

function debounce(func, timeout = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}

const fetchManager = (path) => {
  return fetch(`https://restcountries.com/v3.1/${path}`)
    .then((response) => response.json())
    .then(res => res)
    .catch(error => console.log(error));
};

const fetchFields = (name) => {
  return fetchManager(`name/${name}`);
};

const loadCountries = async () => {
  const loadedCountries = await fetchFields(search);
  countries = loadedCountries.map((country) => country);
  displayData();
};

const searchCountry = (e) => {
  e.preventDefault();
  const output = document.querySelector(".output");

  container.innerHTML = "";
  search = searchInput.value;
  output.textContent = search;
  loadCountries();
  searchInput.value = "";
};

const displayData = () => {
  if (countries.length > 9) {
    errorToast();
  } else if (countries.length >= 2 && countries.length < 9) {
    cardUpdate();
  } else {
    fullCardUpdate();
  }
};

const errorToast = () =>
  toastr.error("Too many matches found. Please enter a more specific query!");

const cardUpdate = () => {
  container.innerHTML = `
        ${countries
          .map(
            (country) =>
              `
            <div class="card">
              <div class="card-body">${country.name.common}</div>
            </div>
            `
          )
          .join("")}
    `;
};

const fullCardUpdate = () => {
  container.innerHTML = `${countries
    .map(
      (country) => `<div class="card" style="width: 18rem;">
  <img src="${Object.values(country.flags.png).join(
    ""
  )}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${country.name.common}</h5>
    <p class="card-text">${country.capital}</p>
  </div>
  <ul class="list-group list-group-flush list-languages"> 
  <span class="text-languages">Languages</span>
    <li class="list-group-item item-language">${Object.values(
      country.languages
    )}</li>
  </ul>
</div>`
    )
    .join("")}`;
};

searchInput.addEventListener("input", debounce(searchCountry, 1000));
