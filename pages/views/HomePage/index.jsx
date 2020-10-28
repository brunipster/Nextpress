import React, {useState, useEffect} from 'react'

import './index.scss'
import AddButtonIcon from '@Icons/add-button.svg';
import {TodoServices} from "@Services/TodoServices";

export default function HomePage(props){

    let oTodoServices = new TodoServices();
    const [tasks,setTasks] = useState([]);

    useEffect(()=>{
        oTodoServices.getAllTask().then((result)=>{
            console.log("result",result);
            // setTasks(result.data)
        })
    },[])



    return (
        <div className="p_home">
            <div className="p_home__form_section">
                <label className="">Descripción</label>
                <input type="text"/>
                <button type="button"><AddButtonIcon width="20px"/></button>
            </div>
            <div className="p_home__list_section">
                {tasks.map((task,i)=>
                    <li key={i}>
                    <div>
                        {task.name}
                    </div>
                </li>
                )}
            </div>
        </div>
    )
}