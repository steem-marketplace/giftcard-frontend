// Copyright (c) 2019 Dwayne Charrington <dwaynecharrington@gmail.com>
// This code is licensed under MIT license (see LICENSE for details)

export class Category {
    async canActivate(params) {
        // Pagination offset
        const page = !params.page ? 1 : parseInt(params.page);

        // Category slug
        const category = params.category;
    }
}
