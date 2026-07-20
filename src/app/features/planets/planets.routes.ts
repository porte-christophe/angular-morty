import type { Route } from '@angular/router';
import { Planets } from './pages/planets/planets';

export const PLANETS_ROUTES: Route[] = [
  {
    path: '',
    component: Planets,
  },
];
