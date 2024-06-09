import {RootState} from '../store/store';

const selectFlagsState = (state: RootState) => state.flags;

export const selectFlagValue = (flag: string) => (state: RootState) => {
  const flagsState = selectFlagsState(state);
  return flagsState.flags[flag];
};
