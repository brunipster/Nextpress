import React, {useState, useEffect} from 'react'

import './index.scss'
import AddButtonIcon from '@Icons/add-button.svg';
import {TodoServices} from "@Services/TodoServices";

export default function HomePage(props){

    let oTodoServices = new TodoServices();
    const [tasks,setTasks] = useState([]);

    useEffect(()=>{
        oTodoServices.getAllTask().then(({data})=>{
            setTasks(data.data)
        })
    },[])



    return (
        <div className="p_home">
            <div className="p_home__form_section">
                <div className="p_home__input_description">
                    <label className="">Descripción</label>
                    <input type="text"/>
                </div>
                <button type="button">
                    <AddButtonIcon width="20px"/>
                </button>
            </div>
            <div className="p_home__list_section">
                <ul>
                    {tasks.map((task,i)=>
                    <li key={i}>
                        <div>
                            {task.name}
                        </div>
                        <div>{task.state}</div>
                    </li>)}
                </ul>
            </div>
        </div>
    )
}