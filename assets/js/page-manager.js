import { api } from 'bigcommerce/stencil-utils';
import _ from 'lodash';

export default class PageManager {
    constructor() {
        this.genericError = 'Oops! Something went wrong.';
    }

    before(next) {
        next();
    }

    loaded(next) {
        next();
    }

    after(next) {
        next();
    }

    type() {
        return this.constructor.name;
    }

    getPageModal(url, options, callback) {
        let modal = {
            element: $('#modal'),
            content: $('.modal-content', this.element),
            overlay: $('.loadingOverlay', this.element)
        };

        if (typeof options === 'function') {
            callback = options;
            options = {};
        }

        if (!_.isObject(options)) {
            options = {};
        }

        modal.content.html('');
        modal.overlay.show();

        // open modal
        modal.element.foundation('reveal', 'open');

        api.getPage(url, options, (err, content) => {
            modal.overlay.hide();

            if (err) {
                modal.content.html(this.genericError);

                if (typeof callback === 'function') {
                    return callback(err, {
                        modal: modal
                    });
                } else {
                    throw err;
                }
            }

            modal.content.html(content);

            if (typeof callback === 'function') {
                callback(null, {
                    modal: modal,
                    content: content
                });
            }
        });
    }
}
