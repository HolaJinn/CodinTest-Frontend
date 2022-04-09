import { Exercise } from "./Exercise"
import { IUser } from "./User"
export interface TechnicalTest{
    id: number,
    creator: IUser,
    title: string,
    description: string,
    timerInMinute: number,
    exercises?: Array<Exercise>
}