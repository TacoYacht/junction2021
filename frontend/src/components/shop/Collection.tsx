import React, { useEffect, useState } from "react";
import { useLocation } from "wouter";

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

export const Collection = ({ type }: { type: CategoryEnum }) => {
    const [location, setLocation] = useLocation();
    const [items, setItems] = useState<IItem[]>();

    useEffect(() => {
        if (!items) {
            getItems();
        } 
    })

    async function getItems() {
        const filteredItems = await getFilteredItems(type);
        setItems(filteredItems);
    }

    function goToCollection() {
        setLocation(`/shop/${type}`)
    }

    return (
        <div className="collection" onClick={goToCollection}>
            <div className="collection-name">
                {type}
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