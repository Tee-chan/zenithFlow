import { IsEmail, IsString, MinLength, IsNotEmpty } from 'class-validator';

export class OnboardCompanyDto {
  @IsString()
  @IsNotEmpty()
  companyName!: string;

  @IsString()
  @IsNotEmpty()
  subdomain!: string; 

  @IsEmail()
  adminEmail!: string;

  @IsString()
  @MinLength(8)
  password!: string;
}


