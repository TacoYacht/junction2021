import axios from "axios";
import { CategoryEnum, IItem } from "./model";

export async function getFilteredItems(category?: CategoryEnum): Promise<IItem[] | undefined> {
    try {
        const response = await axios.get("/api/items");

        if (!category) {
            return response.data;
        } else {
            return response.data.filter((item: IItem) => item.product.category === category);
        }
    } catch (e) {
        console.log(e);
    }
}