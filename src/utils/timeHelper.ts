import {formatDistanceToNow} from 'date-fns';

const getFormattedTime = (time: number): string => {
  return formatDistanceToNow(new Date(time * 1000));
};

export {getFormattedTime};
