<?php

namespace DnStateManagerDebug\Subscriber;

use Doctrine\Common\Collections\ArrayCollection;
use Enlight\Event\SubscriberInterface;

/**
 * Class JavascriptCollect
 * @package DnVariantSwitch\Subscriber
 */
class JavascriptCollect implements SubscriberInterface
{
    /**
     * @var string
     */
    private $pluginDirectory;

    /**
     * JavascriptCollect constructor.
     * @param $pluginDirectory
     */
    public function __construct(
        $pluginDirectory
    )
    {
        $this->pluginDirectory = $pluginDirectory;
    }

    /**
     * {@inheritdoc}
     */
    public static function getSubscribedEvents()
    {
        return [
            'Theme_Compiler_Collect_Plugin_Javascript' => 'addJsFiles',
        ];
    }

    /**
     * @return \Doctrine\Common\Collections\ArrayCollection
     */
    public function addJsFiles()
    {
        $jsFiles = [
            $this->pluginDirectory . '/Resources/views/frontend/_public/src/js/jquery.state-manager-debug.js',
        ];

        return new ArrayCollection($jsFiles);
    }
}