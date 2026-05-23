import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';

export class CreateReviewDto {

  @IsString()
  text: string;

  @IsNumber()
  rating: number;

  @IsString()
  @IsNotEmpty()
  @IsUUID('4')
  movieId: string;
}
