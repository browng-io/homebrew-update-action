import handlebars from 'handlebars'
import {ERROR} from './constant'
import {readFile} from 'fs-extra'
import {getChunk} from './chunk'
import {find} from 'lodash'

async function updateFormulae(
  template: any,
  octokit: any,
  repo: string
): Promise<any> {
  if (!repo) {
    return ERROR.FILE_PATH_EMPTY
  }
  try {
    const latestRelease = await octokit.request(
      `GET /repos/${repo}/releases/latest`
    )
    const version = latestRelease.data.tag_name
    const releaseId = latestRelease.data.id

    const assets = await octokit.request(
      `GET /repos/${repo}/releases/${releaseId}/assets`
    )

    const tarballUrl = find(assets.data, a =>
      a.name.includes('macos')
    ).browser_download_url

    const sha256 = await getChunk(tarballUrl, 'sha256')

    return {
      formulae: template({
        version,
        tarballUrl,
        sha256
      }),
      version
    }
  } catch (error) {
    return ERROR.CANNOT_READ_FILE
  }
}
/**
 * Read ruby path file
 * @param {string}  path_file : your formilae path file
 * @returns {function} : templete ruby file from `handlebars` complie
 */
async function readFormulae(path_file: string): Promise<any> {
  if (!path_file) {
    return ERROR.FILE_PATH_EMPTY
  }
  try {
    const templateString = (await readFile(path_file)).toString()
    return handlebars.compile(templateString)
  } catch (error) {
    return ERROR.CANNOT_READ_FILE
  }
}

export {updateFormulae, readFormulae}
