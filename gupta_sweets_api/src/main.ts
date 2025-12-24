import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.set('trust proxy', 1);

  app.use(cookieParser(process.env.CSRF_SECRET));

  app.enableCors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  });

  try {
    const csurf = require('csurf');

    const csrfProtection = csurf({
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'none',
        path: '/',
      },
    });

    app.use((req, res, next) => {
      // ❌ Disable CSRF for auth & csrf routes
      if (
        req.path.startsWith('/auth') ||
        req.path === '/csrf'
      ) {
        return next();
      }
      return csrfProtection(req, res, next);
    });
  } catch {}

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
