import {GenderTypes} from "./user";

export interface  IUsersOrganization {
    name: string,
    position: string
}

export interface IUsersInfo {
    userid: string,
    name: string,
    birthdate: string,
    age: number,
    organization: IUsersOrganization
}

export interface IUserJobPositions {
    name: string,
    position: string,
    age: number,
    gender: GenderTypes
}