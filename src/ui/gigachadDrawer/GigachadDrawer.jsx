import {ActionsheetBackdrop, Box, config} from "@gluestack-ui/themed";
import {Modal, TouchableOpacity} from "react-native";
import Svg, {Path} from "react-native-svg";
import React from "react";

const GigachadDrawer = ({ isOpen, close, children }) => {
  return (
    <>
      {isOpen && <ActionsheetBackdrop/>}
      <Modal
        visible={isOpen}
        onRequestClose={close}
        animationType="slide"
        transparent={true}
      >
        <Box
          position={'absolute'}
          left={0}
          right={0}
          bottom={0}
          top={80}
          bg={config.theme.tokens.colors.secondary600}
          borderTopRightRadius={20}
          borderTopLeftRadius={20}
          height={'100%'}
        >
          <TouchableOpacity onPress={close}>
            <Box
              borderRadius={25}
              backgroundColor={'$secondary700'}
              display={'flex'}
              height={50}
              width={50}
              position={'absolute'}
              top={-65}
              right={0}
              mr={10}
              justifyContent={'center'}
              alignItems={'center'}
            >
              <Svg width={40} height={40} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <Path
                  d="M6.99486 7.00636C6.60433 7.39689 6.60433 8.03005 6.99486 8.42058L10.58 12.0057L6.99486 15.5909C6.60433 15.9814 6.60433 16.6146 6.99486 17.0051C7.38538 17.3956 8.01855 17.3956 8.40907 17.0051L11.9942 13.4199L15.5794 17.0051C15.9699 17.3956 16.6031 17.3956 16.9936 17.0051C17.3841 16.6146 17.3841 15.9814 16.9936 15.5909L13.4084 12.0057L16.9936 8.42059C17.3841 8.03007 17.3841 7.3969 16.9936 7.00638C16.603 6.61585 15.9699 6.61585 15.5794 7.00638L11.9942 10.5915L8.40907 7.00636C8.01855 6.61584 7.38538 6.61584 6.99486 7.00636Z"
                  fill={config.theme.tokens.colors.secondary200}
                />
              </Svg>
            </Box>
          </TouchableOpacity>
          {isOpen && <Box p={20} height={'100%'}>
            {children}
          </Box>}
        </Box>
      </Modal>
    </>
  )
}

export default GigachadDrawer;