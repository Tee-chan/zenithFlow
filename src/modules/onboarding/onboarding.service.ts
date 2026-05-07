import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { OnboardCompanyDto } from './dto/onboard-company.dto';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class OnboardingService {
  constructor(private prisma: PrismaService) {}

  async onboard(dto: OnboardCompanyDto) {
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    try {
      return await this.prisma.$transaction(async (tx: Prisma.TransactionClient) => {
        // 1. Create Tenant
        const tenant = await tx.tenant.create({
          data: { name: dto.companyName,
                subdomain: dto.companyName.toLowerCase().replace(/\s+/g, '-') // e.g."Zenith Corp" -> "zenith-corp"
           },
        });

        // 2. Create Super Admin User
        const admin = await tx.user.create({
          data: {
            email: dto.adminEmail,
            password: hashedPassword,
            role: 'SUPER_ADMIN',
            tenantId: tenant.id,
          },
        });

        return {
          message: 'Company onboarded successfully',
          tenantId: tenant.id,
          adminId: admin.id,
        };
      });
    } catch (error: any) {
      if (error.code === 'P2002') {
        throw new ConflictException('Company name or Email already exists');
      }
      throw error;
    }
  }
}
