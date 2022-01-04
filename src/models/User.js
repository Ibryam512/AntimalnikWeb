export class User {
    userName;
    firstName;
    lastName;
    email;
	password;

    constructor(userName, firstName, lastName, email, password) {
        this.userName = userName;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
    }
}