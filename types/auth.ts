export type loginRequest = {
    email: string;
    password: string;
}

export type loginResponse = {
    success: boolean;
    message: string;
    token?: string;
    user?: {
        id: number;
        name: string;
        email: string;
        role: string;

}

}
