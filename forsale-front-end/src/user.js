class User {
    constructor({id, username, email}) {
        this.id = id;
        this.username = username;
        this.email = email;
    }
   
    success() {
        let toast = document.createElement('div');
        toast.innerHTML = `
        <div class='position-relative d-flex align-content-center'>
            <div role="status" aria-live="polite" class="toast" data-autohide="false">
                <div class="toast-header">
                    <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="toast-body">
                    Welcome ${this.username}! You have successfully logged in.
                </div>
            </div>
        </div>
        `
        return toast.firstElementChild;
        // let alert = document.createElement('div');
        // alert.className = 'alert alert-dismissible alert-success'
        // alert.innerHTML = `
        // <button type="button" class="close" data-dismiss="alert">&times;</button>
        // <strong>You've logged in successfully!</strong>
        // `
        //return alert;
    }

    failed() {
        let alert = document.createElement('div')
    }
}