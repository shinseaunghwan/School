import React from 'react';


const Button = ({onClick, text, className}) => {
    
    return (
            <div className={className}><a onClick={onClick} href="#">{text}</a></div>
    )
}
export default Button;