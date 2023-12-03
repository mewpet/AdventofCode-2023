import * as fs from 'fs/promises'

export async function getLines(path: string): Promise<string[]> {
    const fileContent = await fs.readFile(path, 'utf-8')

    const lines: string[] = fileContent.split('\r\n')

    return lines
}