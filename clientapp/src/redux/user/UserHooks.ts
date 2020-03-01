import {useSelector} from "react-redux";
import { RootState } from "../Store";

const useLoggedIn = () =>
    useSelector((state : RootState) => state.user.loggedIn);