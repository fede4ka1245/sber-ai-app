import React, {useCallback, useMemo} from 'react';
import {Alert, Box, config, Heading, Input, InputField, Text, VStack} from "@gluestack-ui/themed";
import GigachadLabelButton from "../../../../ui/gigachadLabelButton/GigachadLabelButton";
import LeftIcon from "../../../../ui/leftIcon/LeftIcon";
import {Keyboard, TouchableOpacity, TouchableWithoutFeedback} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {openGigachad, openImagesSaved} from "../../store/slices/mainSlice";
import {
  setPath,
  setWriteExternalStorageResponse,
  toggleLoading
} from "../../store/slices/imageSaverSlice";
import {ImageSaver} from "../../logic/imageSaver/imageSaver";
import Permissions from "react-native-permissions";

const GigachadImageSaver = () => {
  const {
    path,
    isLoading,
    isManageExternalStoragePermitted,
    writeExternalStorageResponse,
    originalImageName,
    processedImageName
  } = useSelector((state) => state.imageSaver);
  const dispatch = useDispatch();
  const {
    image,
    processedImage
  } = useSelector((state) => state.imageProcessor);

  const onInputPathChange = useCallback((path) => {
    dispatch(setPath(path));
  }, []);

  const onOpenMain = useCallback(() => {
    dispatch(openGigachad());
  }, []);

  const saveImages = useCallback(async () => {
    dispatch(toggleLoading());

    if (!isManageExternalStoragePermitted) {
      await ImageSaver.requestWriteExternalStoragePermission();
    }

    try {
      await ImageSaver.saveImage(path, originalImageName, image);
      await ImageSaver.saveImage(path, processedImageName, processedImage);
      dispatch(openImagesSaved());
    } finally {
      dispatch(toggleLoading());

      let writeExternalStoragePermission = await ImageSaver.checkWriteExternalStoragePermission();
      dispatch(setWriteExternalStorageResponse(writeExternalStoragePermission));
    }
  }, [path, originalImageName, processedImageName, image, processedImage]);

  const {
    isPathValid,
    pathInvalidMessage
  } = useMemo(() => {
    if (isLoading) {
      return {
        isPathValid: true
      };
    }

    return ImageSaver.isPathValid(path, isManageExternalStoragePermitted);
  }, [path, isManageExternalStoragePermitted, isLoading]);

  const isGigachadButtonDisabled = useMemo(() => {
    return (
      (!isPathValid ||
      writeExternalStorageResponse === Permissions.RESULTS.DENIED &&
      !isManageExternalStoragePermitted ||
      (!isManageExternalStoragePermitted && writeExternalStorageResponse === Permissions.RESULTS.BLOCKED)) &&
      !isLoading
    );
  }, [isPathValid, writeExternalStorageResponse, isManageExternalStoragePermitted, isLoading]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Box height={'100%'}>
        <Box
          display={'flex'}
          flexDirection={'row'}
          alignItems={'center'}
        >
          <Box mr={8}>
            <TouchableOpacity onPress={onOpenMain}>
              <LeftIcon />
            </TouchableOpacity>
          </Box>
          <Heading size={"2xl"}>
            Save photos
          </Heading>
        </Box>
        <Box mb={8} mt={16}>
          <Box
            height={25}
            display={'flex'}
            flexDirection={'row'}
          >
            <Text fontWeight={'bold'} type={'error'} color={config.theme.tokens.colors.secondary200}>
              Target directory
            </Text>
            {!isPathValid && (
              <Text ml={'auto'} fontWeight={'bold'} type={'error'} color={config.theme.tokens.colors.red500}>
                {pathInvalidMessage}
              </Text>
            )}
          </Box>
          <Input
            size="xl"
            isDisabled={false}
            isInvalid={!isPathValid}
            isReadOnly={false}
            borderRadius={'$2xl'}
            bg={config.theme.tokens.colors.secondary700}
          >
            <InputField
              onChangeText={onInputPathChange}
              value={path}
              placeholder="Target directory"
            />
          </Input>
        </Box>
        <Box mb={8}>
          <Box
            height={25}
            display={'flex'}
            flexDirection={'row'}
          >
            <Text fontWeight={'bold'} type={'error'} color={config.theme.tokens.colors.secondary200}>
              Original image
            </Text>
          </Box>
          <Input
            size="xl"
            isDisabled={true}
            isInvalid={false}
            isReadOnly={false}
            borderRadius={'$2xl'}
            placeholder={"Original image"}
            bg={config.theme.tokens.colors.secondary700}
          >
            <InputField disable value={originalImageName} placeholder="Original image" />
          </Input>
        </Box>
        <Box mb={8}>
          <Box
            height={25}
            display={'flex'}
            flexDirection={'row'}
          >
            <Text fontWeight={'bold'} type={'error'} color={config.theme.tokens.colors.secondary200}>
              Processed image
            </Text>
          </Box>
          <Input
            size="xl"
            isDisabled={true}
            isInvalid={false}
            isReadOnly={false}
            borderRadius={'$2xl'}
            placeholder={"Processed image"}
            disabled
            bg={config.theme.tokens.colors.secondary700}
          >
            <InputField disable value={processedImageName} placeholder={"Processed image"} />
          </Input>
        </Box>
        <Box mt={8} backgroundColor={'$secondary700'} borderRadius={'$xl'} overflow={'hidden'}>
          <GigachadLabelButton
            isSaving={isLoading}
            onPress={saveImages}
            disabled={isGigachadButtonDisabled}
            label={'Save photos!'}
          />
        </Box>
        {(!isManageExternalStoragePermitted && writeExternalStorageResponse === Permissions.RESULTS.BLOCKED) && <Box mt={8}>
          <Alert action="error" borderRadius={'$xl'}>
            <VStack minHeight={80}>
              <Text fontWeight="$bold" mb={8}>Permissions Bloked!</Text>
              <Text>
                Change your app settings to load photo from whole library!
              </Text>
            </VStack>
          </Alert>
        </Box>}
      </Box>
    </TouchableWithoutFeedback>
  );
};

export default GigachadImageSaver;