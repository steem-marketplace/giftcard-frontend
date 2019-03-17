// Copyright (c) 2019 Dwayne Charrington <dwaynecharrington@gmail.com>
// This code is licensed under MIT license (see LICENSE for details)

import client from 'steem';

export class SteemService {
    public api = client.api;
    public auth = client.auth;
    public utils = client.utils;
    public formatter = client.formatter;

    async getAccountHistory(name) {
        return this.api.getAccountHistory();
    }
}
