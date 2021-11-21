import React, { useState, useEffect } from "react";
import Dropdown from "react-dropdown";
import { Link } from "wouter";

import 'react-dropdown/style.css';

import { IItem, INewItemData, IProduct } from "../../data/model";
import { createItem, getAllProducts } from "../../data/queries";

export const AddNew = () => {
    const [products, setAllProducts] = useState<IProduct[]>();
    const [itemData, setItemData] = useState<INewItemData>({
        productId: "",
        status: "",
        picture: [],
        price: 0,
        age: 4,
        condition: "",
        created: new Date().toString(),
        size: "",
        forSale: false,
        forSwap: false,
    });

    const productOptions = !!products && products.map(p => { 
        return { label: p.name, value: p.id };
    });

    useEffect(() => {
        if (!products) {
            getProducts();
        }
    })

    async function getProducts() {
        const all = await getAllProducts();
        setAllProducts(all);
    }

    function createNewItem() {
        createItem(itemData.productId, itemData.age, itemData.condition, itemData.size, itemData.forSale, itemData.forSwap, itemData.price);
    }

    function updateItemData(e) {
        setItemData({...itemData, [e.target.name]: e.target.value })
    }

    function selectProduct(option) {
        setItemData({...itemData, productId: option.value })
    }

    function selectSize(option) {
        setItemData({...itemData, size: option.value })
    }

    function selectCondition(option) {
        setItemData({...itemData, condition: option.value })
    }

    function getSelectedProduct(): IProduct | undefined {
        const sp = !!products && products.find(p => p.id === itemData.productId);
        if (sp) return sp;
    }

    function getSelectedProductOption() {
        const sp = !!products && products.find(p => p.id === itemData.productId);

        if (sp) return { value: sp.id, label: sp.name };
    }

    return (
        <div className="add-new-item">
            <form onSubmit={createNewItem} className="new-item-form">
                <div className="row">
                    <Dropdown options={productOptions} onChange={selectProduct} value={getSelectedProductOption()} placeholder="Select product" />
                    {!!itemData.productId && !!getSelectedProduct() && getSelectedProduct().category.name}
                </div>
                <div className="row">
                    <Dropdown options={["S", "M", "L", "XL"]} onChange={selectSize} placeholder="Select size" />
                </div>
                <div className="row">
                    <input type="text" onChange={updateItemData} placeholder="Select color"  />
                </div>
                <div className="row">
                    <Dropdown options={['New', 'Excellent', 'Good', 'Decent', 'Needs repair']} onChange={selectCondition} placeholder="Select condition" />
                </div>
                <div className="row">
                    <input type="number" name="price" onChange={updateItemData} placeholder="Set price in €" />
                </div>
                <div className="row">
                    <input type="textarea" name="description" onChange={updateItemData} placeholder="Set description" />
                </div>
                <button type="submit" className="add-item">Add this to your items!</button>
            </form>
            <Link to="/my-items">Cancel</Link>
        </div>
    );
}