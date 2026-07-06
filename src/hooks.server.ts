import type { Handle } from '@sveltejs/kit';

const IMMUTABLE_MEDIA_CACHE = 'public, max-age=31536000, immutable';
const mediaAssetPattern = /\.(?:avif|webp|png|jpe?g|gif|svg|mp4|webm|mov)$/i;

export const handle: Handle = async ({ event, resolve }) => {
	const response = await resolve(event);
	const { pathname } = event.url;

	if (pathname.startsWith('/media/') && mediaAssetPattern.test(pathname)) {
		response.headers.set('cache-control', IMMUTABLE_MEDIA_CACHE);
	}

	return response;
};
