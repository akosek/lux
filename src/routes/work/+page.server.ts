import { getPortfolioProjects } from '$lib/server/projects';

export async function load() {
	return {
		projects: await getPortfolioProjects()
	};
}