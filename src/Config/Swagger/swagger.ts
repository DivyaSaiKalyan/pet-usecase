import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { SWAGGER_CONFIG } from './swagger.config';

/**
 * This function is used to create a swagger
 * @param app is imported from the nestjs commom library
 * @returns create swagger document
 */
export function createDocument(app: INestApplication): OpenAPIObject {
  const config = new DocumentBuilder()
    .setTitle(SWAGGER_CONFIG.Title)
    .setDescription(SWAGGER_CONFIG.Description)
    .addBearerAuth()
    .setVersion(SWAGGER_CONFIG.Version);
  const options = config.build();
  return SwaggerModule.createDocument(app, options);
}
