import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { initializeApp } from 'firebase/app';
import { provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAXwh1rz2oWbs5gaU5_KXUaHLfQ5ZmBs8c',
  authDomain: 'loginauth-ff202.firebaseapp.com',
  projectId: 'loginauth-ff202',
  storageBucket: 'loginauth-ff202.appspot.com',
  messagingSenderId: '157544287678',
  appId: '1:157544287678:web:56778f6785e4f0ace8bdef',
  measurementId: 'G-R47VBFBMJ1',
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
  ],
};
