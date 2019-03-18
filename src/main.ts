// Copyright (c) 2019 Dwayne Charrington <dwaynecharrington@gmail.com>
// This code is licensed under MIT license (see LICENSE for details)

/// <reference types="aurelia-loader-webpack/src/webpack-hot-interface"/>

import { Aurelia } from 'aurelia-framework'
import environment from './environment';
import { PLATFORM } from 'aurelia-pal';
import { I18N, TCustomAttribute } from 'aurelia-i18n';
import Backend from 'i18next-xhr-backend';

import { initialState } from './store/state';

import '!style-loader!css-loader!bootstrap/dist/css/bootstrap.css';
import './styles/variables.css';
import '!style-loader!css-loader!./styles/global.css';

export function configure(aurelia: Aurelia) {
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

    aurelia.use.plugin(PLATFORM.moduleName('aurelia-i18n'), (instance) => {
        let aliases = ['t', 'i18n'];
        TCustomAttribute.configureAliases(aliases);
  
        // register backend plugin
        instance.i18next.use(Backend);
  
        return instance.setup({
          backend: {
            loadPath: './locales/{{lng}}/{{ns}}.json',
          },
          attributes: aliases,
          lng: environment.defaultLocale,
          ns: ['translation', 'headings', 'buttons'],
          defaultNS: 'translation',
          fallbackLng: 'en',
          debug : false
        });
      });

    if (environment.debug) {
        aurelia.use.developmentLogging();
    }

    if (environment.testing) {
        aurelia.use.plugin(PLATFORM.moduleName('aurelia-testing'));
    }

    aurelia.start().then(() => aurelia.setRoot(PLATFORM.moduleName('app')));
}
