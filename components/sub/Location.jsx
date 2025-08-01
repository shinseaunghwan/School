"use client";
import React, { useContext } from "react";
import { WidgetContext } from "../../app/(main)/main/template5/sub/App";

export default function Location() {
    const widget = useContext(WidgetContext);
    return(
<div className={widget.subLoc}>
                            <ul>
                                <li><i className="xi-home" aria-hidden="true"></i></li>
                                <li>depth01</li>
                                <li>depth02</li>
                            </ul>
                        </div>
    )
}





