<?php
/**
 * Functions which declare theme support for WordPress
 *
 * @package challenge
 */

if ( ! function_exists( 'challenge_setupmenus' ) ) :
	/**
	 * Sets up theme defaults and registers support for various WordPress features.
	 *
	 * Note that this function is hooked into the after_setup_theme hook, which
	 * runs before the init hook. The init hook is too late for some features, such
	 * as indicating support for post thumbnails.
	 */
	function challenge_setupmenus() {

		register_nav_menus(
			array(
				'primary' => esc_html__( 'Primary Menu', 'challenge' ),
				'footer'  => esc_html__( 'Footer Menu', 'challenge' ),
			)
		);
	}

endif;
add_action( 'after_setup_theme', 'challenge_setupmenus' );
