exemplo 1
const stdin = process.stdin
.on('data', msg => console.log('entrada terminal', msg.toString()))

const stdout = process.stdout
.on('data', msg => console.log('saida terminal', msg.toString()))

stdin.pipe(stdout)

.on('data')
.on('error')
// .on('end')
// .on('close')
