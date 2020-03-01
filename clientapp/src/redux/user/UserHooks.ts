import {useSelector} from "react-redux";
import { RootState } from "../Store";

export const useLoggedIn = () =>
    useSelector((state : RootState) => state.user.loggedIn);