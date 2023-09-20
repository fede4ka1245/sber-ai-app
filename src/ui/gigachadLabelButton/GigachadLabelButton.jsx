import {TouchableOpacity, Spi, ActivityIndicator} from "react-native";
import {Box, Center, config, Text} from "@gluestack-ui/themed";
import React from "react";
import cn from 'react-native-classnames';

const styles = {
  disabled: {
    pointerEvents: 'none',
    position: 'relative',
    overflow: 'hidden'
  },
  disabledBrightness: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    left: 0,
    top: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    overflow: 'hidden',
    zIndex: 10
  }
}

const GigachadLabelButton = ({ label, icon, onPress, disabled, isSaving }) => {
  return (
    <TouchableOpacity style={cn(styles, { disabled: disabled || isSaving })} onPress={onPress}>
      <Box p={20} display={'flex'} flexDirection={'row'} alignItems={'end'}>
        {icon && <Center mr={16}>
          {icon}
        </Center>}
        <Text bold size={'xl'}>
          {label}
        </Text>
      </Box>
      <Box style={cn(styles, { disabledBrightness: disabled || isSaving })} />
      {isSaving && <Box
        display={'flex'}
        justifyContent={'center'} alignItems={'center'}
        position={'absolute'}
        width={'100%'} height={'100%'}
        zIndex={11}
      >
        <ActivityIndicator size={30} color={config.theme.tokens.colors.primary500}/>
      </Box>}
    </TouchableOpacity>
  );
};

export default GigachadLabelButton;