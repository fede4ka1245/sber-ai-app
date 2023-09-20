import {Box, Heading} from "@gluestack-ui/themed";
import React from "react";
import { gigachads } from "./consts/gigachads";
import GigachadCard from "./components/gigachadCard/GigachadCard";

const AboutGigachads = () => {
  return (
    <>
      <Heading size={"2xl"} mb={16}>
        Gigachad'ы team
      </Heading>
      {gigachads.map(({ about, name, image }) => (
        <Box mb={8} key={name}>
          <GigachadCard
            about={about}
            name={name}
            source={image}
          />
        </Box>
      ))}
    </>
  )
}

export default AboutGigachads;