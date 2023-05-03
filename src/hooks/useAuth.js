import { useSelector } from "react-redux";
import { selectUserAuth } from "../features/auth/authSelector";

export default function useAuth() {
    const auth = useSelector(selectUserAuth);

    if (auth?.accessToken && auth?.user) {
        return true;
    } else {
        return false;
    }
}
