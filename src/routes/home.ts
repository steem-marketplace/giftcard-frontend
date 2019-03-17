// Copyright (c) 2019 Dwayne Charrington <dwaynecharrington@gmail.com>
// This code is licensed under MIT license (see LICENSE for details)

import styles from './home.css';
import { dispatchify, connectTo } from 'aurelia-store';
import { getFeaturedProducts } from 'store/actions';

@connectTo()
export class Home {
    private styles = styles;

    async activate() {
        await dispatchify(getFeaturedProducts)();
    }
}
