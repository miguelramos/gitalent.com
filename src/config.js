module.exports = {
  ENVIRONMENT: 'development', // development, testing, staging, production
  LANG: {
    DEFAULT: 'en',
    SUPPORTED: ['pt', 'es', 'de']
  },
  API_VERSION: 'v1',
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
  }
}
