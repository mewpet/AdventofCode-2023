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

    const matchNum = /(?=(one|two|three|four|five|six|seven|eight|nine|\d))/g
    lineArr.map((line) => {
        let lineVal: string = ''
        const lineNumberArr = Array.from(line.matchAll(matchNum), match => match[1] || match[0]);

        lineVal = stringToNumber(lineNumberArr[0]) + stringToNumber(lineNumberArr[lineNumberArr.length - 1])
        
        sum += Number(lineVal)
    })

    console.log(sum)
    const end = Date.now()
    console.log(`Execution time:  ${end - start} ms`)
}

function stringToNumber(string: string): string {
    switch (string) {
        case 'one':
            return '1'
            break
        case 'two':
            return '2'
            break
        case 'three':
            return '3'
            break
        case 'four':
            return '4'
            break
        case 'five':
            return '5'
            break
        case 'six':
            return '6'
            break
        case 'seven':
            return '7'
            break
        case 'eight':
            return '8'
            break
        case 'nine':
            return '9'
            break
        default:
            return string
    }
}