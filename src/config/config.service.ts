import getConfig from './configuration';

class ConfigService {
  private readonly config;

  constructor() {
    this.config = getConfig();
  }

  get(key: string) {
    return this.config[key];
  }

  getDatabaseConfig() {
    return this.config.database;
  }
}

const configService = new ConfigService();
export default configService;
