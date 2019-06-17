let contentContainer = document.getElementById('content');
let navBar =document.getElementById('nav-bar');



let routes = {
    '/': homepage,
    '/index.html': homepage,
  };



 
  
  navBar.addEventListener('click', (e) => {
      console.log(e.target.innerText)
      if(e.target.dataset.id === "home"){
       
          navItemClick('/')
      }
  }
  )

  function navItemClick(path){
    // window.history.pushState({}, '', window.location.origin + path);
    contentDiv.innerHTML = routes[path];
  }