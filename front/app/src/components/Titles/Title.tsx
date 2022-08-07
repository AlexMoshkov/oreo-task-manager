import {Content} from "./styles"

type titleProps = {
    text: string
    color: string
  };

const Title = ({text, color} : titleProps) => {
    return(
        <Content style={{backgroundColor: color}}>
            <p>{text}</p> 
        </Content>
    )
}

export default Title