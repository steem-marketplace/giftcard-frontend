// Copyright (c) 2019 Dwayne Charrington <dwaynecharrington@gmail.com>
// This code is licensed under MIT license (see LICENSE for details)

import { State } from 'store/state';

import styles from './app-header.css';

import { bindable, customElement } from 'aurelia-framework';

@customElement('app-header')
export class AppHeader {
    private styles = styles;

    @bindable private router;
    @bindable private state: State;

    private searchOpen = false;

    toggleSearch() {
        this.searchOpen = !this.searchOpen;
    }
}
