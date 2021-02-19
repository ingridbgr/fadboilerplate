<?php
/**
 * [name] Block Template.
 *
 * @param   array $block The block settings and attributes.
 * @param   string $content The block inner HTML (empty).
 * @param   bool $is_preview True during AJAX preview.
 * @param   (int|string) $post_id The post ID this block is saved to.
 * @package challenge
 */

// Create id attribute allowing for custom "anchor" value.
$id = 'newexample-' . $block['id'];
if( !empty($block['anchor']) ) {
    $id = $block['anchor'];
}

// Create class attribute allowing for custom "className" and "align" values.
$className = 'new-example-block';
if( !empty($block['className']) ) {
    $className .= ' ' . $block['className'];
}
if( !empty($block['align']) ) {
    $className .= ' align' . $block['align'];
}

// Get ACF fields.
$new_content = get_field( 'new_content' );
$new_one_more_field = get_field( 'new_one_more_field' ); 
$new_other_field = get_field( 'new_other_field');

// Display Preview
if (isset($block['data']['is_preview']) && $block['data']['is_preview'] == true) :
    $preview_image = $block['data']['preview_image'];
    echo '<img src="' . $preview_image . '"/>';
else :
// Render Block
?>

<section id="<?php echo esc_attr($id); ?>" class="<?php echo esc_attr($className); ?>">
	<div class="new-example-block__container bg-primary text-light p-5">
        <h1>New Example Block</h1>
		<div class="new-example-block__text-container">
            <p><?php echo esc_html( $new_content ); ?></p>
            <p><?php echo esc_html( $new_one_more_field ); ?></p>
            <p><?php echo esc_html( $new_other_field ); ?></p>
		</div>
	</div>
</section>

<?php endif; ?>

<?php //Any minor scripts that are related to the individual block. ?>
<script>
(function($) {


})(jQuery);
</script>
