import {spawn} from 'child_process'
import CONSTANT from './constant'

async function repositoryClone(url, path = ''): Promise<any> {
  return new Promise((resolve, reject) => {
    if (!url) {
      reject(CONSTANT.URL_EMPTY)
    } else {
      const arrayCommand = `clone ${url} ${path}`.trim().split(' ')

      const listen = spawn(`git`, arrayCommand)

      listen.stdout.on('data', function () {
        resolve(CONSTANT.CLONE_SUCCESS)
      })

      listen.on('exit', function () {
        resolve('exited')
      })

      listen.stderr.on('data', function () {
        resolve(CONSTANT.CLONE_SUCCESS)
      })
    }
  })
}

export {repositoryClone}
