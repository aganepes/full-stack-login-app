export type User={
    id?:number | undefined,
    email:string,
    name?:string | undefined,
    password:string,
    createAt?:string | undefined,
    updateAt?:string | undefined
}
export type ApiError = {
    error: string;
    success:boolean;
};
export type ApiResponse = {
    message: string;
    user?:User | undefined;
    success:boolean;
};