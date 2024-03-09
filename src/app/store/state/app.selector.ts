import { createFeatureSelector, createSelector } from '@ngrx/store';

import { State } from "../type/state.type";

export const selectAppState = createFeatureSelector<State>('app-store');

export const taskList = createSelector(
  selectAppState,
  (state) => state.taskList
);
