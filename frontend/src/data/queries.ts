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
    const userID = "61994d79e1c43510a865c9d6";

    try {
        const response = await axios.get("/api/items");
        return response.data.filter((item: IItem) => item.owner === userID);
    } catch (e) {
        console.log(e);
    }
}