import * as core from '@actions/core'
import * as github from '@actions/github'
import {resolve} from 'path'
import {clone, push} from './modules/github'
import {readFormulae, updateFormulae} from './modules/formulae'
import {ensureDir, pathExists, readFile, remove, writeFile} from 'fs-extra'
import {getNameFileRuby} from './modules/chunk'

async function run(): Promise<void> {
  try {
    const token: string = core.getInput('token')
    const tapRepo: string = core.getInput('tap_repo')
    const templatePath: string = core.getInput('template_path')
    const srcRepo: string = core.getInput('src_repo')

    const octokit = github.getOctokit(token)

    const template = readFormulae(templatePath)

    const {formulae, version} = await updateFormulae(template, octokit, srcRepo)

    clone(tapRepo, token)

    const brewRepoDir = resolve('./', tapRepo.split('/')[1], './brewRepo')
    if (await pathExists(brewRepoDir)) {
      await remove(brewRepoDir)
    }

    const formulaDir = resolve(brewRepoDir, 'Formula')
    await ensureDir(formulaDir)

    const fileName = await getNameFileRuby(octokit, srcRepo)

    const formulaPath = resolve(formulaDir, fileName)

    const existingFormula = (await pathExists(formulaPath))
      ? (await readFile(formulaPath)).toString()
      : ''

    if (formulae !== existingFormula) {
      await writeFile(formulaPath, formulae)
    }

    push(brewRepoDir, formulaPath, version)
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
