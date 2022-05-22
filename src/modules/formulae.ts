import handlebars from 'handlebars'
import {ERROR} from './constant'
import {readFile} from 'fs-extra'

function updateFormulae(): boolean {
  return true
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
