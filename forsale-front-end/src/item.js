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
                <h5 class="card-title">${this.location}</h5>
                <span class="badge badge-pill badge-dark">${this.addTags()}</span>
            </div>
            <img class='item-image' style="height: 200px; width: 200px;" src="${this.images[0]}" alt="Card image">
            <div class="card-footer text-muted">
                2 days ago
            </div>
        </div>
        ${this.renderItemOnClick()}
        `
    }

    renderItemOnClick() {
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
                                            ${this.addImages()}
                                            <div class="card-body">
                                                <p class="card-text">${this.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class='row'>
                                <div class="col-md-4 ml-auto">
                                    <div class="card-body">
                                        <p> ${this.comments} </p>
                                    </div>
                                </div>    
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary btn-sm">Add comment</button>
                        <button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
        `
    }

    addImages() {
        let allImages = '';
        this.images.forEach(image => allImages += `<img class='img-item' src='${image}'> `)
        return allImages;
    }

    addTags() {
        let allTags = '';
        this.tags.forEach(tag => allTags += `${tag.name}`);
        return allTags;
    }
}