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
            <div role="alert" aria-live="assertive" class="toast mx-auto show" data-autohide="true" data-delay='2000' data-animation='true'>
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
        navBar.insertBefore(addItem, signIn);
        addItem.style.display = '';
        signIn.style.display = 'none';
    }
}