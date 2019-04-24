// Copyright (c) 2019 Dwayne Charrington <dwaynecharrington@gmail.com>
// This code is licensed under MIT license (see LICENSE for details)

export interface State {
    loggedIn: boolean;
    user: {
        id: number;
        name: string;
        marketBalance: number;
    };
    featuredProducts: any[];
}

export const initialState: State = {
    loggedIn: false,
    user: {
        id: null,
        name: '',
        marketBalance: 0
    },
    featuredProducts: []
};
