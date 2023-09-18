export interface IUser {
    userid: string,
    name: string,
    gender: GenderTypes
}

export type GenderTypes = 'man' | 'woman';