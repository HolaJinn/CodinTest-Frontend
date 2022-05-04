import { Exercise } from "../../../models/Exercise";
import { Invitation } from "../../../models/Invitation";

export interface IInvitationItem extends Invitation {
    key: React.Key
}

export interface ExerciseItem extends Exercise {
    key: React.Key;
  }