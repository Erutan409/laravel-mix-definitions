const Assert = require('assert');
const Api = require('laravel-mix/src/Api');
const find = require('lodash/find');
const forIn = require('lodash/forIn');

class LaravelMixDefinitions {

    /**
     * Install the plugin for Laravel Mix.
     *
     * @param {Api} mix
     */
    static installPlugin(mix) {

        Assert(mix instanceof Api, 'Expecting valid instance of Laravel Mix Api.');

        let definitions = {};

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

    }

}

module.exports = LaravelMixDefinitions;