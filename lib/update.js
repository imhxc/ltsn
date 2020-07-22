/**
 * 数据源的获取和更新相关功能代码
 */
const axios = require('axios')
const compareVersions = require('compare-versions')

const NODE_JSON_URL = 'https://nodejs.org/dist/index.json';

module.exports = async (v) => {
  const { data } = await axios.get(NODE_JSON_URL);

  // 把目标版本的 LTS 都挑选出来
  return data.filter(node => {
    const cp = v ? (compareVersions(node.version, `v${v}.0.0`) >= 0) : true;

    return node.lts && cp
  }).map(it => {
    const { files, ...rest } = it;
    return {
      ...rest
    }
  })
}