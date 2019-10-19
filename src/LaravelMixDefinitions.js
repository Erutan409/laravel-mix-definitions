const Assert = require('assert');
const Api = require('laravel-mix/src/Api');
const find = require('lodash/find');

class LaravelMixDefinitions {

    /**
     * Install the plugin for Laravel Mix.
     *
     * @param {Api} mix
     */
    static installPlugin(mix) {

        Assert(mix instanceof Api, 'Expecting valid instance of Laravel Mix Api.');

        const definitions = {};

        mix.extend('definition', new class {

            boot() {

                Mix.listen('loading-plugins', plugins => {

                    const define = find(plugins, plugin => plugin.constructor.name === 'DefinePlugin');

                    define.definitions = Object.assign(define.definitions, definitions);

                });

            }

            register(find, swap) {

                Assert(typeof find === 'string', 'Expecting valid find string.');
                Assert(typeof swap === 'string', 'Expecting valid swap string.');

                definitions[find] = swap;

            }

        });

    }

}

module.exports = LaravelMixDefinitions;