import {useLocation} from "react-router-native";
import {useMemo} from "react";
import {getObjectFromSearch} from "../helpers/getObjectFromSearch";

export const useSearch = () => {
  const location = useLocation()

  return useMemo(() => {
    return getObjectFromSearch(location.search);
  }, [location.search]);
}