import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { UsersService } from './users/users.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );
  app.enableCors();
  app.setGlobalPrefix('api');

  // Optional: seed an initial admin user for local development.
  // Set env vars: ADMIN_EMAIL, ADMIN_PASSWORD (and optionally ADMIN_NAME).
  // If the email already exists as a normal user, set ADMIN_FORCE=1 to promote/reset it.
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  const adminName = process.env.ADMIN_NAME ?? 'Admin';
  const adminForce = ['1', 'true', 'yes', 'on'].includes(
    String(process.env.ADMIN_FORCE ?? '').toLowerCase(),
  );

  if (adminEmail && adminPassword) {
    try {
      const usersService = app.get(UsersService);
      const existing = await usersService.findOneByEmail(adminEmail);
      if (!existing) {
        await usersService.create({
          name: adminName,
          email: adminEmail,
          password: adminPassword,
          role: 'admin',
        });

        console.log(`[seed] created admin user: ${adminEmail}`);
      } else if (adminForce) {
        await usersService.update(String((existing as any)._id), {
          name: adminName,
          password: adminPassword,
          role: 'admin',
        });

        console.log(`[seed] updated/promoted admin user: ${adminEmail}`);
      } else {
        console.log(
          `[seed] admin user already exists (${adminEmail}); set ADMIN_FORCE=1 to promote/reset`,
        );
      }
    } catch (err) {
      console.warn('[seed] failed to create admin user:', err);
    }
  }

  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
