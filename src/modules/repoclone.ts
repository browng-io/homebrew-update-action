import { spawn } from 'child_process';
import CONSTANT from './constant';

function repositoryClone(url, path = '') {
    return new Promise((resolve, reject) => {  
        
        if(!url) { reject(CONSTANT.URL_EMPTY) }

        let arrayCommand = `clone ${url} ${path}`.trim().split(" ")
        
        var listen = spawn(`git`, arrayCommand);

        listen.stdout.on('data', function(a) {
            resolve(CONSTANT.CLONE_SUCCESS)
            return;
        });
    
        listen.on('exit',function() {
            resolve('exited')
            return;
        })
    
        listen.stderr.on('data',function(a) {
            resolve(CONSTANT.CLONE_SUCCESS)
            return;
        });
    })
}

export {
    repositoryClone
}