import React, { useEffect, useState } from "react";
import { useRoute } from "wouter";

import { CategoryEnum, IItem } from "../../data/model";
import { getFilteredItems } from "../../data/queries";

import placeholder from "../../assets/placeholder.jpg";
import { ItemCard } from "../ItemCard";

export const OpenCollection = (params) => {
    const [items, setItems] = useState<IItem[]>();
    const category: string = !!params && params.params.category;

    useEffect(() => {
        if (!items) {
            getItems();
        } 
    })

    async function getItems() {
        const filteredItems = await getFilteredItems(category as CategoryEnum);
        setItems(filteredItems);
    }

    return (
        <div className="open-collection">
            <div className="items">
                {!!items && items.map((item, i) => {
                    return (
                        <ItemCard item={item} key={i} />
                    )
                })}
            </div>
        </div>
    );
};  