import {eventBus} from "../eventBus/eventBus";
import {eventBusEvent} from "../eventBus/eventBusEvent";
import {detect} from "./api/detect";

export const processImage = (image, webView) => {
  return new Promise(async (resolve) => {
    eventBus.once(eventBusEvent.onImageProcessed, (data) => {
      resolve(data);
    });
    const result = await detect(image);

    webView.injectJavaScript(`    
      function filterPhoto(image) {
        return new Promise((resolve, reject) => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext('2d');
          const targetImage = new Image();
      
          targetImage.onload = () => {
            canvas.width = targetImage.width;
            canvas.height = targetImage.height;
            ctx.drawImage(targetImage, 0, 0);
                        
            ctx.lineWidth = 10;
            ctx.strokeStyle = "#1A91FF";
            
            for (const { x, y, width, height, group } of ${JSON.stringify(result)}) {
                ctx.strokeRect(x, y, width, height);
                ctx.font = "bold 100px Arial";
                ctx.fillStyle = "#1A91FF";
                ctx.fillText(group, x, y - 50);
            }
            
            const dataUrl = canvas.toDataURL("base64");
            resolve(dataUrl);
          };
          targetImage.src = image;
        });
      }
      
      filterPhoto("${image}")
        .then((result) => window.ReactNativeWebView.postMessage(result))
        .catch((error) => window.ReactNativeWebView.postMessage(''))
    `);
  });
}