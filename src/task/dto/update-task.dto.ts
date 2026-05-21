import { IsBoolean, IsNotEmpty, IsString, Length } from 'class-validator';

export class UpdateTaskDto {
  @IsString({ message: 'Название задачи должно быть строкой' })
  @IsNotEmpty({ message: 'Название задачи не может быть пустым' })
  @Length(2, 30, {
    message: 'Название задачи должно содержать от 2 до 30 символов',
  })
  title: string;

  @IsBoolean({ message: 'Статус задачи должен быть булевым значением' })
  isCompleted: boolean;
}