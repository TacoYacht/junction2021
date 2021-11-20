export interface IItem {
    product: IProduct;
    owner: any;
    status: string;
    age: number;
    picture: string[];
    price?: string;
    condition: string;
    created: string;
    size: string;
}

export interface IProduct {
    category: string;
    print: string;
    name: string;
}

export enum CategoryEnum {
    CLOTHING = "Clothing",
    BAGS = "Bags",
    HOME = "Home"
}