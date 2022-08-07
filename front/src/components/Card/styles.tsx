import styled from "styled-components";

const phoneSize = "816px";

export const MobileChanger = styled.div`
  display: flex;
  @media screen and (max-width: ${phoneSize}) {
    display: none;
  }
`;
export const ComputerChanger = styled.div`
  display: flex;
  @media screen and (min-width: ${phoneSize}) {
    display: none;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px 60px;
  font-size: 36px;
  font-family: sans-serif;
  align-items: center;
  @media screen and (max-width: ${phoneSize}) {
    padding: 15px 30px;
    font-size: 24px;
  }
  & p {
    font-size: 24px;
    margin-left: 10px;
    margin-top: 20px;
  }
`;

export const SendBtn = styled.button`
  font-size: 28px;
  margin: 15px;
  width: 180px;
  height: 50px;
`;