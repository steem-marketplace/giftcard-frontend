import { State } from 'store/state';

import styles from './app-header.css';

import { bindable, customElement } from 'aurelia-framework';

@customElement('app-header')
export class AppHeader {
    private styles = styles;

    @bindable private router;
    @bindable private state: State;
}
