/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    endpoint: process.env.endpoint,
    organizationEmployeeId: process.env.organizationEmployeeId,
    organizationId: process.env.organizationId,
  },
};

export default nextConfig;
