import { ExecutionStatus } from './ExercutionStatus';
export interface ExecutionResult {
    stdout: string;
    time: string;
    memory: string;
    stderr: string;
    token: string;
    compileOutput: string;
    message: string;
    status: ExecutionStatus
}