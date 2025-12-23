import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from "cookie-parser";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  // CSRF protection via double submit cookie using csurf
  // requires installing `csurf` (npm i csurf)
  try {
    // Dynamically require so the app still starts if csurf is not installed during dev
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const csurf = require('csurf');
    app.use(csurf({ cookie: { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production' } }));
  } catch (e) {
    // csurf not installed — skip CSRF protection
    // In production make sure to install csurf and enable it
  }

  app.enableCors({
    origin: process.env.FRONTEND_URL, // React / Admin UI
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();

