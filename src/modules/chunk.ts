import axios from 'axios'
import {createHash} from 'crypto'
import {ERROR} from './constant'
import {find} from 'lodash'
async function getChunk(url: string, algorithm = 'sha256'): Promise<any> {
  if (!url) {
    return ERROR.URL_EMPTY
  }
  const response = await axios({
    method: 'GET',
    url,
    responseType: 'stream'
  })

  return new Promise((resolve, reject) => {
    const hash = createHash(algorithm)

    response.data.on('data', chunk => {
      hash.update(chunk)
    })

    response.data.on('end', () => {
      resolve(hash.digest('hex'))
    })

    response.data.on('error', reject)
  })
}

async function getNameFileRuby(octokit: any, srcRepo: string): Promise<string> {
  const contents = await octokit.request(`GET /repos/${srcRepo}/contents`)
  const fileRuby = find(contents.data, content => {
    const fileName = content.name.split('.')
    return fileName[fileName.lengh - 1] === 'rb'
  })
  return fileRuby.name
}

export {getChunk, getNameFileRuby}
