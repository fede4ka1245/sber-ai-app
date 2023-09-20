import React, {useEffect, useRef, useState} from 'react';
import * as Animatable from 'react-native-animatable';

const InOutAnimation = ({ visible, children }) => {
  const [showView, setShowView] = useState(visible);
  const viewAnimation = useRef(null);

  useEffect(() => {
    const Animation = async () => {
      if (visible) {
        setShowView(true);
        if (viewAnimation.current) {
          await viewAnimation.current.bounceInRight(350);
        }
      } else {
        setShowView(false)
      }
    }

    Animation();
  }, [visible, viewAnimation]);

  return (
    <Animatable.View ref={viewAnimation}>
      {showView && children}
    </Animatable.View>
  );
};

export default InOutAnimation;