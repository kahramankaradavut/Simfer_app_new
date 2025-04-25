import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'myApp',
  webDir: 'www',
  plugins: {
    CapacitorPreferences: {
      group: 'CapacitorStorage'
    },
    Keyboard: {
      resize: 'body'
    },
    SplashScreen: {
      launchAutoHide: true
    },
    Browser: {
      enabled: true
    }
  },
  server: {
    cleartext: true,
    allowNavigation: ['http://localhost:5113/api/Users.com'],
    // allowNavigation: ['https://api2.sersim.com.tr/api/Users.com']
  }
};


export default config;
