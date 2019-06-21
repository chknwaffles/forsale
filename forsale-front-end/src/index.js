let contentContainer = document.getElementsByClassName('jumbotron')[0];
let navBar =document.getElementById('nav-bar');
let signInForm = document.getElementById('sign-in-form')
let newItemForm = document.getElementById('new-item-form')
let userShowPage = document.getElementById('user-showpage')
const ITEMS_URL = 'http://localhost:3000/api/v1/items';
const USERS_URL = 'http://localhost:3000/api/v1/users';
const COMMENTS_URL = 'http://localhost:3000/api/v1/comments';
const channel = pusher.subscribe('comment-channel');
let ITEMS_ARRAY = [];
let ITEMS_LOADED = 0;
let SEARCH_FILTER = 'tag';
let current_user = new User({});
let today = new Date();

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
            if (ITEMS_LOADED < 8) {
                contentContainer.innerHTML += newItem.renderItem();
                ITEMS_LOADED++;
            }
            ITEMS_ARRAY.push(newItem);
        })
    })
}

function initEvents() {
    //listen for search tag filter
    document.getElementsByClassName('form-control mr-sm-2')[0].addEventListener('input', e => {
        let allCards = document.getElementsByClassName('card mb-3');
        
        for(let card of allCards) {
            if (SEARCH_FILTER === 'tag') {
                card.style.display = (card.getElementsByTagName('span')[0].innerText.includes(e.target.value)) ? '' : 'none';
            } else if (SEARCH_FILTER === 'name') {
                card.style.display = (card.getElementsByTagName('h3')[0].innerHTML.split('<br>')[0].toLowerCase().includes(e.target.value)) ? '' : 'none';
            }          
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
            toastr.options.toastClass = 'toastr';
            toastr.success('You have successfully logged in.', `Welcome ${current_user.username}!`)
            //prepend the success alert to the top
            // document.body.prepend(current_user.toastMsg(`Welcome ${current_user.username}! You have successfully logged in.`))
            //unfortunately have to use jquery to close the login modal and show toast
            $('#sign-in').modal('hide');
            // $('.toast').toast('show');
            //show add page and user show page to navbar
            current_user.loggedIn(navBar.getElementsByClassName('navbar-nav mr-auto')[0]);
            contentContainer.innerHTML = ""
            ITEMS_ARRAY.forEach(item => {
              contentContainer.innerHTML += item.renderItem();
          })
            userShowPage.innerHTML = current_user.renderShowPage();
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
            
            ITEMS_ARRAY.push(newItem);
            $('#new-item').modal('toggle');
            userShowPage.innerHTML = current_user.renderShowPage();
        })
        newItemForm.reset();
    })

    document.body.addEventListener('click', e => {
        switch(e.target.id) {
            case 'load-more': loadMoreItems(e); break;
            case 'add-comment': addComment(e); break;
            case 'submit-comment': submitComment(e); break;
            case 'delete-comment': deleteComment(e); break;
            case 'back-to-top': scrollToTop(); break;
            case 'delete-item': deleteItem(e); break;
            case 'filter-search': changeSearchFilter(e); break;
        }
    })
}

function loadMoreItems(e) {
    //only load 4 more items at a time
    let count = 7;
    ITEMS_ARRAY.forEach(item => {
        if (item.id > ITEMS_LOADED && count >= 0) {
            let newItem = new Item(item);
            contentContainer.innerHTML += newItem.renderItem();
    
            ITEMS_LOADED++;
            count--;
        }
    })

    if (ITEMS_LOADED === ITEMS_ARRAY.length) {
        e.target.innerText = 'End of List';
        e.target.disabled = true;
    } 
}

function addComment(e) {
    if (current_user.username !== '') {
        //logged in so let's show a form to add comment
        let addCommentForm = e.target.parentElement.previousElementSibling
        addCommentForm.style.display = "";
        //possibly change the button to submit comment
        e.target.innerText = 'Submit'
        setTimeout(() => {
            e.target.id = 'submit-comment';
        }, 500);
    } else {
        //alert to log in to add a comment
        alert('You must be logged in to comment.')
    }
}

function submitComment(e) {
    let comment = e.target.parentElement.previousElementSibling.firstElementChild[0].value;
    let item_id = e.target.offsetParent.parentElement.parentElement.id.split('-')[2];

    fetch(COMMENTS_URL, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ body: comment, item_id: item_id, user_id: current_user.id })
    })
    .then(r => r.json())
    .then(comment => {
        //render on dom and change submit button to add comment and get rid of textfield
        let newComment = new Comment(comment);
        e.target.offsetParent.getElementsByClassName('list-group')[0].innerHTML += newComment.renderComment();

        //set button to add comment and hide text field
        let commentForm = e.target.parentElement.previousElementSibling
        commentForm.style.display = 'none';
        commentForm.firstElementChild.reset();
        e.target.innerText = 'Add Comment'
        setTimeout(() => {
            e.target.id = 'add-comment';
        }, 500);

        // realtime notification
        channel.bind('notify', notification => {
            toastr.info(notification.message);
            toastr.clear();
            //need to rerender DOM again for all users that receive this message?
        })
        
    })
    .catch(console.log())
}

function deleteComment(e) {
    let comment = e.target.parentElement

    if (+comment.dataset.userId === current_user.id) {
        let confirmDel = confirm('Are you sure you want to delete this comment?');
        if (confirmDel) {
            fetch(`${COMMENTS_URL}/${comment.id}`, {
                method: 'DELETE',
            })
            comment.remove();

            //delete in item
            let item = Item.findItem(comment.id);
            item.comments.splice(item.comments.indexOf(comment), 1);
        }
    } else {
        alert('You cannot delete this comment!');
    }
}

function scrollToTop() {
    if (document.body.scrollTop != 0 || document.documentElement.scrollTop != 0) {
		window.scrollBy(0,-50);
		requestAnimationFrame(scrollToTop);
	}
}

function deleteItem(e){
    let confirmDel = confirm('Are you sure you want to delete this posting?');

    if (confirmDel) {
        fetch(`${ITEMS_URL}/${e.target.dataset.id}`, {
            method: 'DELETE'
        })

        let item = Item.findItem(e.target.dataset.id);
        
        ITEMS_ARRAY.splice(ITEMS_ARRAY.findIndex(item => item.id === +e.target.dataset.id), 1)
        $(`#modal-item-${e.target.dataset.id}`).modal('hide');
        contentContainer.innerHTML = Item.renderAllItems();
        e.target.parentElement.remove()
    }   
}

function changeSearchFilter(e) {
    if (SEARCH_FILTER === 'tag') {
        SEARCH_FILTER = 'name';
        e.target.previousElementSibling.placeholder = 'Search by Item Name';
    } else {
        SEARCH_FILTER = 'tag';
        e.target.previousElementSibling.placeholder = 'Search by Tag';
    }
}

init();