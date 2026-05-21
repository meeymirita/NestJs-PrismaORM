import { Module } from '@nestjs/common';
import { MovieController } from './movie.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieEntity } from './entities/movie.entity';
import { MovieService } from './movie.service';
import { ActorEntity } from '../actor/entities/review.entity';
import { MoviePosterEntity } from './entities/poster.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([MovieEntity, ActorEntity, MoviePosterEntity]),
  ],
  controllers: [MovieController],
  providers: [MovieService],
  exports: [MovieService],
})
export class MovieModule {}
