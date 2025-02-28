export async function register(): Promise<void> {
	if (process.env.NEXT_RUNTIME === 'nodejs') {
		const { getPayload } = await import('payload');
		await getPayload({
			config: await import('./payload.config').then(async (mod) => mod.default),
		});
	}
}
