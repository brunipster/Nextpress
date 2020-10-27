import React, {useState} from 'react'

import './index.scss'
import AddButtonIcon from '@Icons/add-button.svg';

export default function HomePage(props){

    const [cont,setCont] = useState(0)

    return (
        <div className="p_home">
            <div className="p_home__form_section">
                <label className="">Descripción</label>
                <input type="text" value={cont}/>
                <button type="button" onClick={()=>{setCont(cont+1)}}><AddButtonIcon width="20px"/></button>
            </div>
            <div className="p_home__list_section">
                <table>
                    <tr>
                        <div>Lavar la ropa</div>
                    </tr>
                </table>
            </div>
        </div>
    )
}