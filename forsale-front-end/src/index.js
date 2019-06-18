let contentContainer = document.getElementsByClassName('jumbotron')[0];
let navBar =document.getElementById('nav-bar');
const ITEMS_URL = 'http://localhost:3000/api/v1/items';
let ITEMS_ARRAY = [];

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

//infinite scroll
function initEvents() {
    contentContainer.addEventListener('scroll', e => {
    });

    document.getElementsByClassName('form-control mr-sm-2')[0].addEventListener('input', e => {
        console.log('wtf')
        debugger
        let allCards = document.querySelectorAll('card mb-3');

        debugger
    })
}

function findItem(id) {
    return ITEMS_ARRAY.find(item => item.id === +id);
}

init();

