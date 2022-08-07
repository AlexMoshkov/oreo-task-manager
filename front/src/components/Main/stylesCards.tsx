import styled from "styled-components";
import { Link } from 'react-router-dom'

const phoneSize = "816px";

export const Card = styled.div`
  display: flex;
  background-color: #e3e3e3;
  color: black;
  width: 300px;
  padding: 12px 10px;
  margin: 10px;
  border: solid 2px gray;
  border-radius: 10px;
  font-size: 18px;
  font-family: sans-serif;
  text-align: center;
  cursor: grab;
`;

export const Indicator = styled.div`
  display: flex;
  color: black;
  height: 16px;
  width: 16px;
  margin: 2px;
  border-radius: 50%;
  font-family: sans-serif;
  text-align: center;
`;