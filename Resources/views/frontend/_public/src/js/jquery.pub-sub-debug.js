;(function ($) {

    $.debugPubSub = function (func, type) {

        return function() {
            var log = {
                'type': type,
                'event': arguments[0]
            };

            if (type === 'publish') {
                log.arguments = arguments[1];
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

}(jQuery));