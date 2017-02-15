module.exports = {
  ENVIRONMENT: 'development', // development, testing, staging, production
  LANG: {
    DEFAULT: 'en',
    SUPPORTED: ['pt', 'es', 'de']
  },
  API_VERSION: 'v1',
  API_DOMAIN: '',
  STATE: {
    NAVBAR: {
      hasShadow: true,
      hasBrand: true
    },
    FOOTER: {
      enable: true
    }
  },
  ENDPOINTS: {
    COMMON_NAV: '@local:/assets/mocks/common/navigator-data.json'
  }
}
