import {NavigationProp, RouteProp} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {selectIsOnline} from '../../modules/network/selectors';

import {RootStackParamList} from '../../utils/RootNavigation';
import PostDetail from './PostDetail';
import {downloadWebPage, loadSavedWebPage} from '../../utils/misc';
import config from '../../config/config';

type PostDetailContainerProps = {
  navigation: NavigationProp<RootStackParamList, 'PostDetail'>;
  route: RouteProp<RootStackParamList, 'PostDetail'>;
};

export type webViewContentProps = {uri: string} | {html: string | null};

const PostDetailContainer: React.FC<PostDetailContainerProps> = ({route}) => {
  const {permalink, title} = route?.params;
  const isOnline = useSelector(selectIsOnline);
  const mobileUrl = config.MOBILE_URL + permalink;
  const [isLoading, setIsLoading] = useState(true);
  const [webViewContent, setWebViewContent] = useState<webViewContentProps>({
    uri: mobileUrl,
  });

  useEffect(() => {
    if (isOnline) {
      downloadWebPage(mobileUrl);
    }
  }, [isOnline, mobileUrl]);

  useEffect(() => {
    const loadContent = async () => {
      if (!isOnline) {
        const savedContent = await loadSavedWebPage(mobileUrl);
        setWebViewContent({html: savedContent});
        setIsLoading(false);
      }
    };

    loadContent();
  }, [isOnline, mobileUrl, setIsLoading]);

  return (
    <PostDetail
      webViewContent={webViewContent}
      title={title}
      isOnline={isOnline}
      isLoading={isLoading}
      setIsLoading={setIsLoading}
    />
  );
};

export default PostDetailContainer;
