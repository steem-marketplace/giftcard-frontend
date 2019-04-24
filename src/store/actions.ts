// Copyright (c) 2019 Dwayne Charrington <dwaynecharrington@gmail.com>
// This code is licensed under MIT license (see LICENSE for details)

import { State } from './state';
import store from './store';

export function loading(state: State, boolean: boolean) {
    const newState = { ...state };

    newState.loading = Boolean(boolean);

    return newState;
}

export async function login(state: State, user: { username: string, accessToken: string, refreshToken: string }): Promise<State> {
    let newState = { ...state };

    newState.user.name = user.username;
    newState.user.accessToken = user.accessToken;
    newState.user.refreshToken = user.refreshToken;
    newState.user.loggedIn = true;

    return newState;
}

export async function logout(state: State): Promise<State> {
    const newState = { ...state };

    newState.user = {
        name: '',
        accessToken: '',
        refreshToken: '',
        marketBalance: 0,
        loggedIn: false
    };

    return newState;
}

export async function getFeaturedProducts(state: State): Promise<State> {
    let newState = { ...state };

    newState.featuredProducts = [
        { id: 1, name: '$25 Amazon Gift Card', image: 'https://picsum.photos/350/224', price: 15.00 },
        { id: 1, name: '$50 Best Buy Gift Card', image: 'https://picsum.photos/350/224', price: 40.00 },
        { id: 1, name: '$100 Jb HiFi Gift Card', image: 'https://picsum.photos/350/224', price: 80.00 },
    ];

    return newState;
}

store.registerAction('loading', loading);
store.registerAction('login', login);
store.registerAction('logout', logout);
store.registerAction('getFeaturedProducts', getFeaturedProducts);
