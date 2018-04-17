const config = require('../config/index')
const getFolderNames = require('./get-folder-names')
const {srcPath} = config
let cache = {}

module.exports = function getPathNames (pathName = 'components') {
  return new Promise(async (resolve, reject) => {
    try {
      if (!cache[pathName] || cache[pathName].length === 0) {
        const fileNames = await getFolderNames(`${srcPath}/${pathName}`)
        cache[pathName] = fileNames
        resolve && resolve(fileNames)
      } else {
        resolve && resolve(cache[pathName])
      }
    } catch (e) {
      reject(e)
    }
  })
}
