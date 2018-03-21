;(function ($) {

    window.debugPubSub = {

        getIndents: function (type) {
            var minLength = 14,
                indents = "";

            while ((type + indents).length < minLength) {
                indents = indents + " ";
            }

            return indents;
        },

        decorate: function (func, type) {
            var me = this;

            return function () {
                var indents = me.getIndents(type);

                switch (type) {
                    case 'subscribe':
                    case 'unsubscribe':
                    case 'publish':
                        if (type === 'publish' && arguments[1]) {
                            console.log("(%s)%s %s [arguments: %O]", type, indents, arguments[0], arguments[1]);
                        }
                        else {
                            console.log("(%s)%s %s", type, indents, arguments[0]);
                        }

                        break;
                    case 'addPlugin':
                    case 'removePlugin':
                    case 'updatePlugin':
                    case 'destroyPlugin':
                        if (type === 'addPlugin' && arguments[2]) {
                            console.log("(%s)%s %s [element: %o, viewports: %O]", type, indents, arguments[1], arguments[0], arguments[2]);
                        }
                        else {
                            console.log("(%s)%s %s [element: %o]", type, indents, arguments[1], arguments[0]);
                        }

                        break;
                    case 'switchPlugins':
                        console.log("(%s)%s %c[previousState: %s, currentState: %s]", type, indents, 'font-weight:bold', arguments[0], arguments[1]);

                        break;
                    case 'initPlugin':
                        func.apply(
                            this,
                            arguments
                        );

                        var element = arguments[0],
                            selector = arguments[1],
                            pluginName = arguments[2],
                            plugin = element.data('plugin_' + pluginName);

                        if (plugin) {
                            console.log("(%s)%s %s [selector: %o, events: %O]", type, indents, pluginName, selector, plugin._events);
                        }
                        else {
                            console.log("(%s)%s %s [selector: %o]", type, indents, pluginName, selector);
                        }

                        return;
                }

                return func.apply(
                    this,
                    arguments
                );
            }
        }

    };

    $.subscribe = window.debugPubSub.decorate($.subscribe, 'subscribe');
    $.unsubscribe = window.debugPubSub.decorate($.unsubscribe, 'unsubscribe');
    $.publish = window.debugPubSub.decorate($.publish, 'publish');

    window.StateManager.addPlugin = window.debugPubSub.decorate(window.StateManager.addPlugin, 'addPlugin');
    window.StateManager.removePlugin = window.debugPubSub.decorate(window.StateManager.removePlugin, 'removePlugin');
    window.StateManager.updatePlugin = window.debugPubSub.decorate(window.StateManager.updatePlugin, 'updatePlugin');
    window.StateManager.destroyPlugin = window.debugPubSub.decorate(window.StateManager.destroyPlugin, 'destroyPlugin');

    window.StateManager._switchPlugins = window.debugPubSub.decorate(window.StateManager._switchPlugins, 'switchPlugins');
    window.StateManager._initSinglePlugin = window.debugPubSub.decorate(window.StateManager._initSinglePlugin, 'initPlugin');

}(jQuery));