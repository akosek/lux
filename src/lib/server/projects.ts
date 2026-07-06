import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import mammoth from 'mammoth';

export type ProjectCategory = 'Performance' | 'Costume Design';

export type PortfolioProject = {
	category: ProjectCategory;
	folderName: string;
	title: string;
	slug: string;
	year: string;
	description: string;
	fullDescription: string[];
	coverImage: string;
	galleryImages: string[];
};

type SourceConfig = {
	category: ProjectCategory;
	rootFsPath: string;
	rootPublicPath: string;
	slugPrefix: string;
	folderFilter: (name: string) => boolean;
	titleFromFolder: (name: string) => string;
};

const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif', '.gif', '.JPG', '.JPEG', '.PNG']);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const staticImagesRoot = path.join(__dirname, '../../..', 'static', 'media', 'images');

const sources: SourceConfig[] = [
	{
		category: 'Performance',
		rootFsPath: path.join(staticImagesRoot, 'performance'),
		rootPublicPath: '/media/images/performance',
		slugPrefix: '',
		folderFilter: (name) => name.startsWith('project_'),
		titleFromFolder: (name) => name.replace(/^project_/i, '').replaceAll('_', ' ').trim()
	},
	{
		category: 'Costume Design',
		rootFsPath: path.join(staticImagesRoot, 'costume'),
		rootPublicPath: '/media/images/costume',
		slugPrefix: 'costume',
		folderFilter: (name) => !name.startsWith('.'),
		titleFromFolder: (name) => name.replaceAll('_', ' ').trim()
	}
];

const performanceMetadataByFolder: Record<string, { year: string; description: string; fullDescription: string[] }> = {
	project_GEWEBE: {
		year: '2024',
		description: 'A site-specific performance exploring states of in-between.',
		fullDescription: [
			'GEWEBE explores transformation through contortion, projection, and fragmented movement. The piece moves between softness and strain, investigating how identity stretches under pressure.',
			'Visual texture, body architecture, and spatial tension are composed into a physical score where each image feels like a living thread in a larger fabric.'
		]
	},
	'project_Human Nature': {
		year: '2024',
		description: 'A performance study of instinct, vulnerability, and collective movement.',
		fullDescription: [
			'Human Nature is built around the tension between primal impulse and social choreography. Bodies gather, split, and reorganize in constantly shifting patterns.',
			'The work creates a visual dialogue between animality and ritual, asking what remains when performance is stripped back to breath, rhythm, and contact.'
		]
	},
	'project_Mushroom Tales': {
		year: '2023',
		description: 'A creature-based performance blending fantasy, ecology, and movement theatre.',
		fullDescription: [
			'Mushroom Tales creates a speculative ecosystem where performers inhabit hybrid, more-than-human figures. Movement language is grounded, curious, and constantly mutating.',
			'The piece blends visual art and choreography into a playful yet uncanny world that invites the audience to imagine new forms of connection with nature.'
		]
	},
	'project_Six Pieces': {
		year: '2023',
		description: 'A sequence of six connected movement studies.',
		fullDescription: [
			'Six Pieces unfolds as a modular dance structure where each section has a distinct kinetic quality, while still feeding into a shared emotional arc.',
			'Precision and improvisation alternate throughout the work, creating moments of both control and rupture.'
		]
	},
	'project_The Quest of the Lost': {
		year: '2023',
		description: 'A performative journey through memory, ritual, and displacement.',
		fullDescription: [
			'The Quest of the Lost follows a body in search of orientation through unfamiliar terrain. Repetition, interruption, and symbolic actions shape the narrative language.',
			'The work balances mythic atmosphere with intimate gestures, inviting viewers into a shared process of searching.'
		]
	},
	'project_Threads of Connection': {
		year: '2025',
		description: 'A live exploration of touch, resistance, and relational choreography.',
		fullDescription: [
			'Threads of Connection investigates how bodies negotiate closeness: pulling, yielding, and reconfiguring relationships through movement.',
			'The choreography treats space as a responsive fabric where each action leaves a trace in the collective composition.'
		]
	},
	'project_UNDINI Uncut': {
		year: '2024',
		description: 'A theatrical performance with strong costume and character transformation.',
		fullDescription: [
			'UNDINI Uncut fuses performance and costume design into a visually bold stage language. Characters are shaped through silhouette, texture, and physical score.',
			'Costume acts as dramaturgy: not decoration, but an active force that changes posture, rhythm, and presence.'
		]
	},
	project_Uncomfortable: {
		year: '2022',
		description: 'A physical performance centered on pressure, intimacy, and unease.',
		fullDescription: [
			'Uncomfortable explores social and bodily discomfort as a productive choreographic force. Gestures begin familiar, then drift toward friction and rupture.',
			'The work invites the audience to stay with vulnerability rather than resolve it too quickly.'
		]
	},
	'project_misc performances': {
		year: '2022',
		description: 'A selection of additional live performance works and fragments.',
		fullDescription: [
			'This collection presents moments from various performances, tracing recurring themes across different contexts and collaborations.',
			'Together, these images form an expanded portrait of process, experimentation, and stage presence.'
		]
	}
};

function slugFromTitle(title: string) {
	return title
		.normalize('NFKD')
		.replace(/[\u0300-\u036f]/g, '')
		.toLowerCase()
		.replace(/[^a-z0-9\s-]/g, '')
		.trim()
		.replace(/\s+/g, '-');
}

function toPublicImageUrl(rootPublicPath: string, folderName: string, relativeFilePath: string) {
	const normalizedRelativePath = relativeFilePath.split(path.sep).join('/');
	return encodeURI(`${rootPublicPath}/${folderName}/${normalizedRelativePath}`);
}

async function collectFilesRecursive(rootFolder: string, relativeFolder = ''): Promise<string[]> {
	const currentFolder = path.join(rootFolder, relativeFolder);
	const entries = await fs.readdir(currentFolder, { withFileTypes: true });
	const files: string[] = [];

	for (const entry of entries) {
		if (entry.name.startsWith('.')) continue;
		const relativePath = path.join(relativeFolder, entry.name);
		if (entry.isDirectory()) {
			files.push(...(await collectFilesRecursive(rootFolder, relativePath)));
		} else if (entry.isFile()) {
			files.push(relativePath);
		}
	}

	return files;
}

async function getProjectImages(source: SourceConfig, folderName: string) {
	const projectFolder = path.join(source.rootFsPath, folderName);
	const files = await collectFilesRecursive(projectFolder);

	const imageFiles = files
		.filter((filePath) => IMAGE_EXTENSIONS.has(path.extname(filePath)))
		.sort((a, b) => a.localeCompare(b));

	return imageFiles.map((relativePath) => ({
		relativePath,
		fileName: path.basename(relativePath),
		url: toPublicImageUrl(source.rootPublicPath, folderName, relativePath)
	}));
}

async function getProjectDocxParagraphs(source: SourceConfig, folderName: string) {
	const projectFolder = path.join(source.rootFsPath, folderName);
	const files = await collectFilesRecursive(projectFolder);

	const docxFiles = files
		.filter((filePath) => filePath.toLowerCase().endsWith('.docx') && !path.basename(filePath).startsWith('~$'))
		.sort((a, b) => a.localeCompare(b));

	if (docxFiles.length === 0) {
		return [];
	}

	const docxPath = path.join(projectFolder, docxFiles[0]);

	try {
		const result = await mammoth.extractRawText({ path: docxPath });
		const paragraphs = result.value
			.replaceAll('\r', '')
			.split(/\n{2,}/)
			.map((part) => part.trim())
			.filter(Boolean);

		return paragraphs;
	} catch {
		return [];
	}
}

function defaultCopy(category: ProjectCategory, title: string) {
	return {
		year: 'Ongoing',
		description: `${category} project: ${title}.`,
		fullDescription: [
			`${title} is part of Lux Ulonska's ${category.toLowerCase()} practice focused on movement, visual language, and character detail.`,
			'This project page will be extended with additional context, collaborators, and process notes.'
		]
	};
}

export async function getPortfolioProjects() {
	const projects: PortfolioProject[] = [];

	for (const source of sources) {
		const entries = await fs.readdir(source.rootFsPath, { withFileTypes: true });
		const projectFolders = entries
			.filter((entry) => entry.isDirectory() && source.folderFilter(entry.name))
			.map((entry) => entry.name)
			.sort((a, b) => a.localeCompare(b));

		for (const folderName of projectFolders) {
			const title = source.titleFromFolder(folderName);
			const baseSlug = slugFromTitle(title);
			const slug = source.slugPrefix ? `${source.slugPrefix}-${baseSlug}` : baseSlug;
			const images = await getProjectImages(source, folderName);
			const docxParagraphs = await getProjectDocxParagraphs(source, folderName);
			if (images.length === 0) continue;

			const cover = images.find((image) => image.fileName.toLowerCase().startsWith('main')) ?? images[0];
			const galleryImages = images.map((image) => image.url).filter((url) => url !== cover.url);

			const fallback =
				source.category === 'Performance'
					? (performanceMetadataByFolder[folderName] ?? defaultCopy(source.category, title))
					: defaultCopy(source.category, title);

			projects.push({
				category: source.category,
				folderName,
				title,
				slug,
				year: fallback.year,
				description: docxParagraphs[0] ?? fallback.description,
				fullDescription: docxParagraphs.length > 0 ? docxParagraphs : fallback.fullDescription,
				coverImage: cover.url,
				galleryImages: [cover.url, ...galleryImages]
			});
		}
	}

	return projects.sort((a, b) => {
		const yearA = Number.parseInt(a.year, 10);
		const yearB = Number.parseInt(b.year, 10);
		const safeYearA = Number.isFinite(yearA) ? yearA : 0;
		const safeYearB = Number.isFinite(yearB) ? yearB : 0;
		if (safeYearA !== safeYearB) return safeYearB - safeYearA;
		return a.title.localeCompare(b.title);
	});
}

export async function getPortfolioProjectBySlug(slug: string) {
	const projects = await getPortfolioProjects();
	return projects.find((project) => project.slug === slug);
}