// Copyright (c) 2019 Dwayne Charrington <dwaynecharrington@gmail.com>
// This code is licensed under MIT license (see LICENSE for details)

import { HttpClient } from 'aurelia-fetch-client';
import { lazy } from 'aurelia-framework';

/**
 * Price Service
 * 
 * Responsible for getting the price of STEEM and SBD
 * as well as helper functions when displaying and dealing with prices
 * 
 */
export class PriceService {
    private http: HttpClient;

    private cmcSteemApi = 'https://api.coinmarketcap.com/v1/ticker/steem/';
    private cmcSbdApi = 'https://api.coinmarketcap.com/v1/ticker/steem-dollars/';

    constructor(@lazy(HttpClient) private getHttpClient: () => HttpClient) {
        this.http = this.getHttpClient();

        this.http.configure(config => {
            config
                .useStandardConfiguration();
        })
    }

    public async getSteemPrice(): Promise<number> {
        const response = await this.http.fetch(`${this.cmcSteemApi}`);
        const json: CoinMarketCapTickerInterface[] = await response.json();

        return parseFloat(JSON.parse(json[0].price_usd));
    }

    public async getSbdPrice(): Promise<number> {
        const response = await this.http.fetch(`${this.cmcSbdApi}`);
        const json: CoinMarketCapTickerInterface[] = await response.json();

        return parseFloat(JSON.parse(json[0].price_usd));
    }

    public getDisplayValueForSteem(steemTotal: number) {
        return `${steemTotal.toFixed(3)} STEEM`;
    }

    public getDisplayValueForSbd(sbdTotal: number) {
        return `${sbdTotal.toFixed(3)} SBD`;
    }

    public splitValue(value) {
        return value.toFixed(3).toString().split('.');
    }
}
