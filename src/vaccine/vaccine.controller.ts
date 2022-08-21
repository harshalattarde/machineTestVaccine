import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { getYearAndWeekFromIsoString } from 'src/Helper/helper';
import { GetVaccineDto, PostVaccineDto } from './vaccine.dto';
import { VaccineService } from './vaccine.service';

@Controller('vaccine')
@UsePipes(new ValidationPipe({ transform: true }))
@ApiTags('vaccine')
export class VaccineController {
  constructor(private readonly vaccineService: VaccineService) {}

  @Post()
  async postVaccine(@Body() postVaccineDto: PostVaccineDto) {
    return await this.vaccineService.createVaccineData(postVaccineDto);
  }

  @Get()
  async getVaccineSummary(
    @Query() { DateFrom, DateTo, range, c }: GetVaccineDto,
  ) {
    const fromObj = getYearAndWeekFromIsoString(DateFrom);
    const toObj = getYearAndWeekFromIsoString(DateTo);

    const fromYear = fromObj.year;
    const fromWeek = fromObj.week;
    const toYear = toObj.year;
    const toWeek = toObj.week;

    const summary = await this.vaccineService.getVaccineSummary({
      fromYear,
      toYear,
      fromWeek,
      toWeek,
      c,
      range,
    });

    return { summary };
  }
}
