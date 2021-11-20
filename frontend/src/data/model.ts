export interface IItem {
    product: IProduct;
    owner: IUser;
    status?: string;
    age: number;
    picture: string[];
    price?: string;
    condition: string;
    created: string;
    size: string;
    forSale?: boolean;
    forSwap?: boolean;
}

export interface ICategory {
    name: string;
    id: string;
    parent?: ICategory;
}

export interface IProduct {
    category: ICategory;
    print: string;
    name: string;
}

export interface IUser {
    name: string;
    size: string;
    zipCode: string;
    id: string;
}

export enum CategoryEnum {
    CLOTHING = "Clothing",
    BAGS = "Bags",
    KNITS = "Knits",
    HOME = "Home"
}