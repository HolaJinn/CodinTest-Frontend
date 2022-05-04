export interface TestCase{
    id: number,
    exerciseId: number,
    name: string,
    score: number,
    sample: boolean,
    input: string,
    expectedOutput: string
}