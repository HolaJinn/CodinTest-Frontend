export interface TestCase{
    id: number,
    exerciseId: number,
    name: string,
    score: number,
    isSample: boolean,
    input: string,
    expectedOutput: string
}