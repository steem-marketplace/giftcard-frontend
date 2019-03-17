// Copyright (c) 2019 Dwayne Charrington <dwaynecharrington@gmail.com>
// This code is licensed under MIT license (see LICENSE for details)

import { Redirect } from 'aurelia-router';

export class AuthorizeStep {
  static loggedIn = false;

  run(navigationInstruction, next) {
    let isLoggedIn = AuthorizeStep.loggedIn;
    
    let currentRoute = navigationInstruction.config;
    
    let loginRequired = currentRoute.auth === true;
    
    // We are not logged in and this route requires the user to be authed
    if (isLoggedIn === false && loginRequired === true) {
        return next.cancel(new Redirect('/'));
    }
    
    // Sometimes a route is only available for non-logged in users
    let publicOnly = currentRoute.publicOnly === true;
    if (isLoggedIn === true && publicOnly === true) {
      return next.cancel(new Redirect('/'));
    }
    
    return next();
  }
}
