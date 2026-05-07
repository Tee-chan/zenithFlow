import { Controller, Post, Body } from '@nestjs/common';
import { OnboardingService } from './onboarding.service';
import { OnboardCompanyDto } from './dto/onboard-company.dto';

@Controller('onboarding')
export class OnboardingController {
  constructor(private readonly onboardingService: OnboardingService) {}

  @Post('company')
  async onboard(@Body() dto: OnboardCompanyDto) {
    return this.onboardingService.onboard(dto);
  }
}
