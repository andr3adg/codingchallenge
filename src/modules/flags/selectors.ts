import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '../store/store';

const selectFlagsState = (state: RootState) => state.flags;

export const selectFlagValue = (flag: string) =>
  createSelector(selectFlagsState, flagsState => flagsState.flags[flag]);
