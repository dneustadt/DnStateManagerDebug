<?php

namespace DnStateManagerDebug;

use Shopware\Components\Plugin;
use Symfony\Component\DependencyInjection\ContainerBuilder;
use Shopware\Components\Plugin\Context\ActivateContext;
use Shopware\Components\Plugin\Context\InstallContext;
use Shopware\Components\Plugin\Context\UpdateContext;

/**
 * Class DnStateManagerDebug
 * @package DnStateManagerDebug
 */
class DnStateManagerDebug extends Plugin
{
    /**
     * @param ContainerBuilder $container
     */
    public function build(ContainerBuilder $container)
    {
        $container->setParameter('dn_state_manager_debug.plugin_dir', $this->getPath());

        parent::build($container);
    }

    /**
     * @param InstallContext $context
     */
    public function install(InstallContext $context)
    {
        parent::install($context);
    }

    /**
     * @param ActivateContext $context
     */
    public function activate(ActivateContext $context)
    {
        $context->scheduleClearCache(InstallContext::CACHE_LIST_ALL);
    }

    /**
     * @param UpdateContext $context
     */
    public function update(UpdateContext $context)
    {
        $context->scheduleClearCache(InstallContext::CACHE_LIST_ALL);
    }
}