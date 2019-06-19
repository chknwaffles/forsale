let contentContainer = document.getElementsByClassName('jumbotron')[0];
let navBar =document.getElementById('nav-bar');
let signInForm = document.getElementById('sign-in-form')
let newItemForm = document.getElementById('new-item-card')
const ITEMS_URL = 'http://localhost:3000/api/v1/items';
const USERS_URL = 'http://localhost:3000/api/v1/users';
const COMMENTS_URL = 'http://localhost:3000/api/v1/comments';
let ITEMS_ARRAY = [];
let current_user = new User({});

function init() {
    fetchItems();
    initEvents();
}

function fetchItems() {
    fetch(ITEMS_URL)
    .then(r => r.json())
    .then(items => {
    
        items.forEach(item => {
            let newItem = new Item(item);
            contentContainer.innerHTML += newItem.renderItem();
            ITEMS_ARRAY.push(newItem);
        })

    })
}

function initEvents() {
    //infinite scroll
    // contentContainer.addEventListener('scroll', e => {
    // });

    document.getElementsByClassName('form-control mr-sm-2')[0].addEventListener('input', e => {
        let allCards = document.getElementsByClassName('card mb-3');

        for(let card of allCards) {
            card.style.display = (card.getElementsByTagName('span')[0].innerText.includes(e.target.value)) ? '' : 'none';
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
        })
        .then(r => r.json())
        .then(user => {
            current_user = new User(user);
            //prepend the success alert to the top
            document.querySelector('body').prepend(current_user.toastMsg(`Welcome ${current_user.username}! You have successfully logged in.`))
            //unfortunately have to use jquery to close the login modal and show toast
            $('#sign-in').modal('hide');
            $('.toast').toast('show');
            //show add page and user show page to navbar
            current_user.loggedIn(navBar.getElementsByClassName('navbar-nav mr-auto')[0]);
        })
    })

    newItemForm.addEventListener('submit', e => { 
      e.preventDefault();

      let name = e.target[0].value
      let description = e.target[1].value
      let location = e.target[2].value
      let images = e.target[3].value
      let price = e.target[4].value
      let tag = e.target[5].value
      console.log(name, description, location, images, price)
      console.log(current_user.id)

      //add conditional for if any of those spots are blank
      
      fetch(ITEMS_URL, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name, description, location, images, price, user_id: current_user.id, tag})
      }).then(r => r.json())
      .then(item => {
            let newItem = new Item(item);
            contentContainer.innerHTML += newItem.renderItem();
            debugger
            ITEMS_ARRAY.push(newItem);
            $('#new-item').modal('toggle');
        })
    
    })

    contentContainer.addEventListener('click', e => {
        if (e.target.id === 'add-comment') {
            if (current_user.username !== '') {
                //logged in so let's show a form to add comment
                let addCommentForm = e.target.parentElement.previousElementSibling
                addCommentForm.style.display = "";
                //possibly change the button to submit comment
                e.target.innerText = 'Submit'
                setTimeout(() => {
                    e.target.id = 'submit-comment';
                }, 3000);
            } else {
                //alert to log in to add a comment
                document.querySelector('body').prepend(current_user.toastMsg('You need to login to comment!'))
                console.log('TOAST PLS')
                $('.toast').toast('show');
            }
        }

        if(e.target.id === 'submit-comment') {
            let comment = e.target.parentElement.previousElementSibling.firstElementChild[0].value;
            let item_id = e.target.offsetParent.parentElement.parentElement.id.split('-')[2];
            fetch(COMMENTS_URL, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ body: comment, item_id: item_id, user_id: current_user.id,  })
            })
            .then(r => r.json())
            .then(comment => {
                //render on dom and change submit button to add comment and get rid of textfield

                setTimeout(() => {
                    e.target.id = 'add-comment';
                }, 3000);
            })
            .catch(console.log(err))
        }
    })
}

function findItem(id) {
    return ITEMS_ARRAY.find(item => item.id === +id);
}

init();

