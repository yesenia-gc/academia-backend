import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coordinator } from './ coordinator.entity';
import { CoordinatorService } from './ coordinator.service';
import { CoordinatorController} from './ coordinator.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Coordinator])],
  controllers: [CoordinatorController],
  providers: [CoordinatorService],
})
export class CoordinatorModule {}
