import { CategoryEnum } from "../../data/model";
import { Collection } from "./Collection";

import '../../styles/Shop.css';

export const Shop = () => {
    return (
        <div className="collections">
            <Collection type={CategoryEnum.CLOTHING} />
            <Collection type={CategoryEnum.BAGS} />
            <Collection type={CategoryEnum.HOME} />
        </div>
    );
};  