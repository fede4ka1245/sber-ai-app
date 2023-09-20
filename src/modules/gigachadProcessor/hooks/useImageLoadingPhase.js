import {useSelector} from "react-redux";
import {useMemo} from "react";
import Permissions from "react-native-permissions";
import {Platform} from "react-native";

export const useImageLoadingPhase = () => {
  const state = useSelector((state) => state.imageProcessor);

  return useMemo(() => {
    return {
      isProcessing: state.isProcessing,
      isAccessDenied: !state.isProcessing && !state.image && state.permissionResponse === Permissions.RESULTS.DENIED,
      isAccessBlocked: !state.isProcessing && !state.image && state.permissionResponse === Permissions.RESULTS.BLOCKED,
      isAccessLimited: !state.isProcessing && !state.image && state.permissionResponse === Permissions.RESULTS.LIMITED,
      isPhotoNotLoad: !state.isProcessing && (state.permissionResponse === Permissions.RESULTS.GRANTED || Platform.OS === 'android') && !state.image && !state.processedImage,
      isSucceed: state.image && state.processedImage
    }
  }, [state]);
}