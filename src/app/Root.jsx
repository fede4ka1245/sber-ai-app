import React, {useCallback, useMemo} from 'react';
import {Route, Routes, useLocation, useNavigate} from "react-router-native";
import {routes} from "./consts/routes";
import Main from "../pages/main/Main";
import GigachadDrawer from "../ui/gigachadDrawer/GigachadDrawer";
import About from "../pages/about/About";
import {useSearch} from "./hooks/useSearch";
import Gigachad from "../pages/gigachad/Gigachad";

const Root = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const search = useSearch();

  const isAboutOpen = useMemo(() => {
    return search[routes.key.modal] === routes.value.about;
  }, [location]);

  const isGigachadOpen = useMemo(() => {
    return search[routes.key.modal] === routes.value.gigachad;
  }, [location]);

  const back = useCallback(() => {
    navigate(-1);
  }, []);

  return (
    <>
      <Routes>
        <Route
          exact
          path={routes.pathname.main}
          element={<Main />}
        />
      </Routes>
      <GigachadDrawer isOpen={isAboutOpen} close={back}>
        <About />
      </GigachadDrawer>
      <GigachadDrawer isOpen={isGigachadOpen} close={back}>
        <Gigachad />
      </GigachadDrawer>
    </>
  );
};

export default Root;