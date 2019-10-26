const Assert = require('assert');
const find = require('lodash/find');
const forIn = require('lodash/forIn');
const mix = require('laravel-mix');

// TODO remove in next major release (2.0.0)
let installed = false;

let definitions = {};

/**
 * Laravel Mix Definitions
 *
 * Provide straight-forward way of defining global constraints.
 */
class LaravelMixDefinitions {

    /**
     * Install the plugin for Laravel Mix.
     *
     * @return {this}
     */
    static installPlugin() {

        // TODO remove in next major release (2.0.0)
        if (installed) {

            console.warn(`Calling ${this.name}.installPlugin() directly is now deprecated and will be removed in the next major version.`);

            return;

        }

        mix.extend('definition', new class {

            /**
             * Add event listener to insert custom definitions.
             */
            boot() {

                Mix.listen('loading-plugins', plugins => {

                    const define = find(plugins, plugin => plugin.constructor.name === 'DefinePlugin');

                    define.definitions = Object.assign(define.definitions, definitions);

                });

            }

            /**
             * Add definitions to webpack.
             *
             * @param {String|Object} find
             * @param {String|undefined} swap
             */
            register(find, swap) {

                const group = (() => {

                    let group = {};

                    if (typeof find === 'string') {
                        group[find] = swap;
                    } else if (typeof find === 'object') {
                        group = find;
                    } else {
                        Assert(false, 'Expecting valid find string or object.');
                    }

                    return group;

                })();

                forIn(group, value => Assert(typeof value === 'string', 'Expecting valid swap string.'));

                definitions = Object.assign(definitions, group);

            }

        });

        // TODO remove in next major release (2.0.0)
        installed = true;

        return this;

    }

}

// TODO remove in next major release (2.0.0)
module.exports = LaravelMixDefinitions.installPlugin();