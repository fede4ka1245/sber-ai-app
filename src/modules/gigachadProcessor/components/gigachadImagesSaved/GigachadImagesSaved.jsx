import React, {useCallback} from 'react';
import {Box, Center, Heading} from "@gluestack-ui/themed";
import Gigachad from "../../../../ui/gigachad/Gigachad";
import GigachadLabelButton from "../../../../ui/gigachadLabelButton/GigachadLabelButton";
import {useDispatch, useSelector} from "react-redux";
import {openFile} from "../../store/slices/imageSaverSlice";
import GigachadSuccess from "../../../../ui/gigachadSuccess/GigachadSuccess";

const GigachadImagesSaved = () => {
  const dispatch = useDispatch();
  const {
    path,
    originalImageName,
    processedImageName
  } = useSelector((state) => state.imageSaver);

  const openOriginalImage = useCallback(() => {
    let fullPath = path;

    if (!path.endsWith('/')) {
      fullPath += '/';
    }

    dispatch(openFile(fullPath + originalImageName));
  }, [originalImageName]);

  const openProcessedImage = useCallback(() => {
    let fullPath = path;

    if (!path.endsWith('/')) {
      fullPath += '/';
    }

    dispatch(openFile(fullPath + processedImageName));
  }, [originalImageName]);

  return (
    <>
      <Box mb={16}>
        <Heading size={"2xl"}>
          Images saved!
        </Heading>
      </Box>
      <Center mt={16}>
        <GigachadSuccess />
      </Center>
      <Box mt={16} backgroundColor={'$secondary700'} borderRadius={'$xl'} overflow={'hidden'}>
        <GigachadLabelButton
          label={'Open processed image'}
          onPress={openProcessedImage}
        />
        <GigachadLabelButton
          label={'Open original image'}
          onPress={openOriginalImage}
        />
      </Box>
    </>
  );
};

export default GigachadImagesSaved;