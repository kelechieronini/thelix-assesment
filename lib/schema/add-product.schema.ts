import { IsString, IsNotEmpty, IsNumber, Min } from "class-validator";
import { Transform } from "class-transformer";

export class AddProductSchema {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @Transform(({ value }) => parseFloat(value), { toClassOnly: true })
  @IsNumber()
  @Min(0)
  price: number;

  @IsString()
  @IsNotEmpty()
  category: string;
}
