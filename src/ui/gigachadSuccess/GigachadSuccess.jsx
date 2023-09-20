import React from 'react';
import {Image} from "@gluestack-ui/themed";
import gigachad from "./gigachadSuccess.png";

const GigachadSuccess = () => {
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

export default GigachadSuccess;