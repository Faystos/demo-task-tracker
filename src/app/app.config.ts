import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from "@angular/common/http";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';

import {provideNativeDateAdapter} from "@angular/material/core";

import { routes } from './app.routes';
import { reducer } from "./store/state/app.reducer";
import { AppEffect } from "./store/state/app.effect";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideStore({ 'app-store': reducer }),
    provideEffects(AppEffect),
    provideHttpClient(),
    provideNativeDateAdapter()
  ]
};
