module.exports = {
  ENVIRONMENT: 'development', // development, testing, staging, production
  LANG: {
    DEFAULT: 'en',
    SUPPORTED: ['pt', 'es', 'de']
  },
  API_VERSION: 'v1',
  HOSTS: {
    DEVELOPMENT: 'staging.foursource.com',
    STAGING: 'staging.foursource.com',
    TESTING: 'showroom.staging.foursource.com',
    LIVE: 'foursource.com'
  },
  DOMAINS: {
    AUTH: 'be-auth',
    BUYER: 'be-buyer',
    MANUFACTURER: 'be-manufacturer',
    LOCAL: '',
    SITE: 'http://www.foursource.com',
    UPLOADER: 'be-uploader',
    LOGGING: ''
  },
  STATE: {
    NAVBAR: {
      isVisible: true,
      isStick: true,
      isInverse: false,
      hasScroll: true,
      hasInfoBar: true,
      head: {
        enable: true,
        hasMobile: true,
        targetId: '#nav-component'
      },
      info: {
        enable: true
      },
      menu: {
        isLeft: false,
        isRight: false,
        enable: true
      },
      side: {
        isRight: true,
        isLeft: false,
        enable: true
      },
      user: {
        isRight: true,
        isLeft: false,
        enable: false
      }
    },
    FOOTER: {
      enable: true
    }
  },
  TYPES: {
    MANUFACTURER: 'MANUFACTURER',
    BUYER: 'BUYER'
  },
  ENDPOINTS: {
    COMMON_NAV: '@local:/assets/mocks/common/navigator-data.json',
    COMMON_FOOT: '@local:/assets/mocks/common/footer-data.json',
    COMMON_INFO: '@local:/assets/mocks/common/infobar-data.json',
    AUTH_LOGIN: '@auth:/auth/get-token'
  }
}
