import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Movie } from '../generated/prisma/client';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Injectable()
export class MovieService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.client.movie.findMany({
      where: {
        isAvailable: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        title: true,
        actors: {
          select: {
            id: true,
            name: true,
          },
        },
        reviews: true,
      },
    });
  }

  async findById(id: string) {
    const movie = await this.prisma.client.movie.findUnique({
      where: {
        id,
      },
      include: {
        actors: true,
        poster: true,
      },
    });

    if (!movie) {
      throw new NotFoundException(`Фильм с id ${id} не найден`);
    }

    return movie;
  }

  async create(dto: CreateMovieDto): Promise<Movie> {
    const { title, releaseYear, imageUrl, actorsIds } = dto;

    const actors = await this.prisma.client.actor.findMany({
      where: {
        id: {
          in: actorsIds ?? [],
        },
      },
    });

    if (actors.length === 0) {
      throw new NotFoundException('Актеры не найдены');
    }

    return this.prisma.client.movie.create({
      data: {
        title,
        releaseYear,

        poster: imageUrl
          ? {
              create: {
                url: imageUrl,
              },
            }
          : undefined,

        actors: {
          connect: actors.map((actor) => ({
            id: actor.id,
          })),
        },
      },
    });
  }

  async update(id: string, dto: UpdateMovieDto): Promise<Movie> {
    await this.findById(id);

    const actors = await this.prisma.client.actor.findMany({
      where: {
        id: {
          in: dto.actorsIds ?? [],
        },
      },
    });

    return this.prisma.client.movie.update({
      where: {
        id,
      },

      data: {
        title: dto.title,
        releaseYear: dto.releaseYear,

        poster: dto.imageUrl
          ? {
              upsert: {
                create: {
                  url: dto.imageUrl,
                },
                update: {
                  url: dto.imageUrl,
                },
              },
            }
          : undefined,

        actors: {
          set: actors.map((actor) => ({
            id: actor.id,
          })),
        },
      },

      include: {
        actors: true,
        poster: true,
      },
    });
  }

  async delete(id: string): Promise<boolean> {
    await this.findById(id);

    await this.prisma.client.movie.delete({
      where: {
        id,
      },
    });

    return true;
  }
}
