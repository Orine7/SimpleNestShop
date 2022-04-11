import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm'
import { join } from 'path'
import { EntitySchema } from 'typeorm'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'

export function connectionOptions(): TypeOrmModuleAsyncOptions {
  return {
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (
      configService: ConfigService<{
        DATABASE_HOST
        POSTGRES_USER
        POSTGRES_PASSWORD
        POSTGRES_DB
      }>,
    ) => ({
      type: 'postgres',
      port: 5432,
      entities: [join(__dirname, '**/*.entity{.ts,.js}')],
      migrations: [join(__dirname, 'migrations/*{.ts,.js}')],
      cli: {
        entitiesDir: 'src/**/*.entity{.ts,.js}',
        migrationsDir: 'src/migrations',
      },
      namingStrategy: new SnakeNamingStrategy(),
      synchronize: false,
      host: configService.get('DATABASE_HOST'),
      username: configService.get('POSTGRES_USER'),
      password: configService.get('POSTGRES_PASSWORD'),
      database: configService.get('POSTGRES_DB'),
    }),
  }
}

type Entity = Function | string | EntitySchema<any>
export function connectionTestOptions(
  entities: Entity[],
): TypeOrmModuleAsyncOptions {
  return {
    useFactory: async () => ({
      type: 'sqlite',
      database: ':memory:',
      dropSchema: true,
      entities: entities,
      synchronize: true,
      logging: false,
    }),
  }
}
