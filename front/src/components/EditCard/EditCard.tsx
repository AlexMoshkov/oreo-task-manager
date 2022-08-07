import {
    Content,
    Input,
    InputField,
    MobileChanger,
    ComputerChanger,
    SendBtn,
  } from "./styles";
  import { useState, useEffect } from "react";
  import { useRouter } from "next/router";
  import Link from "next/link";
  
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

  const EditCard = (props:any) => {
    const { query } = useRouter();

    const [id, setId] = useState("");
    const [title, setTitle] = useState("");
    const [worker, setWorker] = useState("");
    const [host, setHost] = useState("");
    const [teg, setTeg] = useState("");
    const [longDescription, setLongDescription] = useState("");
    const [shortDescription, setShortDescription] = useState("");

    useEffect(() => {
      getData('http://gachi.abakumov.life:8081/api/card/'+query.EditCard)
      .then((data) => {
          console.log(data)
          setId(data.id)
          setTitle(data.title);
          setWorker(data.executor)
          setHost(data.host)
          setTeg(data.tag)
          setShortDescription(data.short_description)
          setLongDescription(data.description)
      });
    }, []);

    const urlDel = "http://gachi.abakumov.life:8081/api/card/"+query.EditCard;

    async function deleteCard(urlDel:any) {
            try {
              const response = await fetch(urlDel, {
                method: "DELETE"
              });
                  alert(`${response.status}`);
            } catch (error) {
              alert(error);
              console.error("Ошибка:", error);
            }
          }

    const url = "http://gachi.abakumov.life:8081/api/card/"+query.EditCard;
    const data = {
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
                method: "PUT", // или 'PUT'
                body: JSON.stringify(data), // данные могут быть 'строкой' или {объектом}!
                headers: {
                  "Content-Type": "application/json",
                },
              });
              if (response.status === 201) {
                alert(`Заявка будет рассмотрена в ближайшее время.`);
              } else {
                if (response.status === 400) {
                  alert(
                    `Похоже, что вы отправили слишком много заявок, подождите`
                  );
                } else {
                  alert(`${response.status}`);
                }
              }
            } catch (error) {
              alert(error);
              console.error("Ошибка:", error);
            }
          }
        }
      }
    }
  
    return (
      <Content>
        <h4>{props.id}</h4>
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
            <SendBtn onClick={() => deleteCard(urlDel)}>Delete</SendBtn>
        </div>
      </Content>
    );
  };
  
  export default EditCard;