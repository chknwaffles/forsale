let contentContainer = document.getElementsByClassName('content-container')[0];
let navBar =document.getElementById('nav-bar');
const ITEMS_URL = 'http://localhost:3000/api/v1/items';
let ITEMS_ARRAY = [];

// let routes = {
//     '/': homepage,
//     '/index.html': homepage,
//   };



 
  
// navBar.addEventListener('click', (e) => {
//     console.log(e.target.innerText)
//     if(e.target.dataset.id === "home"){
    
//         navItemClick('/')
//     }
// })

//   function navItemClick(path){
//     // window.history.pushState({}, '', window.location.origin + path);
//     contentDiv.innerHTML = routes[path];
//   }

function init() {
    fetchItems();
}

function fetchItems() {
    fetch(ITEMS_URL)
    .then(resp => resp.json())
    .then(items => {
        items.forEach(item => {
            let newItem = new Item(item);
            contentContainer.innerHTML += newItem.renderItem();
            ITEMS_ARRAY.push(newItem);
        })
    })
}

function initEvents() {
    contentContainer.addEventListener('click', e => {
    });

}

function findItem(id) {
    return ITEMS_ARRAY.find(item => item.id === +id);
}

init();

