import {expect, test} from '@jest/globals'
import { repositoryClone } from '../src/modules/repoclone';
import CONSTANT from '../src/modules/constant';

let testCases = [
    {
        name: "OK",
        stub: () => {
            let url = "https://github.com/browng-io/homebrew-update-action"
            return repositoryClone(url)
        },
        check: (promises) => {
            expect(promises).resolves.toEqual(CONSTANT.CLONE_SUCCESS)
        }
    }
]

testCases.forEach(element => {
  test(element.name, () => {
    let promises = element.stub()
    element.check(promises)
  })
})
