import { ExerciseStatus } from './../../../models/ExerciseStatus';
import { ExerciseDifficulty } from './../../../models/ExerciceDifficulty';
export interface IExerciseRequest {
    title: string,
    description: string,
    difficulty: ExerciseDifficulty,
    status: ExerciseStatus,
    timerInMinute: Number,
    programmingLanguage: string,
    initialCode: string
}