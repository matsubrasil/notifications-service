import { Module } from '@nestjs/common';
import { NotificationsRespository } from '@application/repositories/notifications.repository';
import { PrismaService } from '@infra/database/prisma/prisma.service';
import { PrismaNotificationsRepository } from '@infra/database/prisma/repositories/prisma-notifications.repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: NotificationsRespository,
      useClass: PrismaNotificationsRepository,
    },
  ],
  exports: [NotificationsRespository],
})
export class DatabaseModule {}
