// Copyright (c) 2019 Dwayne Charrington <dwaynecharrington@gmail.com>
// This code is licensed under MIT license (see LICENSE for details)

import { PLATFORM } from 'aurelia-pal';

import { FrameworkConfiguration } from 'aurelia-framework';

export function configure(config: FrameworkConfiguration) {
  config.globalResources([
      PLATFORM.moduleName('./attributes/class-attribute'),
      PLATFORM.moduleName('./value-converters/auth-filter'),
  ]);
}
