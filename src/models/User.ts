import { Role } from "./Role";
import { UserState } from "./UserState";

  export interface IUser {
    firstName: string,
    lastName: string,
    email: string,
    photoUrl: string,
    userState: UserState,
    verified: boolean,
    role: Role
  }