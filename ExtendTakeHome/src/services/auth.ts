import axios from "axios";
import { urlUtils } from "../utils/urlUtils";

export class Auth {
    static token?: string;
    static refreshToken?: string;

    static login(email: string, password: string, postLoginAction: () => void, errorAction: (message: string) => void) {
        axios.defaults.headers.common["Authorization"] = "";

        axios.post(urlUtils.getUrl("signin"), { email, password }).then(r => {
            axios.defaults.headers.common['Authorization'] = `Bearer ${r.data.token}`;
            postLoginAction();
        }).catch((r) => {
            if (r.response.data.error) {
                errorAction(r.response.data.error);
                return;
            }
            errorAction("Unable to log in.");
        });
    }

    static logout(postLogoutAction: () => void) {
        axios.delete(urlUtils.getUrl("signout")).then(() => {
            axios.defaults.headers.common["Authorization"] = "";
            postLogoutAction();
        });
    }
}