import React, {useCallback, useEffect, useLayoutEffect, useState} from 'react';
import {tabs} from "../../consts/tabs";
import GigachadImageSaver from "../gigachadImageSaver/GigachadImageSaver";
import {Box, Heading} from "@gluestack-ui/themed";
import GigachadSkeleton from "../../../../ui/gigachadSkeleton/GigachadSkeleton";
import ImageDifference from "../../../../components/imageDifference/ImageDifference";
import {useDispatch, useSelector} from "react-redux";
import {useImageLoadingPhase} from "../../hooks/useImageLoadingPhase";
import {resetMain} from "../../store/slices/mainSlice";
import {
  initialImageLoading,
  processImage,
  resetImageProcessing, toggleProcessing
} from "../../store/slices/imageProcessingSlice";
import GigachadImageLoader from "../gigachadImageLoader/GigachadImageLoader";
import WebView from "react-native-webview";
import {eventBus} from "../../logic/eventBus/eventBus";
import {eventBusEvent} from "../../logic/eventBus/eventBusEvent";
import GigachadImagesSaved from "../gigachadImagesSaved/GigachadImagesSaved";
import InOutAnimation from "../../../../ui/inOutAnimation/InOutAnimation";
import {InteractionManager, View} from "react-native";
import GigachadImagePresentation from "../gigachadImagePresentation/GigachadImagePresentation";
import {resetImageSaver} from "../../store/slices/imageSaverSlice";

const Root = () => {
  const {
    image
  } = useSelector((state) => state.imageProcessor);
  const {
    tab
  } = useSelector((state) => state.main);
  const {
    isProcessing,
    isSucceed,
  } = useImageLoadingPhase();
  const dispatch = useDispatch();
  const [webView, setWebView] = useState();

  useLayoutEffect(() => {
    return () => {
      dispatch(resetImageSaver());
      dispatch(resetMain());
      dispatch(resetImageProcessing());
    }
  }, []);

  useEffect(() => {
    if (!webView || !image) {
      return;
    }

    dispatch(toggleProcessing())
    setTimeout(() => {
      dispatch(processImage(webView));
    }, 200);
  }, [image, webView]);

  const onSetWebView = useCallback((webView) => {
    setWebView(webView);
  }, []);

  const onMessage = useCallback((event) => {
    eventBus.emit(eventBusEvent.onImageProcessed, null, event.nativeEvent.data);
  }, []);

  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      dispatch(initialImageLoading());
    });
  }, []);

  return (
    <>
      <Box
        style={{ display: 'none', objectFit: 'contain', height: 0, width: 0 }}
      >
        <WebView
          source={{html: '<html><body></body></html>'}}
          ref={onSetWebView}
          onMessage={onMessage}
        />
      </Box>
      <InOutAnimation visible={tab === tabs.imagesSaved}>
        <GigachadImagesSaved />
      </InOutAnimation>
      <InOutAnimation visible={tab === tabs.imageSaver}>
        <GigachadImageSaver />
      </InOutAnimation>
      <InOutAnimation visible={tab === tabs.main}>
        <View>
          <Box mb={16} key={'header'}>
            <Heading size={"2xl"}>
              Gigachad Processor
            </Heading>
          </Box>
          <Box key={'imageLoader'}>
            {!isSucceed && !isProcessing && <GigachadImageLoader />}
          </Box>
          <Box key={'GigachadSkeleton'}>
            {isProcessing && <GigachadSkeleton />}
          </Box>
          <Box key={'ImageDifference'}>
            {isSucceed && <GigachadImagePresentation />}
          </Box>
        </View>
      </InOutAnimation>
    </>
  );
};

export default Root;