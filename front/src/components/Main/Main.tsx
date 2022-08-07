import Title from "../Titles/Title"
import { Column, addCardLink } from "./styles"
import Link from "next/link";
import {useRouter} from "next/router";

import { useState } from "react";
import { useEffect } from "react";

import {Card, Indicator} from "./stylesCards"

async function getData(url = '') {
    try {
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            accept: 'application/json',
        }
    });
    return response.json();
} catch (error) {
    alert(error);
    console.error("Ошибка:", error);
  }
  }

  async function putData(url = '') {
    try {
    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            accept: 'application/json',
        }
    });
    return response.json();
} catch (error) {
    alert(error);
    console.error("Ошибка:", error);
  }
  }

const Main = () => {
    const router = useRouter()
    useEffect(() => {
        getData('https://cryptocar.abakumov.life/api/column')
        .then((data) => {
            setColumns(data)
        });
      }, []);
    const [columns, setColumns] = useState([
        {id: 1, title:"To Do", color:'#FBD2D2', items: [{id: 1, title:"asdf", is_active:false},{id: 2, title:"1zxc234", is_active:true}]},
        {id: 2, title:"InProcess", color:'#FBF2D2', items: [{id: 3, title:"asdf", is_active:false},{id: 4, title:"1zxc234", is_active:true}]},
        {id: 3, title:"Done", color:'#C9E3AE', items: [{id: 5, title:"ffff", is_active:true},{id: 6, title:"wasd", is_active:true}]}
    ])
    const [currentColumn, setCurrentColumn] = useState<any>(null)
    const [currentItem, setCurrentItem] = useState<any>(null)

    function DragOverHandler(e:any): void {
        e.preventDefault()
        if (e.target.className == 'item') {
            e.target.style.boxShadow = '0 4px 3px gray'
        }
    }
    function DragLeaveHandler(e: any): void {
        e.target.style.boxShadow = 'none'
    }
    function DragStartHandler(e:any, column: any, item: any): void {
        setCurrentColumn(column)
        setCurrentItem(item)
    }
    function DragEndHandler(e:any): void {
        e.target.style.boxShadow = 'none'
    }
    function dropHandler(e:any, column: any, item: any): void {
        e.preventDefault()
        const currentIndex = currentColumn.items.indexOf(currentItem)
        currentColumn.items.splice(currentIndex, 1)
        const dropIndex = column.items.indexOf(item)
        column.items.splice( dropIndex + 1, 0, currentItem)
        setColumns(columns.map(c => {
            if (c.id === column.id){
                return column
            }
            if (c.id === currentColumn){
                return currentColumn
            }
            return c
        }))
    }
    function openCard(e:any, item:any){
        router.push('card/'+item.id)
    }

    return(
        <div style={{display: 'flex'}}>
            {columns.map(column =>
                <Column>
                    <div style={{display:'flex'}}>
                        <Title text={column.title} color={column.color}/>
                        <Link href={'card/AddCard/'+column.id}><p style={{margin: 'auto 10px', fontSize: '28px', cursor: 'pointer'}}>... +</p></Link>
                    </div>
                    {}
                    {column.items.map(item =>
                        <Card
                        onDragOver={(e) => DragOverHandler(e)} 
                        onDragLeave={(e) => DragLeaveHandler(e)}
                        onDragStart={(e) => DragStartHandler(e, column, item)}
                        onDragEnd={(e) => DragEndHandler(e)}
                        onDrop ={(e) => dropHandler(e, column, item)}
                        onClick = {(e) => openCard(e, item)}
                        draggable={true}>
                            <Indicator style={{border: item.is_active? 'solid 3px green' : 'solid 3px red'}}/>
                            <p style={{marginLeft: '20px'}}>{item.title}</p> 
                        </Card>
                        )}
                    <Card
                        onDragOver={(e) => DragOverHandler(e)} 
                        onDragLeave={(e) => DragLeaveHandler(e)}
                        onDragStart={(e) => DragStartHandler(e, column, column.id)}
                        onDragEnd={(e) => DragEndHandler(e)}
                        onDrop ={(e) => dropHandler(e, column, column.id)}
                        draggable={false}
                        style={{cursor:'unset', opacity:'0'}}>
                    </Card>
                </Column>
            )}
        </div>
)}
        
export default Main