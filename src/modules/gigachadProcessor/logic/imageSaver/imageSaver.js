import RNFS from 'react-native-fs';
import SendIntentAndroid from "react-native-send-intent";
import Permissions, {PERMISSIONS} from "react-native-permissions";

export class ImageSaver {
  constructor() {}

  static getDocumentDirectory = () => {
    return RNFS.DownloadDirectoryPath.replace(RNFS.ExternalStorageDirectoryPath, '');
  }

  static isAndroidValidPath = (path) => {
    const androidPathRegex = /^(\/storage\/[a-zA-Z0-9._-]+(\/[a-zA-Z0-9._-]+)*)|(\/mnt\/[a-zA-Z0-9._-]+(\/[a-zA-Z0-9._-]+)*)$/;

    if (!androidPathRegex.test(path)) {
      return false;
    }

    const specialCharacters = /[$; ]/;
    if (specialCharacters.test(path)) {
      return false;
    }

    return true;
  }

  static isPathValid = (path, isManagePermitted = true) => {
    let layoutPath = RNFS.ExternalStorageDirectoryPath;

    if (path[0] !== '/') {
      layoutPath += '/' + path.replace(RNFS.ExternalStorageDirectoryPath, '');
    } else {
      layoutPath += path.replace(RNFS.ExternalStorageDirectoryPath, '');
    }

    if (
      !isManagePermitted &&
      !(
        layoutPath.includes(RNFS.DownloadDirectoryPath) ||
        layoutPath.includes(RNFS.ExternalDirectoryPath)
      )
    ) {
      return {
        isPathValid: false,
        pathInvalidMessage: 'No rights for this folder'
      }
    }

    return {
      isPathValid: this.isAndroidValidPath(layoutPath),
      pathInvalidMessage: 'Invalid folder name'
    };
  }

  static openImage = async (path) => {
    let layoutPath = RNFS.ExternalStorageDirectoryPath;

    if (path[0] !== '/') {
      layoutPath += '/' + path;
    } else {
      layoutPath += path;
    }

    if (layoutPath[layoutPath.length - 1] !== '/') {
      layoutPath += '/';
    }

    SendIntentAndroid.openFileChooser(
      {
        fileUrl: layoutPath,
        type: "image/*",
      },
      "Open Image with:"
    );
  }

  static checkWriteExternalStoragePermission = async () => {
    const result = await Permissions.check(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
    return result;
  }

  static requestWriteExternalStoragePermission = async () => {
    return await Permissions.request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
  }

  static saveImage = async (path, imageName, imageBase64) => {
    let layoutPath = RNFS.ExternalStorageDirectoryPath;

    if (path[0] !== '/') {
      layoutPath += '/' + path;
    } else {
      layoutPath += path;
    }

    if (!imageBase64) {
      return;
    }

    if (layoutPath[layoutPath.length - 1] !== '/') {
      layoutPath += '/';
    }

    const stack = layoutPath.split('/');
    const notCreatedFolders = [];
    while (stack.length !== 0) {
      const isExists = await RNFS.exists(stack.join('/'));
      if (isExists) {
        break;
      }

      const notCreatedFolder = stack.pop();

      if (notCreatedFolder) {
        notCreatedFolders.push(notCreatedFolder);
      }
    }

    for (const notCreatedFolder of notCreatedFolders.reverse()) {
      await RNFS.mkdir(stack.join('/') + '/'+ notCreatedFolder);
      stack.push(notCreatedFolder);
    }

    layoutPath += imageName;

    return await RNFS.writeFile('file://' + layoutPath, imageBase64.split("base64,")[1], 'base64');
  }
}