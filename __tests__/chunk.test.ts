import getChunk from './../src/modules/chunk';
import {expect, test} from '@jest/globals'
import { AxiosError } from 'axios';
import { ERROR } from '../src/modules/constant';

let testCases = [
    {
        name: "OK",
        stub: () => {
            return getChunk('https://github.com/9bany/git-switch/releases/download/1.2.0/swgit-macos').then(data => data).catch(err => err)
        },
        check: (data) => {
            expect(data.length).toEqual(64)
        }
    },
    {
        name: "Not found src",
        stub: () => {
            return getChunk('https://github.com/9bany/git-switch/releases/download/1.2.0<not_found>/swgit-macos').then(data => data).catch(err => err)
        },
        check: (data) => {
            expect(typeof data).toBe("object")
            expect(data.code).toEqual(AxiosError.ERR_BAD_REQUEST)
        }
    },
    {
        name: "Invalid url",
        stub: () => {
            return getChunk('').then(data => data).catch(err => err)
        },
        check: (data) => {
            expect(data).toEqual(ERROR.URL_EMPTY)
        }
    }
]


testCases.forEach(element => {
    test(element.name, async () => {
      let data = await element.stub()
      element.check(data)
    })
  })
  