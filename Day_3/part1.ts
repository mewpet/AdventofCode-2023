import { getLines } from '../utils/filereader';

const start = Date.now()

let lineArr: Array<string> = []
let characterArr: Array<Array<string>> = []

async function init() {
    lineArr = await getLines('./Day_3/input.txt')

    lineArr.map(line => {
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
    let numbersAroundCoords: Array<RegMatch> = []
    specialCharCoords.map(coords => {
        findNumbersAroundCoords(coords).map(val => numbersAroundCoords.push(val))
    })

    let calculatedNumbers: Array<RegMatch> = []
    numbersAroundCoords.map((number) => {
        const isDupe = calculatedNumbers.some((mightBeDupe) => {
            mightBeDupe.line === number.line &&
            mightBeDupe.startIndex === number.startIndex
        })
        if(!isDupe){
            calculatedNumbers.push(number)
        }
    })

    let sum = 0
    calculatedNumbers.map(num => sum += Number(num.number))
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

    //Get all numbers of lines around coords
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

    //Filter only relevant number to coord
    let acceptedNumbers: Array<RegMatch> = []
    candidates.map(candidate => {
        for (let i = candidate.startIndex; i < candidate.startIndex + candidate.number.length; i++) {
            if(i >= coords.char - 1 && i <= coords.char + 1) {
                acceptedNumbers.push(candidate)
                break
            }
        }
    })

    return acceptedNumbers
}