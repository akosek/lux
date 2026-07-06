import { getPortfolioProjects } from '$lib/server/projects';

export async function load() {
	const projects = await getPortfolioProjects().catch(() => []);
	return {
		projects
	};
}