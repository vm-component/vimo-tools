const fs = require('fs')

module.exports = async function getFilePathNames (path) {
  return new Promise((resolve, reject) => {
    fs.readdir(path, function (err, files) {
      if (err) {
        reject(err)
        throw err
      }

      // ignore hidden file or private file, eg: .DS_Store / _tmp
      let filterCondition = (fileName) => {
        return fileName.indexOf('.') === -1 && fileName.indexOf('_') !== 0
      }

      // file names
      let componentsFileNames = files.filter((fileName) => filterCondition(fileName))
      resolve && resolve(componentsFileNames)
    })
  })
}
