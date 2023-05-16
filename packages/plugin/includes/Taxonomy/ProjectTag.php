<?php
/**
 * The "project_tag" taxonomy.
 *
 * @package Hwr\Portfolio
 */

declare( strict_types=1 );

namespace Hwr\Portfolio\Taxonomy;

use Hwr\Portfolio\PostType\ProjectPostType;

/**
 * Registers a flat taxonomy of tags for projects.
 *
 * Exposed to REST and WPGraphQL so the decoupled frontend can read and filter by
 * tag. Not publicly queryable on WordPress itself (the theme never renders
 * projects), and managed from the project editor like any other taxonomy.
 */
final class ProjectTag {

	public const TAXONOMY = 'project_tag';

	public const GRAPHQL_SINGLE = 'projectTag';

	public const GRAPHQL_PLURAL = 'projectTags';

	public function register_hooks(): void {
		add_action( 'init', array( $this, 'register' ) );
	}

	/**
	 * Registers the taxonomy against the project post type.
	 */
	public function register(): void {
		register_taxonomy(
			self::TAXONOMY,
			array( ProjectPostType::POST_TYPE ),
			array(
				'labels'             => array(
					'name'          => __( 'Tags', 'headless-portfolio' ),
					'singular_name' => __( 'Tag', 'headless-portfolio' ),
					'menu_name'     => __( 'Tags', 'headless-portfolio' ),
					'add_new_item'  => __( 'Add New Tag', 'headless-portfolio' ),
					'search_items'  => __( 'Search Tags', 'headless-portfolio' ),
				),

				// Flat tags, not a hierarchy.
				'hierarchical'       => false,

				// The theme never renders projects, so the taxonomy is not public,
				// but it is still exposed to the headless APIs below.
				'public'             => false,
				'publicly_queryable' => false,
				'show_ui'            => true,
				'show_in_menu'       => true,
				'show_admin_column'  => true,

				// Headless surfaces: REST and WPGraphQL.
				'show_in_rest'       => true,
				'rest_base'          => 'project-tags',
				'show_in_graphql'    => true,
				'graphql_single_name' => self::GRAPHQL_SINGLE,
				'graphql_plural_name' => self::GRAPHQL_PLURAL,
			)
		);
	}
}
