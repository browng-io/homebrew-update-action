import axios from 'axios'
import {createHash} from 'crypto'
import {resolve} from 'path'
import {ERROR} from './constant'
import execa from 'execa'
import * as github from '@actions/github'

async function clone(tapRepo: string, token: string): Promise<any> {
  const octokit = github.getOctokit(token)
  const user = await octokit.rest.users.getAuthenticated()

  const userName: string = user.data.login
  const tmpDir = resolve(__dirname, 'tmp')

  await execa(
    'git',
    ['clone', `https://${userName}:${token}@github.com/${tapRepo}.git`],
    {cwd: tmpDir}
  )
}

async function push(
  brewRepoDir: any,
  formulaPath: any,
  version: string
): Promise<void> {
  for (const args of [
    ['add', formulaPath],
    ['commit', '-m', `update to ${version}`],
    ['tag', version],
    ['push'],
    ['push', '--tags']
  ]) {
    await execa('git', args, {cwd: brewRepoDir})
  }
}

export {clone, push}
