export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const { getPayload } = await import('payload');
    getPayload({
      config: await import('./payload.config').then((mod) => mod.default),
    });
  }
}
