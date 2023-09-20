import {StyleSheet, View} from "react-native";
import {Box, config, Image} from "@gluestack-ui/themed";
import React, {useCallback, useMemo, useState} from "react";
import Slider from "@react-native-community/slider";

const styles = StyleSheet.create({
  image: {
    height: '100%',
    objectFit: 'contain',
    backgroundColor: "rgba(64,64,64,0.5)",
  },
  filteredImage: {
    position: 'absolute',
    objectFit: 'contain',
    left: 0,
    top: 0,
    zIndex: 10,
    height: '100%',
    backgroundColor: "rgba(64,64,64,1)",
  },
})

const ImageDifference = ({ originalImage, changedImage }) => {
  const [state, setState] = useState({
    filteredImageWidth: 0,
    progress: 50,
  });

  const progressPercents = useMemo(() => {
    return `${state.progress}%`;
  }, [state.progress]);

  const isDividerVisible = useMemo(() => {
    return state.progress <= 99 && state.progress >= 1
  }, [state.progress])

  const onProgressChange = useCallback((progress) => {
    setState((prevState) => ({
      ...prevState,
      progress
    }));
  }, []);

  const onLayout = useCallback((event) => {
    const { width } = event.nativeEvent.layout;

    setState((prevState) => ({
      ...prevState,
      filteredImageWidth: width
    }));
  }, []);

  return (
    <Box>
      <Box height={200} overflow={'hidden'} borderRadius={16}>
        <Image
          key={'originalImage'}
          onLayout={onLayout}
          style={styles.image}
          src={originalImage}
        />
        <Box key={'filteredImage'} objectFit={'contain'} left={0} top={0} position={'absolute'} overflow={'hidden'} width={progressPercents} height={'100%'}>
          <Image
            width={state.filteredImageWidth}
            style={styles.filteredImage}
            src={changedImage}
          />
        </Box>
      </Box>
      {isDividerVisible && <Box
        key={'progressPercents'}
        height={220}
        top={'-5%'}
        width={4}
        marginLeft={-4}
        position={'absolute'}
        bg={config.theme.tokens.colors.primary400}
        left={progressPercents}
        borderRadius={3}
      />}
      <Box mt={16} key={'slider'}>
        <Slider
          minimumValue={0}
          maximumValue={100}
          value={state.progress}
          onValueChange={onProgressChange}
          minimumTrackTintColor={config.theme.tokens.colors.primary400}
          maximumTrackTintColor={config.theme.tokens.colors.secondary700}
          thumbTintColor={config.theme.tokens.colors.primary400}
        />
      </Box>
    </Box>
  )
}

export default ImageDifference;