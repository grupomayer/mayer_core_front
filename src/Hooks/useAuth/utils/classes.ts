export class AuthData {

    constructor(
        public readonly token: string | null,
        public readonly userId: number | null,
        public authenticate: (token: string, userId: number) => void,
        public deauthenticate: () => void
    ) {}

    isAuthenticated(): boolean {
        return this.token !== null && this.userId !== null;
    }

}