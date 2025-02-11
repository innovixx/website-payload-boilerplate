import { withPayload } from '@payloadcms/next/withPayload';

const nextConfig = {
  output: 'standalone',
  assetPrefix: '/admin',
};

export default withPayload(nextConfig);
