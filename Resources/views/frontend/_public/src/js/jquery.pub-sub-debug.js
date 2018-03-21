;(function ($) {

    $.debugPubSub = function (func, type) {

        return function() {
            switch(type) {
                case 'subscribe':
                case 'unsubscribe':
                case 'publish':
                    if (type === 'publish' && arguments[1]) {
                        console.log("(%s)\t\t %s [arguments: %O]", type, arguments[0], arguments[1]);
                    }
                    else {
                        console.log("(%s)\t\t %s", type, arguments[0]);
                    }

                    break;
                case 'addPlugin':
                case 'removePlugin':
                case 'updatePlugin':
                case 'destroyPlugin':
                    if (type === 'addPlugin' && arguments[2]) {
                        console.log("(%s)\t\t %s [element: %o, viewports: %O]", type, arguments[1], arguments[0], arguments[2]);
                    }
                    else {
                        console.log("(%s)\t %s [element: %o]", type, arguments[1], arguments[0]);
                    }

                    break;
                case 'switchPlugins':
                    console.info("(%s)\t %c[previousState: %s, currentState: %s]", type, 'font-weight:bold', arguments[0], arguments[1]);

                    break;
            }

            return func.apply(
                this,
                arguments
            );
        }

    };

    $.subscribe = $.debugPubSub($.subscribe, 'subscribe');
    $.unsubscribe = $.debugPubSub($.unsubscribe, 'unsubscribe');
    $.publish = $.debugPubSub($.publish, 'publish');

    window.StateManager.addPlugin = $.debugPubSub(window.StateManager.addPlugin, 'addPlugin');
    window.StateManager.removePlugin = $.debugPubSub(window.StateManager.removePlugin, 'removePlugin');
    window.StateManager.updatePlugin = $.debugPubSub(window.StateManager.updatePlugin, 'updatePlugin');
    window.StateManager.destroyPlugin = $.debugPubSub(window.StateManager.destroyPlugin, 'destroyPlugin');

    window.StateManager._switchPlugins = $.debugPubSub(window.StateManager._switchPlugins, 'switchPlugins');

}(jQuery));