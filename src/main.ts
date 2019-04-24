// Copyright (c) 2019 Dwayne Charrington <dwaynecharrington@gmail.com>
// This code is licensed under MIT license (see LICENSE for details)

import '@babel/polyfill';
import 'bootstrap/dist/js/bootstrap.bundle';

import { Aurelia } from 'aurelia-framework'
import environment from './environment';
import { PLATFORM } from 'aurelia-pal';
import { I18N, TCustomAttribute } from 'aurelia-i18n';
import { ValidationMessageProvider } from 'aurelia-validation';
import Backend from 'i18next-xhr-backend';

import { initialState } from './store/state';

import '!style-loader!css-loader!bootstrap/dist/css/bootstrap.css';
import './styles/variables.css';
import '!style-loader!css-loader!./styles/global.css';

import modalCss from '!style-loader!css-loader!./styles/modal.css';
import store from 'store/store';
import { login } from 'store/actions';

export async function configure(aurelia: Aurelia) {
    aurelia.use
        .standardConfiguration()
        .feature(PLATFORM.moduleName('resources/index'));

    aurelia.use.plugin(PLATFORM.moduleName('aurelia-store', 'store'), {
        initialState: initialState,
        history: {
            undoable: false,
            limit: 10
        }
    });

    aurelia.use.plugin(PLATFORM.moduleName('aurelia-animator-css'));
    aurelia.use.plugin(PLATFORM.moduleName('aurelia-async-binding'));
    aurelia.use.plugin(PLATFORM.moduleName('aurelia-portal-attribute'));
    aurelia.use.plugin(PLATFORM.moduleName('aurelia-validation'));
    aurelia.use.plugin(PLATFORM.moduleName('aurelia-dialog'), config => {
        config
            .useDefaults()
            .useCSS(modalCss)
    });

    aurelia.use.plugin(PLATFORM.moduleName('aurelia-i18n'), instance => {
        let aliases = ['t', 'i18n'];
        TCustomAttribute.configureAliases(aliases);

        instance.i18next.use(Backend);

        return instance.setup({
            backend: {
                loadPath: 'locales/{{lng}}/{{ns}}.json'
            },
            attributes: aliases,
            lng: environment.defaultLocale,
            ns: ['translation', 'headings', 'buttons', 'errors'],
            defaultNS: 'translation',
            fallbackLng: 'en',
            debug: false
        });
    });

    ValidationMessageProvider.prototype.getMessage = function(key) {
        const i18n = aurelia.container.get(I18N);
        const translation = i18n.tr(`errors:${key}`);
        return this.parser.parse(translation);
    }

    ValidationMessageProvider.prototype.getDisplayName = function(propertyName, displayName) {
        if (displayName !== null && displayName !== undefined) {
          return displayName;
        }

        const i18n = aurelia.container.get(I18N);
        return i18n.tr(propertyName);
    };

    if (environment.debug) {
        aurelia.use.developmentLogging();
    }

    if (environment.testing) {
        aurelia.use.plugin(PLATFORM.moduleName('aurelia-testing'));
    }

    await aurelia.start();

    if (PLATFORM.global.localStorage) {
        if (PLATFORM.global.localStorage.getItem('access_token')) {
            const username = PLATFORM.global.localStorage.getItem('username');
            const accessToken = PLATFORM.global.localStorage.getItem('access_token');
            const refreshToken = PLATFORM.global.localStorage.getItem('refresh_token');

            await store.dispatch(login, {
                username,
                accessToken,
                refreshToken
            });
        }
    }

    await aurelia.setRoot(PLATFORM.moduleName('app'));
}
