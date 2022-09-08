const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,

  pwa: {
    name: "Panel pytania.ucze.net",
    themeColor: "#ffd100",
    GenerateSW: true
  }
})
