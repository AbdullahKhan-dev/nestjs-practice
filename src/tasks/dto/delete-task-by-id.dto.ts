import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteTaskByIdDTO {
  @IsString()
  @IsNotEmpty()
  id: string;
}
