import { error } from '@sveltejs/kit';
import { getPortfolioProjectBySlug } from '$lib/server/projects';

export async function load({ params }) {
	const project = await getPortfolioProjectBySlug(params.slug);

	if (!project) {
		throw error(404, 'Project not found');
	}

	return { project };
}