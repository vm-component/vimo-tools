/**
 * 运行模式
 *
 * demo:dev
 * demo:build
 * ?demo:analysis
 * ?demo:lint
 *
 * site:dev
 * site:build
 * */

const glob = require('glob')
const fs = require('fs')
const _ = require('lodash')
const {projectRoot} = require('../config')
const standard = require('standard')
const getFolderNames = require('../utils/get-folder-names')
const rootPath = `${projectRoot}/demo/src/components`

/**
 * 读取 demo/src/components/*.vue 中的文件生成 route.js 路由文件
 * */
function writeFile (_res) {
  return new Promise((resolve, reject) => {
    const _distRouteFilePath = `${projectRoot}/demo/src/router/route.js`
    fs.createWriteStream(_distRouteFilePath)
    fs.writeFile(_distRouteFilePath, _res, function (err) {
      if (err) {
        reject(err)
        throw err
      }
      resolve && resolve(_res)
    })
  })
}

async function generateRouteFile () {
  const rootComponentInfo = await getSubComponentInfo()

  const _fileNotice = `/** this file is generate automatic! */\n`
  const _fileStart = `${_fileNotice}export default [`
  const _fileEnd = `]`
  const _fileContent = []

  rootComponentInfo.forEach(item => {
    let _content = ''
    if (item.children) {

      const _children = item.children.map((child) => {

        return `
                    {
                        path: '${child.fileName === 'index' ? '' : child.fileName}',
                        name: '${item.fullName}.${child.fullName}',
                        component(resolve) {
                            require(['@DemoComponent${child.relativePath}/${child.fileFullName}'], resolve)
                        }
                    }
            `
      })

      _content = `
                    {
                        path: '/${item.fileName}',
                        name: '${item.fullName}',
                        component(resolve) {
                            require(['@DemoComponent${item.relativePath}/${item.fileFullName}'], resolve)
                        },
                        children: [${_children.join(',')}]
                    }
            `

    } else {
      _content = `
                    {
                        path: '/${item.fileName}',
                        name: '${item.fullName}',
                        component(resolve) {
                            require(['@DemoComponent${item.relativePath}/${item.fileFullName}'], resolve)
                        }
                    }
            `
    }

    _fileContent.push(_content)
  })

  const _resRaw = `${_fileStart}${_fileContent.join(',')}${_fileEnd}`
  const _res = standard.lintTextSync(_resRaw, {fix: true}).results[0].output

  await writeFile(_res)
}

function getComponentInfo (path) {
  return new Promise((resolve, reject) => {
    const componentFilePath = `${path}/*.vue`
    glob(componentFilePath, {}, (err, files) => {
      if (err) {
        reject(err)
        throw err
      }

      let _res = files.map(item => {
        const fileFullName = item.split('/').slice(-1)[0]
        const fullName = _.camelCase(fileFullName.split('.')[0])

        const relativePath = path.substr(rootPath.length)
        return {
          path: path,
          relativePath: relativePath, // 和root对比, ''
          filePath: item,
          fileName: fileFullName.split('.')[0],
          fileFullName: fileFullName,
          fullName: fullName
        }
      })
      resolve(_res)
    })
  })
}

async function getSubComponentInfo () {
  const rootComponentInfo = await getComponentInfo(rootPath)
  return new Promise((resolve) => {
    getFolderNames(rootPath).then(async folderNames => {

      const _tmp = {}
      for (let folderName of folderNames) {
        const _info = await getComponentInfo(`${rootPath}/${folderName}`)
        _tmp[_.camelCase(folderName)] = _info
      }

      rootComponentInfo.forEach(item => {
        const _fullName = _tmp[item['fullName']]
        if (_fullName) {
          item.children = _fullName
        }
      })

      resolve(rootComponentInfo)
    })
  })
}

exports.demoDev = async function () {
  await generateRouteFile()
  require('./build/dev-server')
}

exports.demoBuild = async function () {
  await generateRouteFile()
  require('./build/build')
}
