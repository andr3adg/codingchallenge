import {RedditPost} from '../../utils/redditAPITypes';
import {PostCardProps} from './types';

export const formatPostsFromRequestToList = (
  rawList: RedditPost[],
): PostCardProps[] => {
  return rawList.map(({data}: any) => ({
    id: data.id,
    title: data.title,
    author: data.author,
    score: data.score,
    num_comments: data.num_comments,
    created_utc: data.created_utc,
    permalink: data.permalink,
    url: typeof data.url === 'string' ? data.url : undefined,
  }));
};
