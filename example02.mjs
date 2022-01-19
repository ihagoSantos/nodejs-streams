// exemplo 2
// node -e "process.stdout.write(crypto.randomBytes(1e9))" > big.file
// curl localhost:3000 --output output.txt

import http from 'http'
import { readFileSync, createReadStream } from 'fs'

http.createServer((req, res) => {
    // const file = readFileSync('big.file')//.toString()
    // res.write(file)
    // res.end()

    
    createReadStream('big.file')
        .pipe(res)
}).listen(3000, () => console.log('running at 3000'))
