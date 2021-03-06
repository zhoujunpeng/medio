const Shell = require('shelljs');
const Webpack = require('webpack');
const Utils = require('@libs/utils');
const Paths = require('@config/common/path');

/**
 * @private
 * @function cleanAndCreate 清理输出目录
 */
function cleanAndCreate(){
  Utils.Log.Loading(new Promise(resolve => {
    Shell.rm('-rf',Paths.STATIC_COUTPUT_PATH);
    Shell.mkdir('-p',Paths.STATIC_COUTPUT_PATH);
    resolve({
      msg: 'Cleaning prebuilt files -> done\n'
    });
  }),'Cleaning prebuilt files...\n');
}

/**
 * @private
 * @function run 执行build
 * @param {Object} config webpack配置
 * @param {Function|null|undefined} callback 回调函数
 */
function run(config,callback=null){
  Utils.Log.Loading(new Promise(resolve => {
    Webpack(config,(err, stats) => {
      if (err) {
        throw err;
      }
      resolve({
        msg: 'Building static files -> done\n',
        data: stats
      });
    });
  }),'Building static files...\n',callback);
}

/**
 * @private
 * @function print 打印build结果
 * @param {Object} stats build结果
 */
function print(stats){
  new Promise((resolve,reject) => {
    if (!stats||stats.hasErrors()) {
      reject(stats&&stats.toJson().errors||'Build failed');
    }
  
    resolve(process.stdout.write(stats.toString({
      assets       : true,
      colors       : true,
      errors       : true,
      timings      : true,
      warning      : true,
      children     : true,
      performance  : true,
      hash         : false,
      chunks       : false,
      version      : false,
      builtAt      : false,
      modules      : false,
      entrypoints  : false,
      moduleTrace  : false,
      chunkModules : false
    })+'\n'));
  }).catch(err => {
    Utils.Log.Error(err);
  });
}

module.exports = async webpackConfig =>{
  await cleanAndCreate();
  await run(webpackConfig,print);
};