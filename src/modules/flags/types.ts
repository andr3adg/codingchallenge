interface Flags {
  [key: string]: boolean;
}

export interface FlagsState {
  flags: Flags;
}

export enum FlagTypes {
  POSTS_LOADING = 'postsLoading',
  POSTS_REFRESHING = 'postsRefreshing',
  POSTS_LOADING_MORE = 'postsLoadingMore',
}
