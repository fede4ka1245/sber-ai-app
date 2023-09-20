import Permissions, {PERMISSIONS} from "react-native-permissions";
import {launchImageLibrary} from "react-native-image-picker";
import {launchCamera} from "react-native-image-picker/src";

export class ImageLoader {
  constructor() {}

  requestPermissions = () => {
    return Permissions.request(PERMISSIONS.IOS.PHOTO_LIBRARY)
      .then(response => {
        return response;
      });
  }

  getPhoto = (isCamera = false) => {
    if (isCamera) {
      return launchCamera({
        selectionLimit: 1,
        includeBase64: true,
        mediaType: "photo",
        quality: 0.5
      })
        .then((res) => {
          if (!res.assets[0]) {
            return;
          }

          return 'data:image/jpeg;base64,' + res.assets[0].base64;
        })
    }

    return launchImageLibrary({
      selectionLimit: 1,
      includeBase64: true,
      mediaType: "photo",
      quality: 0.5
    })
      .then((res) => {
        if (!res.assets[0]) {
          return;
        }

        return 'data:image/jpeg;base64,' + res.assets[0].base64;
      })
  }

  checkPermissions = () => {
    return Permissions.check(PERMISSIONS.IOS.PHOTO_LIBRARY)
      .then(response => {
        return response;
      });
  }

  initialProcess = async () => {
    let result = await this.checkPermissions();

    if (result === Permissions.RESULTS.BLOCKED || result === Permissions.RESULTS.UNAVAILABLE) {
      return {
        permission: result,
        image: null
      };
    } else if (result === Permissions.RESULTS.DENIED) {
      result = await this.requestPermissions();
    }

    const image = await this.getPhoto();

    if (result === Permissions.RESULTS.LIMITED || !image) {
      return {
        permission: result,
        image: null
      };
    }

    return {
      permission: result,
      image: image
    };
  }
}

export class ImageLoaderIos extends ImageLoader {}

export class ImageLoaderAndroid extends ImageLoader {
  checkPermissions = () => {
    return Permissions.RESULTS.GRANTED;
  }

  requestPermissions = () => {
    return Permissions.RESULTS.GRANTED;
  }

  initialProcess = async () => {
    const result = this.requestPermissions();

    try {
      const image = await launchImageLibrary({
        selectionLimit: 1,
        includeBase64: true,
        mediaType: "photo",
        image
      })
        .then((res) => {
          if (!res.assets[0]) {
            return;
          }

          return 'data:image/jpeg;base64,' + res.assets[0].base64;
        })

      if (!image) {
        return {
          permission: result,
          image: undefined
        };
      }

      return {
        permission: result,
        image: image
      };
    } catch {
      return {
        permission: result,
        image: undefined
      };
    }
  }
}