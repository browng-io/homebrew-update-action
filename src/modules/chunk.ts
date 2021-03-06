import axios from 'axios'
import {createHash} from 'crypto'
import CONSTANT from './constant'

export default async function getChunk(
  url: string,
  algorithm = 'sha256'
): Promise<any> {
  if (!url) {
    return CONSTANT.URL_EMPTY
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
