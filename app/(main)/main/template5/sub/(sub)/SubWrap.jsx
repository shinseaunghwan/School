"use client";
import React, { useContext } from "react";
import { WidgetContext } from "../App";

export default function SubWrap() {
    const widget = useContext(WidgetContext);
    return(
<div className={widget.subContent}>

</div>
    )
}

