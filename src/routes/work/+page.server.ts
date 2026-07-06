import { getPortfolioProjects } from '$lib/server/projects';

export async function load() {
	try {
		const projects = await getPortfolioProjects();
		return {
			projects
		};
	} catch (error) {
		console.error('Failed to load projects:', error);
		return {
			projects: []
		};
	}
}