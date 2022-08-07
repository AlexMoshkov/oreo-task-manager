import {
    Content,
    MobileChanger,
    ComputerChanger,
    SendBtn,
  } from "./styles";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
  
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

  const AddCard = (props:any) => {
    const { query } = useRouter();

    useEffect(() => {
      getData('http://10.2.2.102:8000/api/card/'+query.id)
      .then((data) => {
          console.log(data)
          setTitle(data.title); // JSON data parsed by `data.json()` call
      });
    }, []);

    const [title, setTitle] = useState("");
    const [worker, setWorker] = useState("");
    const [host, setHost] = useState("");
    const [teg, setTeg] = useState("");
    const [message, setMessage] = useState("");
    
    const url = "http://127.0.0.1:8000/api/employer/";
    const data = {
      title: title,
      worker: worker || "Нет",
      host: host || "Нет",
      teg: teg || "Нет",
      message: message || "Нет",
    };
  
    return (
      <Content>
        <h4>{props.title}</h4>
        <div>
          <MobileChanger>
            <p>Title</p>
          </MobileChanger>
          <ComputerChanger>
            <p>Title</p>
          </ComputerChanger>
        </div>
        <div>
          <MobileChanger>
            <p>Worker</p>
          </MobileChanger>
          <ComputerChanger>
            <p>Worker</p>
          </ComputerChanger>
        </div>
        <div>
          <p>Host</p>
        </div>
        <div>
          <p>Teg</p>
        </div>
        <div>
          <p>Short Description</p>
          <p></p>
        </div>
        <div>
          <p>Long Description</p>
          <p></p>
        </div>
        <div>
            <Link href={'/card/EditCard/'+query.card_id}><SendBtn>Edit</SendBtn></Link>
            <Link href='/'><SendBtn>Cancel</SendBtn></Link>
        </div>
      </Content>
    );
  };
  
  export default AddCard;