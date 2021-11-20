import React, { useEffect, useState } from "react";
import { useRoute } from "wouter";

import { CategoryEnum, IItem } from "../../data/model";
import { getFilteredItems } from "../../data/queries";

import placeholder from "../../assets/placeholder.jpg";

const ItemCard = ({ item }: { item: IItem }) => {
    const imageUrl: string = !!item.picture ? item.picture[0] : placeholder;

    return (
        <div className="item-card">
            <img src={imageUrl} title={item.product.name} />
        </div>
    )
}

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
        <div className="collection">
            <div className="collection-name">
                {category}
            </div>
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