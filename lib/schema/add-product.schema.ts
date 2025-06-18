import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  Min,
  IsInt,
} from "class-validator";
import { Transform } from "class-transformer";

export class AddProductSchema {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  tags: string;

  @IsOptional()
  @Transform(({ value }) => parseFloat(value), { toClassOnly: true })
  waist: number;

  @IsOptional()
  @Transform(({ value }) => parseFloat(value), { toClassOnly: true })
  length: number;

  @IsOptional()
  @Transform(({ value }) => parseFloat(value), { toClassOnly: true })
  weight: number;

  @IsString()
  size: string;

  @Transform(({ value }) => parseFloat(value), { toClassOnly: true })
  @IsNumber()
  @Min(0)
  price: number;

  @Transform(({ value }) => parseFloat(value), { toClassOnly: true })
  @IsNumber()
  @Min(0)
  quantity_in_stock: number;

  @IsString()
  @IsNotEmpty()
  category_id: string;
}
