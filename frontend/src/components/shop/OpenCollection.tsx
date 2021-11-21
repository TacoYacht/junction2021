import React, { useEffect, useState } from "react";

import { CategoryEnum, IItem } from "../../data/model";
import { getFilteredItems } from "../../data/queries";

import { ItemCard } from "../ItemCard";
import { Search } from "../Search";

export const OpenCollection = (params) => {
    const [items, setItems] = useState<IItem[]>();
    const [filter, setFilter] = useState<string>("");

    const category: string = !!params && params.params.category;

    useEffect(() => {
        if (!items) {
            getItems();
        }

        if (filter) {
            setItems(items.filter(item => item.product.name.toLowerCase().includes(filter)))
        } else {
            getItems();
        }
    }, [filter])

    async function getItems() {
        const filteredItems = await getFilteredItems(category as CategoryEnum);
        setItems(filteredItems);
    }

    return (
        <div className="open-collection">
            <Search setFilter={setFilter} />
            <div className="items">
                {!!items && items.map((item: IItem, i: number) => {
                    return (
                        <ItemCard item={item} key={i} />
                    )
                })}
            </div>
        </div>
    );
};  