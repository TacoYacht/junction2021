import React, { useState, useEffect } from "react";
import Dropdown from "react-dropdown";
import { Link, useLocation } from "wouter";

import 'react-dropdown/style.css';

import { IItem, INewItemData, IProduct } from "../../data/model";
import { createItem, getAllProducts } from "../../data/queries";

export const AddNew = () => {
    const [location, setLocation] = useLocation();
    const [products, setAllProducts] = useState<IProduct[]>();
    const [itemData, setItemData] = useState<INewItemData>({
        product: undefined,
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
    
    const canSubmit = !!itemData.condition && itemData.product && itemData.size;

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
        createItem(itemData.product, itemData.age, itemData.condition, itemData.size, itemData.forSale, itemData.forSwap, itemData.price);
        setLocation("/my-items");
    }

    function updateItemData(e) {
        setItemData({...itemData, [e.target.name]: e.target.value })
    }

    function selectProduct(option) {
        const selected: IProduct = !!products && products.find(p => p.id === option.value);
        !!selected && setItemData({...itemData, product: selected })
    }

    function selectSize(option) {
        setItemData({...itemData, size: option.value })
    }

    function selectCondition(option) {
        setItemData({...itemData, condition: option.value })
    }

    function selectPurpose(option) {
        if (option.value === "For sale") {
            setItemData({...itemData, forSale: true });
        } else if (option.value === "For sale") {
            setItemData({...itemData, forSwap: true });
        }
    }

    function getSelectedProductOption() {
        if (itemData.product) return { value: itemData.product.id, label: itemData.product.name };
    }

    return (
        <div className="add-new-item">
            <form onSubmit={createNewItem} className="new-item-form">
                <div className="row">
                    <Dropdown options={productOptions} onChange={selectProduct} value={getSelectedProductOption()} placeholder="Select product" />
                    {!!itemData.product ? itemData.product.category.name : <i>Category will be determined from product</i>}
                </div>
                <div className="row sell-or-swap">   
                    <span>Purpose:</span> 
                    <label>
                        <input
                            type="checkbox"
                            checked={itemData.forSale}
                            onChange={e => setItemData({...itemData, forSale: e.target.checked})}
                        />
                        Sell
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            checked={itemData.forSwap}
                            onChange={e => setItemData({...itemData, forSwap: e.target.checked})}
                        />
                        Swap
                    </label>
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
                {itemData.forSale && (
                    <div className="row">
                        <input type="number" name="price" onChange={updateItemData} placeholder="Set price in €" />
                    </div>
                )}
                <div className="row">
                    <input type="textarea" name="description" onChange={updateItemData} placeholder="Set description" />
                </div>
                <button type="submit" disabled={!canSubmit} className="add-item">Add this to your items!</button>
            </form>
            <Link to="/my-items">Cancel</Link>
        </div>
    );
}