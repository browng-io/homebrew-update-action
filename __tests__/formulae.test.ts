import { readFormulae } from './../src/modules/formulae';
import { ERROR } from './../src/modules/constant';
import { expect, test } from '@jest/globals'
import { resolve } from 'path';

let testcases = [
    {
        name: "OK",
        stub: () => {
            return readFormulae(resolve(__dirname, 'tmp/swgit.rb')).then(data => data).catch(err => err) 
        },
        check: (data: any) => {
            expect(data).toBeInstanceOf(Function)
            expect(data).not.toBeNull()
        }
    },
    {
        name: "Path file invalid '' ",
        stub: () => {
            return readFormulae('').then(data => data).catch(err => err) 
        },
        check: (err: any) => {
            expect(typeof err).toBe("string")
            expect(err).toEqual(ERROR.FILE_PATH_EMPTY)
        }
        
    },
    {
        name: "File not found",
        stub: () => {
            return readFormulae(resolve(__dirname, 'tmp/swgit<not_found>.rb')).then(data => data).catch(err => err) 
        },
        check: (err: any) => {
            expect(typeof err).toBe("string")
            expect(err).toEqual(ERROR.CANNOT_READ_FILE)
        }
    },
]

testcases.forEach((element) => {
    test(element.name, async () => {
        let data = await element.stub()
        element.check(data)
    })
})