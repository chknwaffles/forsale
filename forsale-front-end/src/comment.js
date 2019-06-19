class Comment {
    constructor({id, body, user, item}) {
        this.id = id;
        this.body = body;
        this.user = user;
        this.item = item;
    }

    renderComment() {
        return `
            <li id='${this.id}'> ${this.body} - ${this.user.username} <button type='button' id='delete-comment'>x</button></li>
        `
    }
}