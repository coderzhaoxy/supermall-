/*
 * @Author: your name
 * @Date: 2021-07-08 13:06:49
 * @LastEditTime: 2021-07-13 11:55:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \pramall\postcss.config.js
 */
module.exports = {
    plugins: {
        "postcss-px-to-viewport": {
          viewportWidth: 320,
          viewHeight:667,
          unitPrecision: 5,
          viewportUnit: 'vw',
          minPixelValue: 1,
          mediaQuery: false,
          // selectorBlackList: ['ignore'],//'tab-bar'
        //   exclude:[/Home/]
        }
      }
}
