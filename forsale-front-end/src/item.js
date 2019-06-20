class Item {
    constructor({id, name, description, location, images, user, comments, tags}) {
        this.id = id;
        this.name = name;
        this.description = description
        this.location = location;
        this.images = images;
        this.user = user;
        this.comments = comments;
        this.tags = tags;
    }

    renderItem() {
        return `
        <div class="card mb-3" data-target='#modal-item-${this.id}' data-toggle='modal'>
            <h3 class="card-header"> ${this.name} </h3>
            <div class="card-body">
                <h5 class="card-title">From ${this.user.username}</h5>
                <h6 class="card-subtitle text-muted">${this.location}</h6>
                <span class="badge badge-pill badge-dark">${this.addTags()}</span>
            </div>
            <img class='item-image' src="${this.images}" alt="Card image">
            <div class="card-footer text-muted">
                Add timestamp
            </div>
        </div>
        ${this.renderModalItem()}
        `
    }

    renderModalItem() {
        return `
        <div class="modal fade" id='modal-item-${this.id}' tabindex='-1' role='dialog'>
            <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">${this.name}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class='container-fluid'>
                            <div class='row'>
                                <div class="col-lg-9">
                                    <span class="badge badge-dark">${this.addTags()}</span>
                                    <div class="row">
                                        <div class="col-8 col-sm-6">
                                         <img class='img-item' src=${this.images}>
                                            <div class="card-body">
                                                <p class="card-text">${this.description}</p>
                                            </div>
                                            <div class="card-body" id='comment-container'>
                                                <ul class="list-group"> ${this.addComments()} </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class='row'>
                                <div class="col-md-4 ml-auto">
                                    
                                </div>    
                            </div>
                        </div>
                    </div>
                    <div class='add-comment-form' style='display:none' placeholder='Comment here'>
                    <form>
                        <textarea class="form-control" id="exampleTextarea" rows="3" placeholder='Add comment here'></textarea>
                    </form>
                    </div>
                    <div class="modal-footer">
                        ${this.deleteButton()}
                        <button type="button" class="btn btn-primary btn-sm" id='add-comment'>Add comment</button>
                        <button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
        `
    }

    // addImages() {
    //     let allImages = '';
    //     this.images.forEach(image => allImages += `<img class='img-item' src='${image}'> `)
    //         return allImages;
    // }

    addTags() {
        let allTags = '';
        this.tags.forEach(tag => allTags += `${tag.name}`);
        return allTags;
    }

    addComments() {
        let allComments = '';
        this.comments.forEach(comment => allComments += `<li> ${comment.body} - ${comment.user.username} </li>`);
        return allComments;
    }
    
    deleteButton(){
        console.log("this", this)
        console.log("current_user", current_user.id)
        console.log("this.user.id", this.user.id)

        if(current_user.id === this.user.id){
            console.log("match")
            return `<button type="button" class="btn btn-primary btn-sm" data-id="${this.id}"  id='delete-item'>Delete Item</button>`
        }
        return ``
    }
}