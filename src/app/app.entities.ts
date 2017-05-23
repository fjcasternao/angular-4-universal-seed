export interface UserSummary {
    name: string,
    index: number,
    isActive: boolean,
    balance: string,
    gender: string
}

export interface FullUser {
    index: number,
    guid: string,
    isActive: boolean,
    balance: string,
    picture: string,
    age: number,
    eyeColor: string,
    name: string,
    gender: string,
    company: string,
    email: string,
    phone: string,
    address: string
    about: string,
    registered: Date,
    latitude: number
    longitude: number
    tags: string[],
    favoriteFruit: string
}