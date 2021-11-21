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

export interface INewItemData {
    product: IProduct;
    status?: string;
    picture?: string[];
    price?: number;
    condition: string;
    created: string;
    age?: number;
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
    id: string;
    image?: string;
    originalPrice?: number;
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