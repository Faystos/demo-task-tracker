import { createFeatureSelector, createSelector } from '@ngrx/store';

import { State } from "../type/state.type";

export const selectAppState = createFeatureSelector<State>('app-store');

export const taskList = createSelector(
  selectAppState,
  (state) => state.taskList
);

export const task = createSelector(
  selectAppState,
  (state) => state.task
);

export const status = createSelector(
  selectAppState,
  (state: State) => state.statusList
);

export const implementer = createSelector(
  selectAppState,
  (state: State) => state.implementer
);
