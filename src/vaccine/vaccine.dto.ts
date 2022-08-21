import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDefined,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  Min,
} from 'class-validator';

export class PostVaccineDto {
  @IsNotEmpty()
  @ApiProperty({ description: 'Date from format should be like 2020-W53' })
  @IsDefined()
  @Matches(/^[0-9]{4}\-[A-Z][0-9]{2}?$/)
  YearWeekISO: string;

  @IsNotEmpty()
  @ApiProperty()
  @Type(() => Number)
  FirstDose: number;

  @IsNotEmpty()
  @ApiProperty()
  @Type(() => Number)
  FirstDoseRefused: number;

  @IsNotEmpty()
  @ApiProperty()
  @Type(() => Number)
  SecondDose: number;

  @IsNotEmpty()
  @ApiProperty()
  @Type(() => Number)
  DoseAdditional1: number;

  @IsNotEmpty()
  @ApiProperty()
  @Type(() => Number)
  DoseAdditional2: number;

  @IsNotEmpty()
  @ApiProperty()
  @Type(() => Number)
  UnknownDose: number;

  @IsNotEmpty()
  @ApiProperty()
  @Type(() => Number)
  NumberDosesReceived: number;

  @IsNotEmpty()
  @ApiProperty()
  @Type(() => Number)
  Denominator: number;

  @IsNotEmpty()
  @ApiProperty()
  @Type(() => Number)
  Population: number;

  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  ReportingCountry: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  Vaccine: string;
}

export class GetVaccineDto {
  @IsNotEmpty()
  @ApiProperty({ description: 'Date from format should be like 2020-W53' })
  @IsString()
  @IsDefined()
  @Matches(/^[0-9]{4}\-[A-Z][0-9]{2}?$/)
  DateFrom: string;

  @IsNotEmpty()
  @ApiProperty({ description: 'Date from format should be like 2020-W53' })
  @IsString()
  @IsDefined()
  @Matches(/^[0-9]{4}\-[A-Z][0-9]{2}?$/)
  DateTo: string;

  @IsNotEmpty()
  @ApiProperty()
  @Type(() => Number)
  @Min(1)
  range: number;

  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({ required: false })
  @IsString()
  c?: string;
}
