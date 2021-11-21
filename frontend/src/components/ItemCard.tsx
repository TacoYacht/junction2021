import React, { Fragment, useEffect, useState } from "react";
import { useRoute } from "wouter";

import { CategoryEnum, IItem } from "../data/model";
import { getFilteredItems } from "../data/queries";

import placeholder from "../assets/placeholder.jpg";
import { ReactComponent as SaleIcon } from "../assets/sale.svg";
import { ReactComponent as SwapIcon } from "../assets/swap.svg";


export const ItemCard = ({ item, owned }: { item: IItem; owned?: boolean }) => {
    const imageUrl: string = !!item.picture ? item.picture[0] : placeholder;

    function isForSale() {
        return item.status === "for sale" || item.forSale === true;
    }
    
    function isForSwap() {
        return item.status === "swap" || item.forSwap === true;
    }

    function isForSaleAndSwap() {
        return isForSale() && isForSwap();
    }

    function renderForSaleText(): string {
        if (isForSaleAndSwap()) {
            return "Ready to sell or swap"
        } else if (isForSale()) {
            return "Ready to sell"
        } else if (isForSwap()) {
            return "Ready to swap"
        } else {
            return "Private item"
        }
    }

    return (
        <div className="item-card">
            <img src={imageUrl} title={item.product.name} />
            <div className="item-card-info">
                <div className="item-card-row">
                    <span className="name">{item.product.name}</span>
                    <span className="price">{item.price + " €"}</span>
                </div>
                <div className="item-card-row">
                    {owned && (
                        <div className="owned-content-info">
                            {isForSaleAndSwap() ? (
                            <Fragment>
                                <SaleIcon />
                                <SwapIcon />
                            </Fragment>
                            ) : (
                                <Fragment>
                                {isForSale() && <SaleIcon />}
                                {isForSwap() && <SwapIcon />}

                            </Fragment>
                            )}
                            <span>{renderForSaleText()}</span>
                        </div>
                    )}
                    {!owned && <span className="seller">{!!item.owner && item.owner.name}</span>}
                    <span className="condition">{item.condition}</span>
                    <span className="size">{item.size}</span>
                    {!owned && (
                        <Fragment>
                            {isForSale() && <SaleIcon />}
                            {isForSwap() && <SwapIcon />}
                        </Fragment>
                    )}
                </div>
            </div>
        </div>
    )
}