import { ExecutionStatus } from './ExecutionStatus';
export interface ExecutionResult {
    stdout: string;
    time: string;
    memory: string;
    stderr: string;
    token: string;
    compile_output: string;
    message: string;
    status: ExecutionStatus
}