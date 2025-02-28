import { withPayload } from '@payloadcms/next/withPayload';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	output: 'standalone',
	assetPrefix: '/admin',
};

export default withPayload(nextConfig);
