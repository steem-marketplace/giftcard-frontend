// Copyright (c) 2019 Dwayne Charrington <dwaynecharrington@gmail.com>
// This code is licensed under MIT license (see LICENSE for details)

import { State } from 'store/state';

import styles from './product-block.css';

import { bindable, customElement } from 'aurelia-framework';

@customElement('product-block')
export class ProductBlock {
    private styles = styles;

    @bindable private product;
}
