// Copyright (c) 2019 Dwayne Charrington <dwaynecharrington@gmail.com>
// This code is licensed under MIT license (see LICENSE for details)

import { State } from './state';
import store from './store';

export async function login(state: State, user: any): Promise<State> {
    let newState = { ...state };

    newState.loggedIn = true;

    return newState;
}

export async function logout(state: State): Promise<State> {
    const newState = { ...state };

    newState.loggedIn = false;

    newState.user = {
        id: null,
        name: '',
        balance: '',
        sbd_balance: '',
        can_vote: false,
        post_count: 0,
        voting_power: 0,
        voting_manabar: {
            current_mana: '0',
            last_update_time: 0
        },
        reputation: 0,
        valueInUsd: 0
    };

    return newState;
}

export async function setUserMeta(state: State, data: any): Promise<State> {
    let newState = { ...state };

    newState.user = data;

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

store.registerAction('login', login);
store.registerAction('logout', logout);
store.registerAction('setUserMeta', setUserMeta);
store.registerAction('getFeaturedProducts', getFeaturedProducts);
