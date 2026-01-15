import { IsString,IsNotEmpty,IsEnum,IsNumber,Min,IsDateString,} from 'class-validator';

export class UpdatePromotionDto {

  @IsString()
  @IsNotEmpty()
  code: string;

  @IsEnum(['PERCENT', 'FIXED'])
  discountType: 'PERCENT' | 'FIXED';

  @IsNumber()
  @Min(1)
  discountValue: number;
  
  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;
}
