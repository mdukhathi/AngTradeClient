import {
  BrowserCacheLocation,
  Configuration,
  LogLevel
} from '@azure/msal-browser';

// Configuration for MSAL - MUST BE EXPORTED
export const msalConfig: Configuration = {
  auth: {
    clientId: '3aeb54f6-b5e2-48cb-ab3c-acf50a0f0f42',
    authority: 'https://login.microsoftonline.com/2de9b431-7882-473d-9a40-8cb84c068099',
    // redirectUri: 'http://localhost:4200',
    // postLogoutRedirectUri: 'http://localhost:4200/login'
    // redirectUri: window.location.origin, // Dynamic - uses current origin
    // postLogoutRedirectUri: window.location.origin + '/login'
    redirectUri: 'https://mdukhathi.github.io/AngTradeClient/', 
    postLogoutRedirectUri: 'https://mdukhathi.github.io/AngTradeClient/login'
  },
  cache: {
    cacheLocation: BrowserCacheLocation.LocalStorage,
    storeAuthStateInCookie: false
  },
  system: {
    loggerOptions: {
      loggerCallback: (level: LogLevel, message: string, containsPii: boolean) => {
        if (containsPii) { return; }
        console.log(message);
      }
    }
  }
};

// Scopes for your API access - MUST BE EXPORTED
export const protectedResources = {
  tradehubApi: {
    endpoint: 'http://localhost:5150/api',
    scopes: ['api://7e6cae4c-dfd9-4c98-ae87-d249b059f19c/access_as_user']
  }
};

// Login request configuration
export const loginRequest = {
  scopes: ['openid', 'profile', 'email']
};

// Protected resource map for MSAL
export const protectedResourceMap = new Map([
  ['http://localhost:5150/api', ['api://7e6cae4c-dfd9-4c98-ae87-d249b059f19c/access_as_user']]
]);