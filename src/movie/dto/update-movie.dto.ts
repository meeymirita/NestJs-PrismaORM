import {
  IsArray,
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString, IsUUID,
  Max,
  Min,
} from 'class-validator';

export class UpdateMovieDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @IsBoolean()
  isPublic: boolean;

  @IsNotEmpty()
  @IsInt({ message: 'Год должен быть числом' })
  @Min(1900, { message: 'Год должен быть не меньше 1900' })
  @Max(new Date().getFullYear())
  releaseYear: number;

  @IsArray()
  @IsUUID('4', { each: true })
  actorsIds: string[];

  imageUrl: string;
}
