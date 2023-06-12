<?php

/**
 * Plugin Name: Custom Block Plugin
 * Description: Plugin personalizado para prueba técnica que genera un bloque de WordPress con estilos dependiendo de la categoría.
 * Version: 1.0
 * Author: Fernando Cuba
 */

function custom_block_plugin_scripts()
{
    wp_enqueue_script(
        'custom-block-plugin-script',
        plugins_url('assets/js/custom-block-plugin.js', __FILE__),
        array('wp-blocks', 'wp-element')
    );

    wp_enqueue_style(
        'custom-block-plugin-style',
        plugins_url('assets/css/custom-block-plugin.css', __FILE__)
    );
}

function custom_block_plugin_scripts_public()
{
    wp_enqueue_script(
        'custom-block-plugin-script-public',
        plugins_url('assets/js/custom-block-plugin-public.js', __FILE__),
        array('wp-blocks', 'wp-element'),
        '1.0',
        true
    );

    wp_enqueue_style(
        'custom-block-plugin-style-public',
        plugins_url('assets/css/custom-block-plugin-public.css', __FILE__)
    );
}

add_action('enqueue_block_assets', 'custom_block_plugin_scripts_public');
