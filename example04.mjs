import { pipeline, Readable, Writable } from 'stream'
import { promisify } from 'util'

const pipelineAsync = promisify(pipeline)

// readable stream (fonte de dados)
const readableStream = Readable({
    read: function () {
        this.push("Hello Dude!! #0")
        this.push("Hello Dude!! #1")
        this.push("Hello Dude!! #2")
        this.push(null)
    }
})

// criando writable stream personalizado
const writableStream = Writable({
    write (chunk, encoding, callback) {
        console.log('msg', chunk.toString())
        callback()
    }
})

await pipelineAsync(
    readableStream,
    // process.stdout // writableStream
    writableStream
)

console.log('Process acabou')