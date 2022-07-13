import { IsNotEmpty } from 'class-validator';

export class UpdateTaskDescription {
  @IsNotEmpty()
  description: string;
}
