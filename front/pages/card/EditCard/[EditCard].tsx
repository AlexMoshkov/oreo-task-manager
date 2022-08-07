import { useRouter } from "next/router"
import EditCard from "../../../src/components/EditCard/EditCard"
import Header from "../../../src/components/Header/Header";

const OpenCard = () => {
  const { query } = useRouter();
  return (
    <>
        <Header/>
        <EditCard title={query.EditCard}/>
    </>
  );
};

export default OpenCard;
