import {
    Content,
    Input,
    InputField,
    MobileChanger,
    ComputerChanger,
    SendBtn,
  } from "./styles";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
  
  const AddCard = (props:any) => {
    const { query } = useRouter();
    const router = useRouter()
    const [title, setTitle] = useState("");
    const [worker, setWorker] = useState("");
    const [host, setHost] = useState("");
    const [teg, setTeg] = useState("");
    const [longDescription, setLongDescription] = useState("");
    const [shortDescription, setShortDescription] = useState("");
    const url = "https://cryptocar.abakumov.life/api/card";
    const data = {
      column_id: Number(query.AddCard), 
      title: title,
      executor: worker || "Нет",
      host: host || "Нет",
      tag: teg || "Нет",
      short_description: shortDescription || "Нет",
      description: longDescription || "Нет"
    };
    async function submit(url: string, data: any) {
      if (!title) {
        alert("Введите заголовок таска");
      } else {
        if (!worker) {
          alert("Введите название организации");
        } else {
          if (!host) {
            alert("Введите адрес хоста");
          }
          else {
            try {
              const response = await fetch(url, {
                method: "POST", // или 'PUT'
                body: JSON.stringify(data), // данные могут быть 'строкой' или {объектом}!
                headers: {
                  "Content-Type": "application/json",
                },
              });
              router.push('/')
              }
             catch (error) {
              alert(error);
              console.error("Ошибка:", error);
            }
          }
        }
      }
    }
  
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
          <Input
            placeholder="Title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          ></Input>
        </div>
        <div>
          <MobileChanger>
            <p>Worker</p>
          </MobileChanger>
          <ComputerChanger>
            <p>Worker</p>
          </ComputerChanger>
          <Input
            placeholder="Worker"
            value={worker}
            onChange={(event) => setWorker(event.target.value)}
          ></Input>
        </div>
        <div>
          <p>Host</p>
          <Input
            placeholder="http://10.0.0.1"
            value={host}
            onChange={(event) => setHost(event.target.value)}
          ></Input>
        </div>
        <div>
          <p>Teg</p>
          <Input
            placeholder="Reverse"
            value={teg}
            onChange={(event) => setTeg(event.target.value)}
          ></Input>
        </div>
        <div>
          <p>Short Description</p>
          <InputField
            placeholder="..."
            value={shortDescription}
            style={{height:'100px'}}
            onChange={(event) => setShortDescription(event.target.value)}
          ></InputField>
        </div>
        <div>
          <p>Long Description</p>
          <InputField
            placeholder="..."
            value={longDescription}
            onChange={(event) => setLongDescription(event.target.value)}
          ></InputField>
        </div>
        <div>
            <SendBtn onClick={() => submit(url, data)}>Send</SendBtn>
            <Link href='/'><SendBtn>Cancel</SendBtn></Link>
        </div>
      </Content>
    );
  };
  
  export default AddCard;