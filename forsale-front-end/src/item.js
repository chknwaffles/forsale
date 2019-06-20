class Item {
    constructor({id, name, description, location, images, user, comments, tags, created_at, price}) {
        this.id = id;
        this.name = name;
        this.description = description
        this.location = location;
        this.images = images;
        this.user = user;
        this.comments = comments;
        this.tags = tags;
        this.created_at = created_at;
        this.price = price;
    }

    renderItem() {
        return `
        <div class="card mb-3" data-target='#modal-item-${this.id}' data-toggle='modal'>
            <h3 class="card-header"> ${this.name} <br> $${this.price} </h3>
           
            <div class="card-body">
                <h5 class="card-title">From ${this.user.username}</h5>
                <h6 class="card-subtitle text-muted">${this.location}</h6>
                <span class="badge badge-pill badge-dark">${this.addTags()}</span>
            </div>
            <img class='item-image' src="${this.images}" alt="Card image">
            <div class="card-footer text-muted">
                ${this.renderTimeStamp()}
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
                                <div class="col-md-9">
                                    <span class="badge badge-dark">${this.addTags()}</span>
                                    <div class="row">
                                        <div class="col-8 col-md-6">
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

    addTags() {
        let allTags = '';
        this.tags.forEach(tag => allTags += `${tag.name}`);
        return allTags;
    }

    addComments() {
        let allComments = '';
        this.comments.forEach(comment => {
            let newComment = new Comment(comment);
            allComments += newComment.renderComment();
        })
        return allComments;
    }
    renderTimeStamp(){
       

        let createdDateArr = this.created_at.slice(0, 10).split("-").map(num => parseInt(num))
        let createdDate = new Date(createdDateArr[0], createdDateArr[1]-1, createdDateArr[2])
        let days = Math.round((today-createdDate)/(1000*60*60*24))
        if (days === 0){
            return `Posted today`
        }
        else {
            return `Posted ${days} ${(days===1 ? `day ago` : "days ago")}`;
        }
    }
       
    
    deleteButton(){
       

        if(current_user.id === this.user.id){
            console.log("match")
            return `<button type="button" class="btn btn-primary btn-sm" data-id="${this.id}"  id='delete-item'>Delete Item</button>`
        }
        return ``
    }
}