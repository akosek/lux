import { getPortfolioProjects } from './src/lib/server/projects.ts';
import fs from 'fs/promises';

const projects = await getPortfolioProjects();
await fs.writeFile('./src/lib/server/projects.json', JSON.stringify(projects, null, 2));
console.log('Projects data generated');
