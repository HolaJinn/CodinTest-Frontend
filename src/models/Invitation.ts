import { Company } from './Company';
import { InvitationState } from "./InvitationState";
import { IUser } from "./User";

export interface Invitation {
    id: number,
    invitedBy: IUser,
    candidateEmail: string,
    technicalTestId: number,
    subject: string,
    expirationDate: string,
    state: InvitationState,
    rating: number,
    company: Company,
    createdDate: string
}