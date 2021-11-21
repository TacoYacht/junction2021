import React, { useEffect, useState } from "react";
import { useLocation } from "wouter";

import { CategoryEnum, IItem } from "../../data/model";
import { getFilteredItems } from "../../data/queries";

import placeholder from "../../assets/placeholder.jpg";

const ItemPreview = ({ item, index }: { item: IItem; index: number}) => {
    const imageUrl: string = !!item.picture ? item.picture[0] : placeholder;

    return (
        <div className={`item-preview item--${index}`}>
            <img src={imageUrl} title={item.product.name} />
        </div>
    )
}

export const Category = ({ type, addFilter }: { type: CategoryEnum; addFilter }) => {
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
        setLocation(`/shop/${type}`);
        addFilter(type);
    }

    return (
        <div className="category" onClick={goToCollection}>
            <div className="category-name">
                {type}
            </div>
            <div className="items">
                {!!items && items.slice(0, 6).map((item, i) => {
                    return (
                        <ItemPreview item={item} key={i} index={i} />
                    )
                })}
            </div>
        </div>
    );
};  