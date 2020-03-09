export interface User{
    userName: string,
    email: string,
    firstName: string,
    lastName: string
}

export interface UserDetailed extends User{
    introduction: string,
}