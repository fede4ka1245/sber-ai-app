import React, {useCallback} from 'react';
import {Box, config, Heading} from "@gluestack-ui/themed";
import Gigachad from "../../ui/gigachad/Gigachad";
import GigachadLabelButton from "../../ui/gigachadLabelButton/GigachadLabelButton";
import DocumentIcon from "../../ui/documentIcon/DocumentIcon";
import AboutIcon from "../../ui/aboutIcon/AboutIcon";
import {useNavigate} from "react-router-native";
import {routes} from "../../app/consts/routes";

const Main = () => {
  const navigate = useNavigate();

  const openGigachad = useCallback(() => {
    navigate({
      pathname: routes.pathname.main,
      search: `?${routes.key.modal}=${routes.value.gigachad}`
    })
  }, []);

  const openAbout = useCallback(() => {
    navigate({
      pathname: routes.pathname.main,
      search: `?${routes.key.modal}=${routes.value.about}`
    })
  }, []);

  return (
    <Box
      height={'100%'}
      sx={{
        backgroundColor: config.theme.tokens.colors.secondary600
      }}
    >
      <Box>
        <Box
          height={65}
          justifyContent={'center'}
          sx={{
            backgroundColor: config.theme.tokens.colors.secondary700,
          }}
        >
          <Box ml={16}>
            <Heading size={"2xl"}>
              Gigachad
            </Heading>
          </Box>
        </Box>
      </Box>
      <Box ml={16} mr={16}>
        <Box m={16} justifyContent={'center'} alignItems={'center'}>
          <Gigachad />
        </Box>
        <Box mt={20} backgroundColor={'$secondary700'} borderRadius={'$xl'}>
          <GigachadLabelButton
            onPress={openGigachad}
            label={'Process photo'}
            icon={<AboutIcon />}
          />
          <GigachadLabelButton
            onPress={openAbout}
            label={'About us'}
            icon={<DocumentIcon />}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Main;