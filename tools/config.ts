const ip = require('ip');
const path = require('path');
const os = require('os');

const EVENT = process.env.npm_lifecycle_event;

export function root(relative: string): string {
  let _root = path.resolve(path.join(__dirname, '../'));
  return path.join(_root, relative);
}

export class ConfigPack {
  static IS_DEV_SERVER: boolean = EVENT.includes('dev');
  static ENVIRONMENT: string = EVENT.includes('prod') ? 'production' : 'development';
  static IS_PROD: boolean = EVENT.includes('prod');
  static IS_AOT: boolean = EVENT.includes('aot');
  static IS_DLL: boolean = EVENT.includes('dll');
  static HOST: number = ip.address();
  static PORT: number = 3000;
  static USE_DEV_SERVER_PROXY: boolean = false;
  static DEV_SERVER_PROXY: {} = {
    '**': 'http://localhost:8089'
  };
  static DEV_SOURCE_MAPS: string = '#inline-source-map';
  static PROD_SOURCE_MAPS: string = 'source-map';
  static DEV_SERVER_WATCH: {} = {
    poll: undefined,
    aggregateTimeout: 300,
    ignored: /node_modules/
  };
  static HOSTS_ENV = {
    development: ['localhost', 'spaceship.lan'],
    testing: [],
    staging: [],
    production: []
  };
  static EXCLUDE_SOURCE_MAPS: string[] = [
    root('node_modules/@angular'),
    root('node_modules/rxjs'),
    root('node_modules/angular2-google-maps')
  ];
  static COPY_FOLDERS: { from: string; to?: string; }[] = [
    // { from: 'src/assets/mock-data', to: 'assets/mock-data' }
  ];
  static VENDOR_DLLS: string[] = [
    root('node_modules/verbal-expressions/dist/verbalexpressions.js'),
    // root('node_modules/bootstrap-sass/assets/javascripts/bootstrap.js'),
    // root('node_modules/slick-carousel/slick/slick.js')
  ];
  static defineEnvironment() {
    if (process.env.ENV === undefined) {
      let hostname = os.hostname();

      const hasHost = env => ConfigPack.HOSTS_ENV[env].includes(hostname);
      ConfigPack.ENVIRONMENT = Object.keys(ConfigPack.HOSTS_ENV).find(hasHost) || 'development';
    } else {
      ConfigPack.ENVIRONMENT = process.env.ENV;
    }
  }
}
