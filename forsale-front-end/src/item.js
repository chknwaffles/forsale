class Item {
    constructor(name, description, location, images, user) {
        this.name = name;
        this.description = description
        this.location = location;
        this.images = images;
        this.user = user;
    }

    static renderItem(item) {
        return `
        <div class="modal">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">${item.name}</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <p>${item.description}</p>
                    <img src=${item.images[0]}>
                    <img src=${item.images[1]}
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