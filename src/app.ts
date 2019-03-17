// Copyright (c) 2019 Dwayne Charrington <dwaynecharrington@gmail.com>
// This code is licensed under MIT license (see LICENSE for details)

import { PLATFORM } from 'aurelia-pal';
import { RouterConfiguration, Router } from 'aurelia-router';
import { AuthorizeStep } from './resources/pipeline-steps/auth-pipeline';
import { Store, dispatchify, rehydrateFromLocalStorage } from 'aurelia-store';
import { State } from 'store/state';
import { Subscription } from 'rxjs';
import { autoinject } from 'aurelia-framework';
import './store/store';

@autoinject()
export class App {
    private router: Router;
    private state: State;
    private subscription: Subscription;

    constructor(private store: Store<State>) {
        this.subscription = this.store.state.subscribe((state) => {
            if (state) {
                this.state = state;

                AuthorizeStep.loggedIn = state.loggedIn;
            }
        });
    }

    // On initial load, rehydrate store from cache middleware
    attached() {
        dispatchify(rehydrateFromLocalStorage)('steem_marketplace__giftcard');
    }

    configureRouter(config: RouterConfiguration, router: Router) {
        config.title = 'Gift Card Marketplace';

        config.options.pushState = true;

        config.map([
            { 
                route: [''], 
                name: 'home', 
                title: 'Home', 
                moduleId: PLATFORM.moduleName('./routes/home'), 
                nav: true 
            },

            {
                route: 'category/:category',
                name: 'category',
                title: 'Category',
                moduleId: PLATFORM.moduleName('./routes/category'),
                nav: false
            },

            {
                route: 'view/:id',
                name: 'view',
                title: 'View',
                moduleId: PLATFORM.moduleName('./routes/single'),
                nav: false
            },

            {
                route: 'user/:username',
                name: 'user',
                title: 'User',
                moduleId: PLATFORM.moduleName('./routes/user'),
                nav: false
            },

            {
                route: 'user/:username/items',
                name: 'userItems',
                title: 'User Items',
                moduleId: PLATFORM.moduleName('./routes/user-items'),
                nav: false
            },

            {
                route: 'dashboard',
                name: 'dashboardHome',
                title: 'Dashboard',
                moduleId: PLATFORM.moduleName('./routes/dashboard/home'),
                nav: false,
                auth: true
            },

            {
                route: 'dashboard/new',
                name: 'new-item',
                title: 'New Item',
                moduleId: PLATFORM.moduleName('./routes/dashboard/new-item'),
                nav: false,
                auth: true
            }
        ]);

        config.addAuthorizeStep(AuthorizeStep);

        this.router = router;
    }
}
