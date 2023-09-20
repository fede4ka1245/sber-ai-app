import React, {useCallback} from 'react';
import {Alert, Box, Text, VStack} from "@gluestack-ui/themed";
import GigachadLabelButton from "../../../../ui/gigachadLabelButton/GigachadLabelButton";
import {useImageLoadingPhase} from "../../hooks/useImageLoadingPhase";
import {loadImage, requestReadPermission} from "../../store/slices/imageProcessingSlice";
import {useDispatch} from "react-redux";

const GigachadImageLoader = () => {
  const {
    isAccessDenied,
    isAccessBlocked,
    isAccessLimited,
    isPhotoNotLoad,
  } = useImageLoadingPhase();
  const dispatch = useDispatch();

  const requestPermissions = useCallback(() => {
    dispatch(requestReadPermission());
  }, []);

  const getPhoto = useCallback(() => {
    dispatch(loadImage());
  }, []);

  const takePhoto = useCallback(() => {
    dispatch(loadImage(true));
  }, []);

  return (
    <>
      {isAccessDenied && <Box mt={16}>
        <Alert action="error" borderRadius={'$xl'}>
          <VStack minHeight={80}>
            <Text fontWeight="$bold" mb={8}>Permissions Denied!</Text>
            <Text>
              Can not get photos from your device.
            </Text>
            <Text>
              Get access to your photo library!
            </Text>
          </VStack>
        </Alert>
        <Box mt={8} backgroundColor={'$secondary700'} borderRadius={'$xl'}>
          <GigachadLabelButton
            onPress={requestPermissions}
            label={'Get Access'}
          />
        </Box>
      </Box>}
      {isAccessBlocked && <Box mt={16}>
        <Alert action="error" borderRadius={'$xl'}>
          <VStack minHeight={80}>
            <Text fontWeight="$bold" mb={8}>Permissions Bloked!</Text>
            <Text>
              Change your app settings to load photo from whole library!
            </Text>
          </VStack>
        </Alert>
        <Box mt={8} backgroundColor={'$secondary700'} borderRadius={'$xl'}>
          <GigachadLabelButton
            onPress={requestPermissions}
            label={'Get Access'}
          />
        </Box>
      </Box>}
      {isAccessLimited && <Box mt={16}>
        <Alert action="warning" borderRadius={'$xl'}>
          <VStack>
            <Text fontWeight="$bold" mb={8}>Access given to limited photos!</Text>
            <Text>
              You can pick photos only from your limited collection.
            </Text>
            <Text>
              Change your app settings to load photo from whole library!
            </Text>
          </VStack>
        </Alert>
        <Box mt={8} backgroundColor={'$secondary700'} borderRadius={'$xl'}>
          <GigachadLabelButton
            onPress={getPhoto}
            label={'Load photo!'}
          />
          <GigachadLabelButton
            onPress={getPhoto}
            label={'Load photo!'}
          />
        </Box>
      </Box>}
      {isPhotoNotLoad && <>
        <Box mt={8} backgroundColor={'$secondary700'} borderRadius={'$xl'}>
          <GigachadLabelButton
            onPress={getPhoto}
            label={'Load photo!'}
          />
          <GigachadLabelButton
            onPress={takePhoto}
            label={'Take photo!'}
          />
        </Box>
      </>}
    </>
  );
};

export default GigachadImageLoader;