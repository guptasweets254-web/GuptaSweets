import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // 🔴 REQUIRED for Vercel (secure cookies + proxy)
  app.set('trust proxy', 1);

  app.use(cookieParser(process.env.CSRF_SECRET));

  // Enable CORS FIRST (important for cookies)
  app.enableCors({
    origin: process.env.FRONTEND_URL, // e.g. https://your-ui.vercel.app
    credentials: true,
  });

  // CSRF protection (EXCEPT auth routes)
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const csurf = require('csurf');

    const csrfProtection = csurf({
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'none', // 🔴 REQUIRED for cross-site cookies
        path: '/',
      },
    });

    app.use((req, res, next) => {
      // ❌ Disable CSRF for auth routes
      if (req.path.startsWith('/auth')) {
        return next();
      }
      return csrfProtection(req, res, next);
    });
  } catch (e) {
    // csurf not installed — skip CSRF protection
  }

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
