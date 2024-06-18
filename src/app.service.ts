import { Injectable } from '@nestjs/common';
import { AzureKeyVaultService } from './services/azure-keyvault.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(
    private azureKeyVaultService: AzureKeyVaultService,
    private configService: ConfigService,
  ) {}

  async getHello(): Promise<string> {
    return this.azureKeyVaultService.getSecret(
      await this.configService.get('MY_SUPER_SECRET_PASSWORD'),
    );
  }
}
