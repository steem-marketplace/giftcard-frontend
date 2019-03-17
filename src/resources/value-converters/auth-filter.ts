// Copyright (c) 2019 Dwayne Charrington <dwaynecharrington@gmail.com>
// This code is licensed under MIT license (see LICENSE for details)

import { valueConverter } from 'aurelia-binding';

@valueConverter('authFilter')
export class AuthFilter {
  toView(routes, loggedIn) {
    if (loggedIn) {
      return routes.filter(r => !r.config.publicOnly);
    }

    return routes.filter(r => !r.config.auth);
  }
}
