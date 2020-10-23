const dotenv = require('dotenv').config()
const isLocal = process.env.CUSTOM_NODE_ENV === "local";
const npm_package = require('./package.json')
const withSass = require('@zeit/next-sass')
const path = require('path')

module.exports = withSass({
    sassOptions: {
      includePaths: [path.join(__dirname)],
    },
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
      // Note: we provide webpack above so you should not `require` it
      // Perform customizations to webpack config
      config.plugins.push(new webpack.IgnorePlugin(/\/__tests__\//))
    //   config.resolve.alias = npm_package._moduleAliases
    config.resolve.alias["@Service"]= path.join(__dirname, "services")
    config.resolve.alias["@Views"]= path.join(__dirname, "pages")
    config.resolve.alias["@Styles"]= path.join(__dirname, "pages/styles")
    config.resolve.alias["@Pages"]= path.join(__dirname, "pages/pages")
    config.resolve.alias["@Layouts"]= path.join(__dirname, "pages/layouts")
    config.resolve.alias["@Utils"]= path.join(__dirname, "utils")
    config.resolve.alias["@Components"]= path.join(__dirname, "pages/components")
      // Important: return the modified config
      return config
    },
  })
