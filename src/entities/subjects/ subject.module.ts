import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Nivel } from './ subject.entity';
import { NivelService } from './ subject.service';
import { NivelController } from './ subject.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Nivel])],
  controllers: [NivelController],
  providers: [NivelService],
})
export class SubjectModule {}
