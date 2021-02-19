<?php
/**
* Register custom block categories
*/
function my_block_category( $categories, $post ) {
	return array_merge(
		array(
			array(
				'slug' => 'challenge-blocks',
				'title' => __( 'challenge Blocks', 'challenge-blocks' ),
				'icon'  => 'wordpress',
			),
		), $categories
	);
}
add_filter( 'block_categories', 'my_block_category', 10, 2);

// Import core block variations
require_once( get_template_directory() . '/blocks/core/core.php' );

//reference: https://www.advancedcustomfields.com/resources/acf_register_block_type/
function register_acf_block_types() {

	acf_register_block_type(array(
	    'name'              => 'example',
	    'title'             => __('Example'),
	    'category'          => 'challenge-blocks',
	    'description'       => __('Example Block'),
	    'render_template'   => 'blocks/example/example-block.php',
	    'icon'              => 'wordpress',
	    'keywords'          => array( 'example' ),
		'example'           => array(
			'attributes' => array(
				'mode' => 'preview',
				'data' => array(
					'preview_image'   => get_stylesheet_directory_uri() . "/blocks/example/example-block_preview-image.png",
					'is_preview'    => true
				)
			)
		)
	));

	acf_register_block_type(array(
	    'name'              => 'new-example-block',
	    'title'             => __('New Example'),
	    'category'          => 'challenge-blocks',
	    'description'       => __('New Example Block'),
	    'render_template'   => 'blocks/new_example/new-example-block.php',
	    'icon'              => 'wordpress',
	    'keywords'          => array( 'new-example' ),
		'new-example'       => array(
			'attributes' => array(
				'mode' => 'preview',
				'data' => array(
					'preview_image'   => get_stylesheet_directory_uri() . "/blocks/new_example/new-example-block_preview-image.png",
					'is_preview'    => true
				)
			)
		)
	));
}

// Check if function exists and hook into setup.
if( function_exists('acf_register_block_type') ) {
    add_action('acf/init', 'register_acf_block_types');
}
