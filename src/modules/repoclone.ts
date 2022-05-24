import {spawn} from 'child_process'
import CONSTANT from './constant'

async function repositoryClone(url, path = '') {
  return new Promise((resolve, reject) => {
    if (!url) {
      reject(CONSTANT.URL_EMPTY)
    }

    const arrayCommand = `clone ${url} ${path}`.trim().split(' ')

    const listen = spawn(`git`, arrayCommand)

    listen.stdout.on('data', function (a) {
      resolve(CONSTANT.CLONE_SUCCESS)
      return
    })

    listen.on('exit', function () {
      resolve('exited')
      return
    })

    listen.stderr.on('data', function (a) {
      resolve(CONSTANT.CLONE_SUCCESS)
      return
    })
  })
}

export {repositoryClone}
