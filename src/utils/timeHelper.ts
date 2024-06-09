import {formatDistanceToNow} from 'date-fns';

export const getFormattedTime = (time: number): string => {
  return formatDistanceToNow(new Date(time * 1000));
};
