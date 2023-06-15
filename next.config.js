/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  // we added this
  images: {
    domains: [
      "avatars.githubusercontent.com" /**this helps us to be able to upload frofile image from github */,
      "lh3.googleusercontent.com" /**this helps us to be able to upload profile image from google */,
      "res.cloudinary.com" /**this helps us to be able to upload image from cloudinary */,
    ],
  },
};

module.exports = nextConfig;
