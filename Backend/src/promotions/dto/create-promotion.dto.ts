import { IsString,IsNotEmpty,IsEnum,IsNumber,Min,IsDateString,} from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePromotionDto {

  @IsString()
  @IsNotEmpty()
  code: string;

  @IsEnum(['PERCENT', 'FIXED'])
  discountType: 'PERCENT' | 'FIXED';

  @Type(() => Number)
  @IsNumber()
  @Min(1)
  discountValue: number;
  
  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;
}
