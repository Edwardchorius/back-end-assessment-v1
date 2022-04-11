import { NestFactory } from '@nestjs/core';
import { MainModule } from './main.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(MainModule);

  const config = new DocumentBuilder()
    .setTitle('EmailGenerator')
    .setDescription(
      'Generating emails based on passed in input values and expression containing the pattern',
    )
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(9443);
}
bootstrap();
