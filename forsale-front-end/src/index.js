let contentContainer = document.getElementsByClassName('jumbotron')[0];
let navBar =document.getElementById('nav-bar');
let signInForm = document.getElementById('sign-in-form')
const ITEMS_URL = 'http://localhost:3000/api/v1/items';
const USERS_URL = 'http://localhost:3000/api/v1/users';
let ITEMS_ARRAY = [];
var current_user

function init() {
    fetchItems();
    initEvents();
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
        let allCards = document.getElementsByClassName('card mb-3');

        for(let card of allCards) {
            if (card.getElementsByTagName('span')[0].innerText.includes(e.target.value))
                card.style.display = '';
            else
                card.style.display = 'none';
        }
    })

    navBar.addEventListener('click', e => {
        if(e.target.innerText === "SIGN IN"){
          $('#sign-in').modal('show');
        }
    })
  
    signInForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let username = e.target[0].value
        let email =  e.target[1].value
  
        fetch(USERS_URL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username, email})
        }).then(r => r.json())
        .then(user => {
            current_user = user.username
        })
    })
}

function findItem(id) {
    return ITEMS_ARRAY.find(item => item.id === +id);
}

init();

