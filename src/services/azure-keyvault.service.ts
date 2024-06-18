import { Injectable, OnModuleInit } from '@nestjs/common';
import { SecretClient } from '@azure/keyvault-secrets';
import { ConfigService } from '@nestjs/config';
import { ClientSecretCredential } from '@azure/identity';

@Injectable()
export class AzureKeyVaultService implements OnModuleInit {
  private client: SecretClient;

  constructor(private configService: ConfigService) {}

  onModuleInit() {
    this.setupVault();
  }

  setupVault() {
    // const credential = new DefaultAzureCredential();
    const credential = new ClientSecretCredential(
      this.configService.get('AZURE_TENANT_ID'),
      this.configService.get('AZURE_CLIENT_ID'),
      this.configService.get('AZURE_CLIENT_SECRET'),
    );
    const url = `https://${this.configService.get('AZURE_KEY_VAULT_NAME')}.vault.azure.net`;
    this.client = new SecretClient(url, credential);
  }
  async getSecret(secretName: string): Promise<string> {
    const secret = await this.client.getSecret(secretName);
    return secret.value!;
  }
}
