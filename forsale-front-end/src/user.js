class User {
    constructor({id, username, email}) {
        this.id = id || '';
        this.username = username || '';
        this.email = email || '';
    }
    
    toastMsg(message) {
        let toast = document.createElement('div');
        toast.innerHTML = `
        <div class='position-absolute d-flex flex-lg-column pt-5 mt-5'>
            <div role="alert" aria-live="assertive" class="toast mx-auto show" data-autohide="true" data-delay='1000' data-animation='true'>
                <div class="toast-header">
                    <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="toast-body">
                    ${message}
                </div>
            </div>
        </div>
        `
        return toast.firstElementChild;
    }

    loggedIn(navBar) {
        //switch the signin and add item buttons
        let signIn = navBar.children[0];
        let addItem = navBar.children[1];
        let userShow = navBar.children[2]
        navBar.insertBefore(addItem, signIn, userShow);
        addItem.style.display = '';
        signIn.style.display = 'none';
        userShow.style.display = '';
    }
    renderShowPage(){
        return `
        <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
        <div  class="modal-content" id="user-showpage-card">
                <div class="modal-header">
                        <h5 class="modal-title">${this.username}'s Page</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div >
                    <div  class="modal-body">
                        <div class='container-fluid'>
                                <div class='row'>
                                    <div class="col-md-9">
                                    <ul class="list-group">
                                    
                                
                                    ${this.renderUserItems()}
                                    </ul>
                                    </div>
                                </div>
                                <div class='row'>
                                    <div class="col-md-4 ml-auto">
                                        
                                    </div>    
                                </div>
                            </div>
                        </div>
            
            <div class="modal-footer">
                 <button type="submit" class="btn btn-primary"  id="new-item-submit">Add Item</button>
                 <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
            
        </div>
    </div>
           `     
    }
    renderUserItems(){
        console.log("current user id", current_user.id)
       return ITEMS_ARRAY.map(item =>{
          
        if(item.user.id === current_user.id){

            return `
            <li id="showpage-${item.id}"class="list-group-item d-flex justify-content-between align-items-center">
                         ${item.name}
                         ${item.deleteButton()}
            </li>
         
            `
        } else {return ""}
            
        }).join("")
       
    }
}