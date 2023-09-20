import React from 'react';
import {Avatar, AvatarImage, Box, Heading, Text} from "@gluestack-ui/themed";

const GigachadCard = ({ source, name, about }) => {
  return (
    <>
      <Box
        p={16}
        display={'flex'}
        flexDirection={'row'}
        backgroundColor={'$secondary700'}
        borderRadius={'$xl'}
        minHeight={90}
      >
        <Avatar size={'lg'}>
          <AvatarImage source={source} />
        </Avatar>
        <Box ml={16} display={'flex'} flexDirection={'column'}>
          <Heading size={"md"}>
            {name}
          </Heading>
          <Text size={'sm'}>
            {about}
          </Text>
        </Box>
      </Box>
    </>
  );
};

export default GigachadCard;