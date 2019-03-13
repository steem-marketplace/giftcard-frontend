export class User {
    canActivate({ username }) {
        console.log(username);
    }
}
