// Copyright (c) 2019 Dwayne Charrington <dwaynecharrington@gmail.com>
// This code is licensed under MIT license (see LICENSE for details)

import { UserService } from './user';
import { SteemService } from './steem';
import { autoinject } from 'aurelia-framework';

@autoinject()
export class KeychainService {
    constructor(private steem: SteemService, private user: UserService) {

    }

    promptUserLogin(username: string): Promise<[UserInterface, any]> {
        return new Promise((resolve, reject) => {
            const loginChallenge = `marketplace_login-${Math.floor(100000000 + Math.random() * 900000000)}`;

            steem_keychain.requestSignBuffer(username, loginChallenge, 'Posting', async (response) => {
                if (response.success === true) {
                    const returnedUser = response.data.username;
                    const localUser: any = this.user.getUser();
    
                    if (localUser && localUser.username === returnedUser) {
                      return;
                    }
    
                    try {
                        const getUser: any = await this.steem.api.getAccountsAsync([returnedUser]);
                        const userObject: any = getUser[0];
                        const userMeta = JSON.parse(userObject.json_metadata);
    
                        const user = {
                            username: response.data.username,
                            userMeta,
                            balance: userObject.balance,
                            type: 'keychain'
                        };
    
                        return resolve([user, userObject]);
                    } catch (e) {
                        reject(new Error('Could not load account from Steem blockchain'));
                    }
                } else {
                    reject(new Error('User did not successfully authenticate'));
                }
            });
        });
    }
}
