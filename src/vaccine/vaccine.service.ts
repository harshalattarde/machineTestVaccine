import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  getYearAndWeekFromIsoString,
  getModifiedVaccineData,
} from 'src/Helper/helper';
import {
  VaccineDocument,
  VaccineSummary,
} from 'src/model/vaccineSummary.schema';

@Injectable()
export class VaccineService {
  constructor(
    @InjectModel(VaccineSummary.name)
    private campaignModel: Model<VaccineDocument>,
  ) {}

  async createVaccineData(data: any) {
    const { YearWeekISO } = data;

    const { week, year } = getYearAndWeekFromIsoString(YearWeekISO);

    return await this.campaignModel.create({ ...data, year, week });
  }

  async getVaccineSummary({
    fromYear,
    toYear,
    fromWeek,
    toWeek,
    c,
    range,
  }: {
    fromYear: number;
    toYear: number;
    fromWeek: number;
    toWeek: number;
    c?: string;
    range: number;
  }) {
    const matchQuery = {
      $match: {
        year: {
          $gte: fromYear,
          $lte: toYear,
        },
        week: {
          $gte: fromWeek,
          $lte: toWeek,
        },
      },
    };
    c ? (matchQuery['$match']['ReportingCountry'] = c) : null;

    const data = await this.campaignModel.aggregate([
      matchQuery,
      {
        $group: {
          _id: '$week',
          year: {
            $last: '$year',
          },
          week: {
            $last: '$week',
          },
          YearWeekISO: {
            $last: '$YearWeekISO',
          },
          count: {
            $sum: '$NumberDosesReceived',
          },
        },
      },
      {
        $sort: {
          week: 1,
          year: 1,
        },
      },
    ]);

    return data?.length ? getModifiedVaccineData({ data, range }) : [];
  }
}
