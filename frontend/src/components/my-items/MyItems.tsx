import React, { useState, useEffect } from "react";
import { Link } from "wouter";

import { IItem } from "../../data/model";
import { getMyItems } from "../../data/queries";
import { ItemCard } from "../ItemCard";

import { ReactComponent as NoItems } from "../../assets/no_own_items.svg";
import { Search } from "../Search";

const NoItemsYet = () => {
    return(
        <div className="no-items-view">
            <NoItems />
            <div className="no-items-details">
                <h3>No items yet...</h3>
                <p>Add items to give some <span>re-love</span> for your <span>pre-loved</span> Marimekko products!</p>
            </div>
            <Link to="/add-item">
                <button className="add-item">Add a new item</button>
            </Link>
        </div>
    )
}

export const MyItems = () => {
    const [items, setItems] = useState<IItem[]>();
    const [filter, setFilter] = useState<string>("");

    useEffect(() => {
        if (!items) {
            getItems();
        } 
        if (filter) {
            setItems(items.filter(item => item.product.name.toLowerCase().includes(filter.toLowerCase())))
        } else {
            getItems();
        }
    }, [filter])

    async function getItems() {
        const myItems = await getMyItems();
        setItems(myItems);
    }

    return (
        <div className="my-items">
            <Search setFilter={setFilter} />
            <div className="items">
                {!!items && items.length > 0 && items.map((item, i) => {
                    return (
                        <ItemCard item={item} owned={true} key={i} />
                    )
                })}
            </div>
        </div>
    );
}