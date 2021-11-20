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

export enum CategoryEnum {
    CLOTHING = "Clothing",
    BAGS = "Bags",
    KNITS = "Knits",
    HOME = "Home"
}