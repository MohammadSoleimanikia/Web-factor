import type { User } from "./user"

export type AuthContext={
    user : null | User;
    logIn:(user:User)=> void;
    logOut:()=>void;
}