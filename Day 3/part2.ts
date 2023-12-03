import * as fs from 'fs/promises'

const start = Date.now()

let lineArr: Array<string> = []
let characterArr: Array<Array<string>> = []

async function init() {
    const fileContent = await fs.readFile('./Day\ 3/input.txt', 'utf-8');

    const lines: string[] = fileContent.split('\r\n');

    lines.map(line => {
        lineArr.push(line)
        characterArr.push(line.split(''))
    })
}

init().then(() => solve())

let specialMatch = /[^0-9.]+/g
interface Coords {
    content: string,
    line: number,
    char: number
}

function solve() {

    // Find non number character
    let specialCharCoords: Array<Coords> = []
    characterArr.map((line, lineIndex) => {
        line.map((char, charIndex) => {
            if (char.match(specialMatch)) {
                specialCharCoords.push({
                    content: char,
                    line: lineIndex,
                    char: charIndex
                })
            }
        })
    })

    //Find numbers around given coords
    let numbersAroundCoords: Array<Array<RegMatch>> = []
    specialCharCoords.map(coords => {
        let foundNumbers = findNumbersAroundCoords(coords)
        if (foundNumbers.length > 0) 
            numbersAroundCoords.push(foundNumbers)
    })

    let sum = 0
    numbersAroundCoords.map(num => {
        sum += Number(num[0].number) * Number(num[1].number)
    })
    console.log(sum)
    const end = Date.now()
    console.log(`Execution time:  ${end - start} ms`)
}

let numberMatch = /\d+/g
interface RegMatch {
    number: string,
    line: number,
    startIndex: number,
}
function findNumbersAroundCoords(coords: Coords): RegMatch[] {
    if (coords.content !== '*') return []

    //Get all numbers of lines around * coords
    let candidates: Array<RegMatch> = []
    for (let i = -1; i <= 1; i++) {
        let lineIndex = coords.line + i
        if (lineIndex >= 0 && lineIndex <= lineArr.length) {
            let match
            while ((match = numberMatch.exec(lineArr[lineIndex])) !== null) {
                candidates.push({
                    number: match[0],
                    line: lineIndex,
                    startIndex: match.index,
                })
            }
        }
    }

    //Filter only adjacent number to coord
    let acceptedNumbers: Array<RegMatch> = []
    candidates.map(candidate => {
        for (let i = candidate.startIndex; i < candidate.startIndex + candidate.number.length; i++) {
            if(i >= coords.char - 1 && i <= coords.char + 1) {
                acceptedNumbers.push(candidate)
                break
            }
        }
    })

    return acceptedNumbers.length === 2 ? acceptedNumbers : []
}