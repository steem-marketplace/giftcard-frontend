import { State } from 'store/state';

import styles from './app-menu.css';

import { bindable, customElement } from 'aurelia-framework';

@customElement('app-menu')
export class AppMenu {
    private styles = styles;

    @bindable private router;
    @bindable private state: State;
}
