import { useRouter } from "next/router"
import AddCard from "../../../src/components/AddCard/AddCard"
import Header from "../../../src/components/Header/Header";

const OpenCard = () => {
  const { query } = useRouter();
  return (
    <>
        <Header/>
        <AddCard title={query.AddCard}/>
    </>
  );
};

export default OpenCard;
