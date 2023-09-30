/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    esmExternals: 'loose',
  }
}

const withTM = require('next-transpile-modules')(['metaphor-node']); // pass the modules you would like to see transpiled

module.exports = withTM({});
module.exports = nextConfig
