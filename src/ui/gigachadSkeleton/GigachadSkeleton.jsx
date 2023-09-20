import React from 'react';
import ContentLoader, { Rect, Circle, Facebook } from 'react-content-loader/native'
import {config} from "@gluestack-ui/themed";

const GigachadSkeleton = () => {
  return (
    <>
      <ContentLoader
        backgroundColor={config.theme.tokens.colors.secondary400}
      >
        <Rect x="0" y="0" rx="20" ry="20" width="100%" height="120" />
        <Rect x="0" y="128" rx="20" ry="20" width="100%" height="80" />
        <Rect x="0" y="216" rx="20" ry="20" width="100%" height="60" />
      </ContentLoader>
    </>
  );
};

export default GigachadSkeleton;