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

  const Card = (props:any) => {
    const { query } = useRouter();

    useEffect(() => {
      getData('https://cryptocar.abakumov.life/api/card/'+query.card_id)
      .then((data) => {
          console.log(data)
          setTitle(data.title);
          setWorker(data.executor)
          setHost(data.host)
          setTeg(data.tag)
          setShortDescription(data.short_description)
          setLongDescription(data.description)
      });
    }, []);

    const [title, setTitle] = useState("Title");
    const [worker, setWorker] = useState("");
    const [host, setHost] = useState("");
    const [teg, setTeg] = useState("");
    const [shortDescription, setShortDescription] = useState("");
    const [longDescription, setLongDescription] = useState("");
  
    return (
      <Content>
        <h4>{props.title}</h4>
        <div>
          <MobileChanger>
            <p>{title}</p>
          </MobileChanger>
          <ComputerChanger>
            <p>{title}</p>
          </ComputerChanger>
        </div>
        <div>
          <MobileChanger>
            <p>{worker}</p>
          </MobileChanger>
          <ComputerChanger>
            <p>{worker}</p>
          </ComputerChanger>
        </div>
        <div>
          <p>{host}t</p>
        </div>
        <div>
          <p>{teg}</p>
        </div>
        <div>
          <p>{shortDescription}</p>
        </div>
        <div>
          <p>{longDescription}</p>
        </div>
        <div>
            <Link href={'/card/EditCard/'+query.card_id}><SendBtn>Edit</SendBtn></Link>
            <Link href='/'><SendBtn>Cancel</SendBtn></Link>
        </div>
      </Content>
    );
  };
  
  export default Card;