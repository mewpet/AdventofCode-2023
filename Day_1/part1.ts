import { getLines } from '../utils/filereader'

const start = Date.now()

let lineArr: Array<string> = []
let characterArr: Array<Array<string>> = []

async function init() {
    lineArr = await getLines('./Day_1/input.txt')

    lineArr.map(line => {
        characterArr.push(line.split(''))
    })
}

init().then(() => solve())

function solve() {
    let sum = 0

    const matchNum = /\d/g
    lineArr.map((line, index) => {
        let lineVal: string = ''
        for(let i = 0; i < line.length; i++) {
            let match = characterArr[index][i].match(matchNum)
            if(match !== null) {
                lineVal += match
                break;
            }
        }
        for(let i = line.length - 1; i >= 0; i--) {
            let match = characterArr[index][i].match(matchNum)
            if(match !== null) {
                lineVal += match
                break;
            }
        }
        sum += Number(lineVal)
    })

    console.log(sum)
    const end = Date.now()
    console.log(`Execution time:  ${end - start} ms`)
}