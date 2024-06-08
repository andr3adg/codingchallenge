//chat gpt requested to simulate real Types for known api responses, so might not be totally accurate.
//Reddit's is too big so didn't lose much time that as its not relevant for this project.
export interface RedditApiResponse {
  kind: string;
  data: {
    modhash: string;
    dist: number;
    children: RedditPost[];
    after: string | null;
    before: string | null;
  };
}

export interface RedditPost {
  kind: string;
  data: RedditPostData;
}

export interface RedditPostData {
  approved_at_utc: number | null;
  subreddit: string;
  selftext: string;
  author_fullname: string;
  saved: boolean;
  mod_reason_title: string | null;
  gilded: number;
  clicked: boolean;
  title: string;
  link_flair_richtext: FlairRichText[];
  subreddit_name_prefixed: string;
  hidden: boolean;
  pwls: number | null;
  link_flair_css_class: string | null;
  downs: number;
  thumbnail_height: number | null;
  top_awarded_type: string | null;
  hide_score: boolean;
  name: string;
  quarantine: boolean;
  link_flair_text_color: string;
  upvote_ratio: number;
  author_flair_background_color: string | null;
  subreddit_type: string;
  ups: number;
  total_awards_received: number;
  media_embed: MediaEmbed;
  thumbnail_width: number | null;
  author_flair_template_id: string | null;
  is_original_content: boolean;
  user_reports: any[];
  secure_media: SecureMedia | null;
  is_reddit_media_domain: boolean;
  is_meta: boolean;
  category: string | null;
  secure_media_embed: SecureMediaEmbed;
  link_flair_text: string | null;
  can_mod_post: boolean;
  score: number;
  approved_by: string | null;
  is_created_from_ads_ui: boolean;
  author_premium: boolean;
  thumbnail: string;
  edited: boolean | number;
  author_flair_css_class: string | null;
  author_flair_richtext: FlairRichText[];
  gildings: Gildings;
  content_categories: string[] | null;
  is_self: boolean;
  mod_note: string | null;
  created: number;
  link_flair_type: string;
  wls: number | null;
  removed_by_category: string | null;
  banned_by: string | null;
  author_flair_type: string;
  domain: string;
  allow_live_comments: boolean;
  selftext_html: string | null;
  likes: boolean | null;
  suggested_sort: string | null;
  banned_at_utc: string | null;
  view_count: number | null;
  archived: boolean;
  no_follow: boolean;
  is_crosspostable: boolean;
  pinned: boolean;
  over_18: boolean;
  all_awardings: Award[];
  awarders: any[];
  media_only: boolean;
  link_flair_template_id: string | null;
  can_gild: boolean;
  spoiler: boolean;
  locked: boolean;
  author_flair_text: string | null;
  treatment_tags: any[];
  visited: boolean;
  removed_by: string | null;
  num_reports: number | null;
  distinguished: string | null;
  subreddit_id: string;
  author_is_blocked: boolean;
  mod_reason_by: string | null;
  removal_reason: string | null;
  link_flair_background_color: string;
  id: string;
  is_robot_indexable: boolean;
  report_reasons: string | null;
  author: string;
  discussion_type: string | null;
  num_comments: number;
  send_replies: boolean;
  whitelist_status: string | null;
  contest_mode: boolean;
  mod_reports: any[];
  author_patreon_flair: boolean;
  author_flair_text_color: string | null;
  permalink: string;
  parent_whitelist_status: string | null;
  stickied: boolean;
  url: string;
  subreddit_subscribers: number;
  created_utc: number;
  num_crossposts: number;
  media: Media | null;
  is_video: boolean;
}

interface Media {
  type: string | null;
  oembed?: OEmbed;
}

interface OEmbed {
  provider_url: string;
  description: string;
  title: string;
  url: string;
  author_name: string;
  height: number | null;
  width: number | null;
  html: string;
  thumbnail_width: number | null;
  version: string;
  provider_name: string;
  thumbnail_url: string;
  type: string;
  thumbnail_height: number | null;
}

interface FlairRichText {
  e: string;
  t: string;
}

interface MediaEmbed {
  content?: string;
  width?: number;
  scrolling?: boolean;
  height?: number;
}

interface SecureMedia {
  reddit_video: RedditVideo;
}

interface SecureMediaEmbed {
  content?: string;
  width?: number;
  scrolling?: boolean;
  media_domain_url?: string;
  height?: number;
}

interface RedditVideo {
  bitrate_kbps: number;
  fallback_url: string;
  height: number;
  width: number;
  scrubber_media_url: string;
  dash_url: string;
  duration: number;
  hls_url: string;
  is_gif: boolean;
  transcoding_status: string;
}

interface Gildings {
  gid_1?: number;
  gid_2?: number;
  gid_3?: number;
}

interface Award {
  giver_coin_reward: number | null;
  subreddit_id: string | null;
  is_new: boolean;
  days_of_drip_extension: number | null;
  coin_price: number;
  id: string;
  penny_donate: number | null;
  award_sub_type: string;
  coin_reward: number;
  icon_url: string;
  days_of_premium: number | null;
  tiers_by_required_awardings: string | null;
  resized_icons: Icon[];
  icon_width: number;
  static_icon_width: number;
  start_date: string | null;
  is_enabled: boolean;
  awardings_required_to_grant_benefits: string | null;
  description: string;
  end_date: string | null;
  sticky_duration_seconds: string | null;
  subreddit_coin_reward: number;
  count: number;
  static_icon_height: number;
  name: string;
  resized_static_icons: Icon[];
  icon_format: string | null;
  icon_height: number;
  penny_price: number | null;
  award_type: string;
  static_icon_url: string;
}

interface Icon {
  url: string;
  width: number;
  height: number;
}

export enum RedditCategories {
  HOT = 'hot',
  NEW = 'new',
  TOP = 'top',
  RISING = 'rising',
}
