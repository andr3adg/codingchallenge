import React, {useEffect, useState} from 'react';
import {Image, ImageProps, StyleProp, ImageStyle} from 'react-native';
import RNFS from 'react-native-fs';
import Loader from '../Loader/Loader';
import {useSelector} from 'react-redux';
import {selectIsOnline} from '../../../modules/network/selectors';

interface CachedImageProps extends Omit<ImageProps, 'source' | 'style'> {
  uri: string;
  style?: StyleProp<ImageStyle>;
}

const CachedImage: React.FC<CachedImageProps> = ({uri, style, ...props}) => {
  const [loading, setLoading] = useState(true);
  const [localUri, setLocalUri] = useState<string | null>(null);
  const isOnline = useSelector(selectIsOnline);

  useEffect(() => {
    const cacheImage = async () => {
      const filename = uri.substring(uri.lastIndexOf('/') + 1);
      const path = `${RNFS.CachesDirectoryPath}/${filename}`;

      try {
        // Check if the image already exists locally
        const fileExists = await RNFS.exists(path);

        if (fileExists) {
          setLocalUri(`file://${path}`);
        } else if (!isOnline) {
          // If the device is offline and the image doesn't exist locally, show placeholder(blank for now))
          setLocalUri('');
        } else {
          // Download the image
          const downloadResult = await RNFS.downloadFile({
            fromUrl: uri,
            toFile: path,
          }).promise;

          if (downloadResult.statusCode === 200) {
            setLocalUri(`file://${path}`);
          } else {
            setLocalUri('');
          }
        }
      } catch (err) {
      } finally {
        setLoading(false);
      }
    };

    cacheImage();
  }, [isOnline, uri]);

  if (loading) {
    return <Loader />;
  }

  return <Image source={{uri: localUri ?? ''}} style={style} {...props} />;
};

export default CachedImage;
