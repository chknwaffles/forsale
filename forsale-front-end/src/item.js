class Item {
    constructor({id, name, description, location, images, user, comments}) {
        this.id = id;
        this.name = name;
        this.description = description
        this.location = location;
        this.images = images;
        this.user = user;
        this.comments = comments;
    }

    renderItem() {
        return `
        <div class="card mb-3">
            <h3 class="card-header" data-target='#${this.name.replace(/\s/g, '')}' data-toggle='modal'>${this.name}</h3>
            <div class="card-body">
                <h5 class="card-title">${this.location}</h5>
                <h6 class="card-subtitle text-muted">${this.tags}</h6>
            </div>
            <img style="height: 200px; width: 200px;" src="${this.images[0]}" alt="Card image">
            <div class="card-body">
                <p class="card-text">${this.description}</p>
            </div>
            <div class="card-body">
                <p> ${this.comments} </p>
            </div>
            <div class="card-footer text-muted">
                2 days ago
            </div>
        </div>
        ${this.renderItemOnClick()}
        `
    }

    renderItemOnClick() {
        return `
        <div class="modal" id='${this.name.replace(/\s/g, '')}' tabindex='-1' role='dialog'>
            <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">${this.name}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <p>${this.description}</p>
                        <img src=${this.images[0]}>
                        <img src=${this.images[1]}>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary">Save changes</button>
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
        `
    }
}