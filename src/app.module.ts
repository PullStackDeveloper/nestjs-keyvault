import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AzureKeyVaultService } from './services/azure-keyvault.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService, AzureKeyVaultService, ConfigService],
  exports: [AzureKeyVaultService],
})
export class AppModule {}
