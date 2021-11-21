import React, { useState, useEffect } from "react";
import Select from "react-select";
import { Link } from "wouter";

import { IItem, INewItemData } from "../../data/model";

export const AddNew = () => {
    const [itemData, setItemData] = useState<INewItemData>({
        productId: "",
        status: "",
        picture: [],
        price: "",
        condition: "",
        created: new Date().toString(),
        size: "",
        forSale: false,
        forSwap: false,
    });
    const allProducts = [];

    function createItem() {
        //todo
    }

    function updateItemData(e) {
        setItemData({...itemData, [e.target.name]: e.target.value })
    }

    function selectProduct(option) {
        setItemData({...itemData, productId: option.value })
    }

    return (
        <div className="add-new-item">
            <div className="inside-navi">
                <Link to="/my-items">Cancel</Link>
                Product details
                <Link to="/my-items">Next</Link>
            </div>
            <form onSubmit={createItem} className="new-item-form">
                <div className="row">
                    <label htmlFor="product">Product</label>
                    <Select options={allProducts} onChange={selectProduct} value={itemData.productId} />
                </div>
                <div className="row">
                    <label htmlFor="category">Category</label>
                    <input type="text" name="category" onChange={updateItemData} />
                </div>
                <div className="row">
                    <label htmlFor="size">Size</label>
                    <input type="text" name="size" onChange={updateItemData} />
                </div>
                <div className="row">
                    <label htmlFor="color">Color</label>
                    <input type="text" name="color" onChange={updateItemData} />
                </div>
                <div className="row">
                    <label htmlFor="condition">Condition</label>
                    <input type="text" name="condition" onChange={updateItemData} />
                </div>
                <div className="row">
                    <label htmlFor="description">Description</label>
                    <input type="textarea" name="description" onChange={updateItemData} />
                </div>
                <button type="submit">Add this to your items!</button>
                <Link to="/my-items">Cancel</Link>
            </form>
        </div>
    );
}