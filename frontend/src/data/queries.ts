import axios from "axios";
import { CategoryEnum, IItem, ICategory, IProduct } from "./model";

export async function getFilteredItems(category?: CategoryEnum): Promise<IItem[] | undefined> {
    try {
        const response = await axios.get("/api/items");

        if (!category) {
            return response.data;
        } else {
            return response.data.filter((item: IItem) => {
                return item.product.category && item.product.category.name === category || (item.product.category && item.product.category.parent && item.product.category.parent.name === category);
            });
        }
    } catch (e) {
        console.log(e);
    }
}

export async function getMyItems(): Promise<IItem[] | undefined> {
    const userName = "Porin Marko";

    try {
        const response = await axios.get("/api/items");
        return response.data.filter((item: IItem) => item.owner !== null && item.owner.name === userName);
    } catch (e) {
        console.log(e);
    }
}

export async function createItem(productId, age: number, condition, size, forSale?: boolean, forSwap?: boolean, price?: number): Promise<IItem[] | undefined> {
    const userName = "Porin Marko";
    
    try {
        const response = await axios.post("/api/items",
        {
            product: productId,
            owner: userName,
            age: age,
            condition: condition,
            size: size,
            picture: null,
            forSale,
            forSwap,
            price
        });
        console.log(response)

        return response.data;

    } catch (e) {
        console.log(e);
    }
}

export async function getAllProducts(): Promise<IProduct[] | undefined> {
    try {
        const response = await axios.get("/api/products");
        return response.data;

    } catch (e) {
        console.log(e);
    }
}

export async function getCategory(productId): Promise<ICategory | undefined> {
    try {
        const response = await axios.get("/api/products/" + productId);
        return response.data.category;

    } catch (e) {
        console.log(e);
    }
}