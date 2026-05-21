import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsString,
  IsUUID,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateMovieDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  @IsInt({ message: 'Год должен быть числом' })
  @Min(1900, { message: 'Год должен быть не меньше 1900' })
  @Max(new Date().getFullYear())
  releaseYear: number;

  @IsString()
  @MaxLength(255)
  imageUrl: string;

  @IsArray()
  @IsUUID('4', { each: true })
  actorsIds: string[];
}
