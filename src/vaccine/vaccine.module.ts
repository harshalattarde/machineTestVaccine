import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  VaccineSummary,
  VaccineSummarySchema,
} from 'src/model/vaccineSummary.schema';
import { VaccineController } from './vaccine.controller';
import { VaccineService } from './vaccine.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: VaccineSummary.name, schema: VaccineSummarySchema },
    ]),
  ],
  controllers: [VaccineController],
  providers: [VaccineService],
})
export class VaccineModule {}
