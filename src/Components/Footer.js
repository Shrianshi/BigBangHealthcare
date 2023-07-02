import React from "react";
import { useState,useEffect } from "react";

const Footer = () => {

    const dt = new Date();
    const year = dt.getFullYear();


    return (
        <div className="bg-dark container-fluid p-3">
            <h3 className="text-white">Copyright &#169; {year}</h3>
        </div>
    )
}
export default Footer;