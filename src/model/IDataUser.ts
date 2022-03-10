export interface IDataUserWithGoogle {
    id: string;
    email: string;
    given_name: string;
    picture: string;
}

export interface IDataUserWithApple {
    id: string;
    email: string;
    fullName: { givenName: string };
}
