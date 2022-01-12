module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  publicPath: process.env.BUILD_FOR === 'github'
    ? '/package-info/'
    : '/'
}
