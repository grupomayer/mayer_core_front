import { setHttpToken } from "Http/http";
import { createContext, useContext, useMemo, useState } from "react";
import { AuthData } from "./utils/classes";

const notInitialized = new AuthData(
    null, 
    null,
    (token: string, userId: number): void => {},
    (): void => {}
)

const Auth = createContext<AuthData>(notInitialized);

interface ICreateAuth {
    children: JSX.Element
}
export function CreateAuth({ children }: ICreateAuth) {

    const [token, setToken] = useState<string | null>(null);
    const [userId, setUserId] = useState<number | null>(null);

    function authenticate(token: string, userId: number) {
        setToken(token);
        setUserId(userId);
        setHttpToken(token);
    }

    function deauthenticate() {
        setToken(null);
        setUserId(null);
        setHttpToken(null);
    }

    const initializedUser = useMemo(() => new AuthData(
        token, 
        userId, 
        authenticate, 
        deauthenticate
    ), [token, userId]);

    return <Auth.Provider value={initializedUser}>
        {children}
    </Auth.Provider>
}

export function useAuth(): AuthData {
    return useContext(Auth);
}