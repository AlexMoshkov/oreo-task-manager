import { useRouter } from "next/router"
import Card from "../../src/components/Card/Card";
import Header from "../../src/components/Header/Header";

const OpenCard = () => {
  const { query } = useRouter();
  return (
    <div>
      <Header/>
      <Card props={query.card_id}/>
    </div>
  );
};

export default OpenCard;
