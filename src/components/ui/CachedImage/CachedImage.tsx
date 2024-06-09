import React, {useEffect, useState} from 'react';
import {Image, ImageProps, StyleProp, ImageStyle} from 'react-native';
import Loader from '../Loader/Loader';
import {useSelector} from 'react-redux';
import {selectIsOnline} from '../../../modules/network/selectors';
import {cacheImage} from '../../../utils/misc';

interface CachedImageProps extends Omit<ImageProps, 'source' | 'style'> {
  uri: string;
  style?: StyleProp<ImageStyle>;
}

const CachedImage: React.FC<CachedImageProps> = ({uri, style, ...props}) => {
  const [loading, setLoading] = useState(true);
  const [localUri, setLocalUri] = useState<string | null>(null);
  const isOnline = useSelector(selectIsOnline);

  useEffect(() => {
    const handleImage = async () => {
      const image = await cacheImage(uri, isOnline);
      setLocalUri(image);
      setLoading(false);
    };
    handleImage();
  }, [isOnline, uri]);

  if (loading) {
    return <Loader />;
  }

  return <Image source={{uri: localUri ?? ''}} style={style} {...props} />;
};

export default CachedImage;
