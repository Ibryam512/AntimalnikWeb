export class User {
    userName;
    firstName;
    lastName;
    email;
    role;
    posts;

    constructor(userName, firstName, lastName, email) {
        this.userName = userName;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.role = 1;
        this.posts = [];
    }
}