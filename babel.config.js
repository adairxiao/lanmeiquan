module.exports = {
  presets: ['@vue/cli-plugin-babel/preset'],
  plugins: [
    // vant按需引入
    ['import', {
      libraryName: 'vant',
      style: true
    }, 'vant']
  ]
}
