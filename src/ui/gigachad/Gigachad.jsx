import React from 'react';
import {Image} from "@gluestack-ui/themed";
import gigachad from './gigachadImage.png';

const Gigachad = () => {
  return (
    <>
      <Image
        size="2xl"
        borderRadius="$xl"
        source={gigachad}
      />
    </>
  );
};

export default Gigachad;