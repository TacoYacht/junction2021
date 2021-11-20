import { useState } from "react";
import { Switch, Route } from "wouter";
import { CategoryEnum } from "../../data/model";

import { Category } from "./Category";
import { OpenCollection } from "../shop/OpenCollection";
import { useLocation } from "wouter";

import '../../styles/Shop.css';

export const Shop = () => {
    const [filters, setFilters] = useState(["A filter"]);
    const [location, setLocation] = useLocation();


    function addFilter(newFilter: string) {
        !filters.includes(newFilter) && setFilters(filters.concat(newFilter));
    }

    function removeFilter(filterToRemove: string) {
        setFilters(filters.filter(filter => filter !== filterToRemove));
        setLocation('/shop')
    }

    return (
        <div className="shop">
            <div className="filters">
                {filters.map((filter, i) => <div className="filter" key={i} onClick={() => removeFilter(filter)}>{filter}</div>)}
            </div>
            <Switch>
                <Route path="/shop">
                    <div className="categories">
                        <Category type={CategoryEnum.CLOTHING} addFilter={addFilter} />
                        <Category type={CategoryEnum.KNITS} addFilter={addFilter} />
                        <Category type={CategoryEnum.HOME} addFilter={addFilter} />
                    </div>
                </Route>
                <Route path="/shop/:category" component={OpenCollection} />
            </Switch>
        </div>
    );
};  