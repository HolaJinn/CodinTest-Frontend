import { ExerciseDifficulty } from './ExerciceDifficulty';
import { ExerciseStatus } from './ExerciseStatus';

export interface Exercise {
    id: number,
    creatorId: number,
    title: string,
    description: string,
    difficulty: ExerciseDifficulty,
    status: ExerciseStatus,
    timerInMinute: number,
    programmingLanguageName: string,
    initialCode: string,
    createdDate: string
}