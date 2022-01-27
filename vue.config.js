module.exports = {
    css: {
      loaderOptions: {
        scss: {
          additionalData: `@import "~@/assets/style/Imports.scss";`
        },
      }
    }
  }
module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ?
        '/idalite/' :
        '/'
},
  module.exports = {
  publicPath: '/idalite/'
}