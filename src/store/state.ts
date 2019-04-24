// Copyright (c) 2019 Dwayne Charrington <dwaynecharrington@gmail.com>
// This code is licensed under MIT license (see LICENSE for details)

export interface State {
    loading: boolean;
    user: {
        name: string;
        loggedIn: boolean;
        accessToken: string;
        refreshToken: string;
        marketBalance: number;
    };
    featuredProducts: any[];
}

export const initialState: State = {
    loading: false,
    user: {
        name: '',
        loggedIn: false,
        accessToken: '',
        refreshToken: '',
        marketBalance: 0
    },
    featuredProducts: []
};
