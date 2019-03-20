import { customElement, bindable } from 'aurelia-framework';

@customElement('notification')
export class Notification {
    @bindable icon;
    @bindable text;
    @bindable time;
}
