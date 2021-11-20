import axios from "axios";
import { CategoryEnum, IItem } from "./model";

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
        return response.data.filter((item: IItem) => item.owner.name === userName);
    } catch (e) {
        console.log(e);
    }
}

export async function createItem(productId, userId, age: number, condition, size, picture?: string[], forSale?: boolean, forSwap?: boolean, price?: number): Promise<IItem[] | undefined> {
    try {
        const response = await axios.post("/api/items",
        {
            product: productId,
            owner: userId,
            age: age,
            condition: condition,
            size: size,
            picture,
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

export async function getAllProducts(): Promise<IItem[] | undefined> {
    try {
        const response = await axios.get("/api/products");
        console.log(response)

        return response.data;

    } catch (e) {
        console.log(e);
    }
}