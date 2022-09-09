import React from "react";
import { Header } from "../components/header";

const ParentLayout = ({children}:any) => {
    return(
        <div> 
            {children}
        </div>
    )
}

export default ParentLayout