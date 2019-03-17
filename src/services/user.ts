// Copyright (c) 2019 Dwayne Charrington <dwaynecharrington@gmail.com>
// This code is licensed under MIT license (see LICENSE for details)

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
