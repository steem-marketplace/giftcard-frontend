import { I18N } from 'aurelia-i18n';
import { autoinject, newInstance } from 'aurelia-framework';
import { HttpClient, json } from 'aurelia-fetch-client';
import { ToastService, ToastMessage } from './toast';

import steem from 'steem';

import environment from 'environment';

@autoinject()
export class AuthService {
    constructor(@newInstance() private http: HttpClient, private i18n: I18N, private toast: ToastService) {
        this.http.configure(config => {
            config
                .useStandardConfiguration()
                .withBaseUrl(environment.API_URL)
                .withInterceptor({
                    request(message) {
                        let token = localStorage.getItem('access_token') || null;

                        message.headers.set('Authorization', `Bearer ${token}`);
                        
                        return message;
                    }
                })
        });
    }

    async login(username: string, key?: string) {
        return new Promise(async (resolve, reject) => {
            if (window.steem_keychain && !key) {
                // Get an encrypted memo only the user can decrypt with their private key
                const encryptedMemo = await this.getUserAuthMemo(username);

                // Tell Keychain to ask the end user to allow the memo to be decrypted using their posting key
                steem_keychain.requestVerifyKey(username, encryptedMemo, 'Posting', async (response) => {
                    if (response.error) {
                        const toast = new ToastMessage();
    
                        toast.message = this.i18n.tr('errorLogin', { 
                            username, 
                            ns: 'errors' 
                        });
    
                        this.toast.error(toast);
                    } else {
                        // Get the return memo and remove the "#" at the start of the private memo
                        const signedKey = (response.result as unknown as string).substring(1);

                        // The decrypted memo is an encrypted string, so pass this to the server to get back refresh and access tokens
                        const tokens = await this.verifyUserAuthMemo(response.data.username, signedKey);

                        // Store the username, access token and refresh token
                        localStorage.setItem('username', response.data.username);
                        localStorage.setItem('access_token', tokens.accessToken);
                        localStorage.setItem('refresh_token', tokens.refreshToken);

                        resolve({username, accessToken: tokens.accessToken, refreshToken: tokens.refreshToken});
                    }
                });
            } else {
                try {
                    if (key && !steem.auth.isWif(key)) {
                        key = steem.auth.getPrivateKeys(username, key, ['posting']).posting;
                    }
                } catch(err) {
                    const toast = new ToastMessage();
    
                    toast.message = this.i18n.tr('invalidPrivateKeyOrPassword', { 
                        ns: 'errors' 
                    });
    
                    this.toast.error(toast);
                    return;
                }
    
                try {
                    const user = await steem.api.getAccountsAsync([username]);
    
                    if (user && user.length > 0) {
                        try {
                            if (steem.auth.wifToPublic(key) == user[0].memo_key || steem.auth.wifToPublic(key) === user[0].posting.key_auths[0][0]) {
                                // Get an encrypted memo only the user can decrypt with their private key
                                const encryptedMemo = await this.getUserAuthMemo(username);

                                // Decrypt the private memo to get the encrypted string
                                const signedKey = steem.memo.decode(key, encryptedMemo).substring(1);

                                // The decrypted memo is an encrypted string, so pass this to the server to get back refresh and access tokens
                                const tokens = await this.verifyUserAuthMemo(username, signedKey);

                                // Store the username, private key, access token and refresh token
                                localStorage.setItem('username', username);
                                localStorage.setItem('key', key);
                                localStorage.setItem('access_token', tokens.accessToken);
                                localStorage.setItem('refresh_token', tokens.refreshToken);

                                resolve({username, accessToken: tokens.accessToken, refreshToken: tokens.refreshToken});
                            } else {
                                const toast = new ToastMessage();
    
                                toast.message = this.i18n.tr('errorLogin', { 
                                    ns: 'errors' 
                                });
                
                                this.toast.error(toast);
                            }
                        } catch(err) {
                            const toast = new ToastMessage();
    
                            toast.message = this.i18n.tr('errorLogin', { 
                                ns: 'errors' 
                            });
            
                            this.toast.error(toast);
                        }
                    } else {
                        const toast = new ToastMessage();
    
                        toast.message = this.i18n.tr('errorLoading', { 
                            ns: 'errors' 
                        });
        
                        this.toast.error(toast);
                    }
                } catch (e) {
                    return;
                }
            }
        });
    }

    async getUserAuthMemo(username: string) {
        const res = await this.http.fetch(`getUserAuthMemo/${username}`);
        const obj = await res.json();

        return obj.memo;
    }

    async verifyUserAuthMemo(username, signedKey) {
        const res = await this.http.fetch('verifyUserAuthMemo', {
            method: 'POST',
            body: json({
                username,
                signedKey
            })
        });

        const obj = await res.json();

        return {
            accessToken: obj.access_token,
            refreshToken: obj.refresh_token
        };
    }

    async verifyAuthToken(username, accessToken) {
        const res = await this.http.fetch('verifyAuthToken', {
            method: 'POST',
            body: json({
                username,
                accessToken
            })
        });

        const obj = await res.json();

        console.log(obj);

        return obj;
    }

    async newAuthToken(username, refreshToken) {
        const res = await this.http.fetch('newAuthToken', {
            method: 'POST',
            body: json({
                username,
                refreshToken
            })
        });

        const obj = await res.json();

        return obj.access_token;
    }
}
