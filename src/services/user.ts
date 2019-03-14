export class UserService {

    private storageKeyUser = '__marketplace_user';

    getUser() {
        const localUser = sessionStorage.getItem(this.storageKeyUser);

        if (!localUser) {
            return null;
        }

        return JSON.parse(localUser);
    }
}
