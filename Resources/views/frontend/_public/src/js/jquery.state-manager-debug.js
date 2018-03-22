;(function ($) {

    window.debugPubSub = {

        'filter' : JSON.parse(window.localStorage.getItem('state-manager-debug/filter')) || {
            'type': [],
            'event': [],
            'plugin': []
        },

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

            if (me.filter.type.length !== 0 && $.inArray(type, me.filter.type) === -1) {
                type = null;
            }

            return function () {
                var indents = me.getIndents(type);

                switch (type) {
                    case 'subscribe':
                    case 'unsubscribe':
                    case 'publish':
                        var eventName = arguments[0],
                            args = arguments[1];

                        if (me.filter.event.length !== 0 && !me.filter.event.some(function (val) { return eventName.includes(val) })) {
                            break;
                        }

                        if (type === 'publish' && args) {
                            console.log("(%s)%s %s [arguments: %O]", type, indents, eventName, args);
                        }
                        else {
                            console.log("(%s)%s %s", type, indents, eventName);
                        }

                        break;
                    case 'addPlugin':
                    case 'removePlugin':
                    case 'updatePlugin':
                    case 'destroyPlugin':
                        var element = arguments[0],
                            pluginName = arguments[1],
                            viewports = arguments[2];

                        if (me.filter.plugin.length !== 0 && !me.filter.plugin.some(function (val) { return pluginName.includes(val) })) {
                            break;
                        }

                        if (type === 'addPlugin' && viewports) {
                            console.log("(%s)%s %s [element: %o, viewports: %O]", type, indents, pluginName, element, viewports);
                        }
                        else {
                            console.log("(%s)%s %s [element: %o]", type, indents, pluginName, element);
                        }

                        break;
                    case 'switchPlugins':
                        var previousState = arguments[0],
                            currentState = arguments[1];

                        console.log("(%s)%s %c[previousState: %s, currentState: %s]", type, indents, 'font-weight:bold', previousState, currentState);

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

                        if (me.filter.plugin.length !== 0 && !me.filter.plugin.some(function (val) { return pluginName.includes(val) })) {
                            return;
                        }

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
        },

        setFilter: function (key, value) {
            var me = this;

            me.filter[key] = [];

            if ($.isArray(value)) {
                me.filter[key] = value;
            }
            else if (value) {
                me.filter[key].push(value)
            }

            window.localStorage.setItem('state-manager-debug/filter', JSON.stringify(me.filter))
        },

        setFilterType: function (value) {
            var me = this,
                types = [
                    'subscribe',
                    'unsubscribe',
                    'publish',
                    'addPlugin',
                    'removePlugin',
                    'updatePlugin',
                    'destroyPlugin',
                    'switchPlugins',
                    'initPlugin'
                ];

            if (
                (value && !$.isArray(value) && $.inArray(value, types) === -1) ||
                ($.isArray(value) && !value.every(function (val) { return $.inArray(val, types) !== -1; }))
            ) {
                console.error('Allowed types: %s', types.toString());

                return;
            }

            me.setFilter('type', value);
        },

        setFilterEvent: function (value) {
            var me = this;

            me.setFilter('event', value);
        },

        setFilterPlugin: function (value) {
            var me = this;

            me.setFilter('plugin', value);
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