import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './task/task.module';
import { MovieModule } from './movie/movie.module';
import { ConfigModule } from '@nestjs/config';
import { ReviewModule } from './review/review.module';
import { ActorModule } from './actor/actor.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    TaskModule,
    MovieModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ReviewModule,
    ActorModule,
    PrismaModule,
  ],
})
export class AppModule {}
