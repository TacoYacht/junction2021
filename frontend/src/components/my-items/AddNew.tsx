import React, { useState, useEffect } from "react";
import { Link } from "wouter";

import { IItem } from "../../data/model";

export const AddNew = () => {
    const [itemData, setItemData] = useState<IItem>();

    return (
        <div className="add-new-item">
            <div className="inside-navi">
                <Link to="/my-items">Cancel</Link>
                Product details
                <Link to="/my-items">Next</Link>
            </div>
            <div className="row">
                <label htmlFor="name">Name</label>
                <input type="text" name="name" />
            </div>
            <div className="row">
                <label htmlFor="category">Category</label>
                <input type="text" name="category" />
            </div>
            <div className="row">
                <label htmlFor="size">Size</label>
                <input type="text" name="size" />
            </div>
            <div className="row">
                <label htmlFor="color">Color</label>
                <input type="text" name="color" />
            </div>
            <div className="row">
                <label htmlFor="condition">Condition</label>
                <input type="text" name="condition" />
            </div>
            <div className="row">
                <label htmlFor="description">Description</label>
                <input type="textarea" name="description" />
            </div>
        </div>
    );
}