import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type VaccineDocument = VaccineSummary & Document;

@Schema({ timestamps: true })
export class VaccineSummary {
  @Prop({ type: String, required: true, index: true })
  YearWeekISO: string;

  @Prop({ type: Number, index: true, required: true, default: 0 })
  week: number;

  @Prop({ type: Number, index: true, required: true, default: 0 })
  year: number;

  @Prop({ type: Number, index: true, required: true, default: 0 })
  FirstDose: number;

  @Prop({ type: String, index: true, default: '' })
  FirstDoseRefused: string;

  @Prop({ type: Number, index: true, required: true, default: 0 })
  SecondDose: number;

  @Prop({ type: Number, index: true, required: true, default: 0 })
  DoseAdditional1: number;

  @Prop({ type: Number, index: true, required: true, default: 0 })
  DoseAdditional2: number;

  @Prop({ type: Number, index: true, required: true, default: 0 })
  UnknownDose: number;

  @Prop({ type: Number, index: true, required: true, default: 0 })
  NumberDosesReceived: number;

  @Prop({ type: Number, index: true, required: true, default: 0 })
  Denominator: number;

  @Prop({ type: Number, index: true, required: true, default: 0 })
  Population: number;

  @Prop({ type: String, index: true })
  ReportingCountry: string;

  @Prop({ type: String, index: true })
  Vaccine: string;
}

const VaccineSummarySchema = SchemaFactory.createForClass(VaccineSummary);

export { VaccineSummarySchema };
