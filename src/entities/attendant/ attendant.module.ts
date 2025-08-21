import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attendant } from './ attendant.entity';
import { AttendantService } from './ attendant.service';
import { AttendantController} from './ attendant.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Attendant])],
  controllers: [AttendantController],
  providers: [AttendantService],
})
export class AttendantModule {}
