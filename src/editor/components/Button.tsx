import React from "react";
import "./Button.css"

interface propsTypes{
    text:string,
    onClick:()=>void
    children:string
}
export const Button=(props:propsTypes)=>{
    return <button className="btn">{props.children}</button>
}