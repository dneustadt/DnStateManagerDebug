;(function ($) {

    $.debugPubSub = function (func, type) {

        return function() {
            var log = {
                'type': type
            };

            switch(type) {
                case 'subscribe':
                case 'unsubscribe':
                case 'publish':
                    log.event = arguments[0];

                    if (type === 'publish' && arguments[1]) {
                        log.arguments = arguments[1];
                    }

                    break;
                case 'addPlugin':
                case 'removePlugin':
                    log.selector = arguments[0];
                    log.plugin = arguments[1];

                    if (type === 'addPlugin' && arguments[2]) {
                        log.viewports = arguments[2];
                    }

                    break;
            }

            console.log(log);

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

}(jQuery));