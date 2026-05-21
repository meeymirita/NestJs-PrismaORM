import { Injectable, NotFoundException, ValidationError } from '@nestjs/common';
import { MovieEntity } from './entities/movie.entity';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { ActorEntity } from '../actor/entities/review.entity';
import { MoviePosterEntity } from './entities/poster.entity';

@Injectable()
export class MovieService {
  public constructor(
    @InjectRepository(MovieEntity)
    private readonly movieRepository: Repository<MovieEntity>,
    @InjectRepository(ActorEntity)
    private readonly actorRepository: Repository<ActorEntity>,
    @InjectRepository(MoviePosterEntity)
    private readonly moviePosterRepository: Repository<MoviePosterEntity>,
  ) {}

  async findAll(): Promise<MovieEntity[]> {
    return await this.movieRepository.find({
      where: {
        isAvailable: true,
      },
      order: {
        releaseYear: 'DESC',
      },
      take: 2,
    });
  }

  async findById(id: string): Promise<MovieEntity> {
    const movie: MovieEntity | null = await this.movieRepository.findOne({
      where: {
        id,
      },
      relations: {
        actors: true,
      },
    });
    if (!movie) throw new NotFoundException(`фильм с айди ${id} не найден`);
    return movie;
  }

  async create(dto: CreateMovieDto): Promise<MovieEntity | ValidationError> {
    const { title, releaseYear, imageUrl, actorsIds } = dto;

    const actors = await this.actorRepository.find({
      where: {
        id: In(actorsIds),
      },
    });
    console.log(actors);
    if (!actors || actors.length === 0) {
      throw new NotFoundException('актеры не найдены');
    }

    let poster: MoviePosterEntity | null = null;
    if (imageUrl) {
      poster = this.moviePosterRepository.create({ url: imageUrl });
      await this.moviePosterRepository.save(poster);
    }

    const movie = this.movieRepository.create({
      title,
      releaseYear,
      poster,
      actors,
    });
    return await this.movieRepository.save(movie);
  }

  async update(id: string, dto: UpdateMovieDto): Promise<boolean> {
    const movie = await this.findById(id);
    Object.assign(movie, dto);
    await this.movieRepository.save(movie);
    return true;
  }

  async delete(id: string): Promise<boolean> {
    const movie = await this.findById(id);
    await this.movieRepository.remove(movie);
    return true;
  }
}
