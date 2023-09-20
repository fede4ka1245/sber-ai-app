import React, {useCallback} from 'react';
import ImageDifference from "../../../../components/imageDifference/ImageDifference";
import {Box} from "@gluestack-ui/themed";
import GigachadLabelButton from "../../../../ui/gigachadLabelButton/GigachadLabelButton";
import FolderIcon from "../../../../ui/folderIcon/FolderIcon";
import {openImageSaver} from "../../store/slices/mainSlice";
import {useDispatch, useSelector} from "react-redux";
import {initManagePermission} from "../../store/slices/imageSaverSlice";

const GigachadImagePresentation = () => {
  const {
    image,
    processedImage
  } = useSelector((state) => state.imageProcessor);
  const dispatch = useDispatch();
  const onOpenImageSaver = useCallback(() => {
    dispatch(initManagePermission())
      .then((result) => {
        dispatch(openImageSaver());
      })
  }, []);

  return (
    <>
      <ImageDifference
        changedImage={processedImage}
        originalImage={image}
      />
      <Box mt={8} backgroundColor={'$secondary700'} borderRadius={'$xl'}>
        <GigachadLabelButton
          onPress={onOpenImageSaver}
          label={'Save photos'}
          icon={<FolderIcon />}
        />
      </Box>
    </>
  );
};

export default GigachadImagePresentation;