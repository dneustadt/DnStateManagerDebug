# Shopware StateManager Debug

> **Discontinued** - now part of [FroshProfiler](https://github.com/FriendsOfShopware/FroshProfiler)

Shopware Plugin featuring a Javascript console debug tool for the StateManager. 

Will log ...

... PubSub events: 

* subscribe (*event name*)
* unsubscribe (*event name*)
* publish (*event name, arguments*)

... Plugin registration:

* addPlugin (*plugin name, element, viewports*)
* removePlugin (*plugin name, element*)
* updatePlugin (*plugin name, element*)
* destroyPlugin (*plugin name, element*)

... Breakpoint change:

* switchPlugins (*previous/current state*)

... Plugin initialization:

* initPlugin (*plugin name, selector, event handlers*)

## Filter

You can filter output by ...

* type (available: *subscribe, unsubscribe, publish, addPlugin, removePlugin, updatePlugin, destroyPlugin, switchPlugins, initPlugin*)
* event name
* plugin name

To set filter use the javascript console and the following functions, corresponding to each filter:

```javascript
StateDebug.setFilterType('publish');
StateDebug.setFilterEvent(['onTrackItems', 'onSetSizes']);
StateDebug.setFilterPlugin('swAjaxVariant');
```

You can pass a single filter criteria as string or an array of multiple filter criterias.

Type criterias need to be exact and available (see above). Event and plugin name criterias can
include part of the name.

To reset filter criterias call the function without any arguments.

## Example output

```
(initPlugin)     swMenuScroller [selector: "*[data-menu-scroller="true"]", events: ▶ Array(3)]
(initPlugin)     dnVariantSwitch [selector: "*[data-variant-switch="true"]"]
(subscribe)      plugin/swAddArticle/onAddArticle
(subscribe)      plugin/swCollapseCart/onRemoveArticleFinished
(publish)        plugin/swAjaxProductNavigation/onProductNavigationLoaded [arguments: ▶ Array(2)]
(publish)        plugin/swProductSlider/onBuffer [arguments: ▶ Array(4)]
(switchPlugins)  [previousState: xl, currentState: xs]
(destroyPlugin)  swTabMenu [element: ▶ n.fn.init [div.tab-menu--product.js--tab-menu, ...]]
(unsubscribe)    plugin/swImageSlider/onRightArrowClick.swImageZoom
```

## Installation

* Clone this repository into a folder **DnStateManagerDebug** within the **custom/plugins** directory of the Shopware installation.
* Install the plugin through the Plugin-Manager within the Shopware backend.

### Install with composer

* Change to your root installation of shopware
* Run command `composer require dneustadt/dn-state-manager-debug` and install and activate plugin with Plugin Manager 

## Requirements

* Shopware 5.4.0 or higher
* PHP 7.0