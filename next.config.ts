import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images:{
    dangerouslyAllowSVG: true,
    remotePatterns:[
      {
        protocol: 'https',
        hostname: '*',
      },
    ]
  },
  typescript :{
    ignoreBuildErrors : true
  },
  eslint :{
    ignoreDuringBuilds : true,
  },
  experimental: {
    ppr : 'incremental',
  },
  devIndicators :{
    appIsrStatus : true , 
    buildActivity : true , 
    buildActivityPosition : "bottom-right"
  }
};

export default nextConfig;
