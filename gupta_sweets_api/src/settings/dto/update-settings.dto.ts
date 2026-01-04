import { IsOptional, IsString, IsUrl } from 'class-validator';
import { EmptyStringToUndefined } from 'src/common/decorators/empty-string-to-undefined-decorator';

export class UpdateSettingsDto {
  @IsOptional()
  @IsString()
  siteName?: string;

  @IsOptional()
  @IsString()
  tagline?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  logoUrl?: string;

  @IsOptional()
  @IsString()
  mapUrl?: string;

  @IsOptional()
  @IsString()
  businessHours?: string;

  @IsOptional()
  @IsUrl()
  @EmptyStringToUndefined()
  facebook?: string;

  @IsOptional()
  @IsUrl()
  @EmptyStringToUndefined()
  instagram?: string;

  @IsOptional()
  @IsUrl()
  @EmptyStringToUndefined()
  twitter?: string;

  @IsOptional()
  @IsUrl()
  @EmptyStringToUndefined()
  youtube?: string;

  @IsOptional()
  @IsUrl()
  @EmptyStringToUndefined()
  zomato?: string;

  @IsOptional()
  @IsUrl()
  @EmptyStringToUndefined()
  swiggy?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  whatsapp?: string;
}