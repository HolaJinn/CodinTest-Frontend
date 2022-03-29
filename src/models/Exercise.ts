import { ProgrammingLanguage } from './ProgrammingLanguage';
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
    programmingLanguage: ProgrammingLanguage,
    initialCode: string
    // "company": {
    //     "id": 1,
    //     "name": "Facebook",
    //     "country": "US",
    //     "subscriptionDurationInDays": 14,
    //     "active": true
    // },
    // "testCases": null,
    // "tags": null
}