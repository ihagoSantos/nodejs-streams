import { pipeline, Readable, Writable, Transform } from 'stream'
import { promisify } from 'util'
import { createWriteStream } from 'fs'
const pipelineAsync = promisify(pipeline)

const readableStream = Readable({
    read () {
        for(let index = 0; index < 1e5; index++) {
            const person = { id: Date.now() + index, name: `Ihago-${index}` }
            const data = JSON.stringify(person)
            this.push(data)
        }

        // avisa que acabou os dados
        this.push(null)
    }
})

const writableMapToCSV = Transform({
    transform (chunk, encoding, callback) {
        const data = JSON.parse(chunk)
        const result = `${data.id},${data.name.toUpperCase()}\n`

        callback(null, result)
    }
})

const setHeader = Transform({
    transform(chunk, encoding, callback) {
        this.counter = this.counter ?? 0
        if(this.counter > 0){
            return callback(null, chunk)
        }

        this.counter += 1
        
        callback(null, "id,name\n".concat(chunk))
    }
}) 

await pipelineAsync(
    readableStream,
    writableMapToCSV,
    setHeader,
    // process.stdout // writableStream
    createWriteStream('my.csv') // writableStream
)

console.log('Process acabou')