import { ExerciseStatus } from './../../../models/ExerciseStatus';
import { ExerciseDifficulty } from './../../../models/ExerciceDifficulty';
import { TechnicalTest } from '../../../models/TechnicalTest';
export interface IExerciseRequest {
    title: string,
    description: string,
    difficulty: ExerciseDifficulty,
    status: ExerciseStatus,
    timerInMinute: Number,
    tags: number[]
}

export interface IInitialCodeRequest {
    exerciseId: number,
    programmingLanguage: string,
    initialCode: string
}

export interface ITestCaseRequest {
    exerciseId: number,
    name: string,
    score: number,
    isSample: boolean,
    input: string,
    expectedOutput: string
}

export interface ITechnicalTestRequest {
    title: string,
    description: string,
    timerInMinute: number
}

export interface IAddExercisesToTechnicalTest {
    technicalTestId: number,
    exercises: number[]
}

export interface TechnicalTestItem extends TechnicalTest {
    key: React.Key;
}

export interface IInvitationRequest {
    technicalTestId: number,
    candidateEmail: string,
    expirationDate: string,
    subject: string,
    content: string
}