import {
  IsArray,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString, IsUrl, IsUUID,
  Length, Matches, MinLength,
} from 'class-validator';
import { StartsWith } from '../decorators/starts-with.decorator';

export enum TaskTag {
  WORK = 'work',
  STUDY = 'study',
  HOME = 'home',
}

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @StartsWith('Task:', {
    message: 'Название задачи должно начинаться с "Task"',
  })
  @Length(2, 30)
  title: string;

  @IsString({ message: 'Описание задачи должно быть строкой' })
  @IsOptional()
  description: string;

  isCompleted: boolean;

  @IsInt({ message: 'Приоритет задачи должен быть целым числом' })
  @IsOptional()
  @IsPositive({ message: 'Приоритет задачи должен быть положительным числом' })
  priority: number;

  @IsArray({ message: 'Теги задачи должны быть массивом строк' })
  @IsEnum(TaskTag, { each: true, message: 'Недопустимое значение тега' })
  @IsOptional()
  tags: TaskTag[];

  // протсо для изучения
  // @IsString()
  // @MinLength(6, { message: 'Пароль должен содержать минимум 6 символов' })
  // @Matches(/^(?=.*[A-Z])(?=.*[0-9]).+$/, {
  //   message: 'Пароль должен содержать одну заглавную букву',
  // })
  // password: string;
  //
  // @IsUrl(
  //   {
  //     protocols: ['https', 'wss', 'http'],
  //     require_port: true,
  //     require_valid_protocol: true,
  //     host_whitelist: ['localhost'],
  //     host_blacklist: ['127.5.5.5'],
  //   },
  //   { message: 'Неккоректный формат юрл' })
  // websiteUrl: string;
  //
  // @IsUUID('4', { message: 'Неккоректный формат' })
  // userId: string;
}
