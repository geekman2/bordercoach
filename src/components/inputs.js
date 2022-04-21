import React, { useState } from 'react';
import { Divider } from '@mui/material';

export function NumberInput({ name, label }) {
    const styles = {
        display: "flex",
        fontSize: "24px"
    }
    return (
        <div style={styles}>
            <label for={name}>{label}</label>
            <input type="number" id="{name}" name="{name}" min="1" />
        </div>
    );
}

function resizeInput(event) {
    event.target.style.width = event.target.value.length+2 + "ch";
}

export function Stat({ name, label, handleChange, formData }) {
    return (

            <tr >
                <td className='stat-name'>{label}</td>
                <td>
                    <input name={name} onChange={handleChange} value={formData[name] || ''} type="number" onInput={resizeInput} />
                </td>
                <td className='stat-name'>+
                <input name={name + "FlavorText"} onChange={handleChange} value={formData[name + "FlavorText"] || ''} type="number" onInput={resizeInput} />%
                </td>
                <td className='stat-name'>+
                <input name={name + "CharacterModifier"} onChange={handleChange} value={formData[name + "CharacterModifier"] || ''} type="number" onInput={resizeInput} />%
                </td>
                <Divider/>
            </tr>
    )
}
