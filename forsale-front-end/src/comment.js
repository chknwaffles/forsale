class Comment {
    constructor({id, body, user, item}) {
        this.id = id;
        this.body = body;
        this.user = user;
        this.item = item;
    }

    renderComment() {
        return `
            <li> ${this.body} - ${this.user.username} </li>
        `
    }
}