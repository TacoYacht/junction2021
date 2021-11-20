import React, { useEffect, useState } from "react";
import { useRoute } from "wouter";

import { CategoryEnum, IItem } from "../data/model";
import { getFilteredItems } from "../data/queries";

import placeholder from "../assets/placeholder.jpg";

export const ItemCard = ({ item }: { item: IItem }) => {
    const imageUrl: string = !!item.picture ? item.picture[0] : placeholder;

    return (
        <div className="item-card">
            <img src={imageUrl} title={item.product.name} />
            <div className="item-card-info">
                <div className="item-card-row">
                    <span className="name">{item.product.name}</span>
                    <span className="price">{item.price + " €"}</span>
                </div>
                <div className="item-card-row">
                    <span className="seller">{item.owner}</span>
                    <span className="condition">{item.condition}</span>
                    <span className="size">{item.size}</span>
                </div>
            </div>
        </div>
    )
}