export const detect = async (image) => {
  const formData = new FormData();
  formData.append("image", {uri: image, name: 'image.jpg', type: 'image/png'})

  const requestOptions = {
    method: 'POST',
    body: formData,
    redirect: 'follow'
  };

  return fetch("https://surdogram.ru/api/detect_weed", requestOptions)
    .then(response => response.json())
    .then((data) => {
      return [...data.boxes.map((array) => {
        return {
          x: array[0],
          y: array[1],
          width: array[2],
          height: array[3],
          group: array[4]
        }
      })];
    });
};
