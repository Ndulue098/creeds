/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns:[
            {   
                protocol:"https",
                hostname:"lh3.googleusercontent.com"
            },
            {   
                protocol:"https",
                hostname:"firebasestorage.googleapis.com"
            },
        ]
    },
  serverActions: {
    bodySizeLimit: '10mb', // or '20mb' if needed
  },
};

export default nextConfig;
/* 
Invalid src prop (https://lh3.googleusercontent.com/a/ACg8ocK5hVWvNooC4K4nnUtsioke5ycLIxYf9BusT_QD0qoB3dCkHMi4=s96-c) on `next/image`, hostname "lh3.googleusercontent.com" is not configured under images in your `next.config.js`

*/