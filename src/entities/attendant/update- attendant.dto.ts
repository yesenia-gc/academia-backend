import { IsOptional, IsString } from "class-validator";

export class UpdateAttendantDto{
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  last_name?: string;

  @IsOptional()
  @IsString()
  phone?: string;
}