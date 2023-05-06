import GameCard from "../components/GameCard";
import "../components/styles/Games.css"
const Games = () => {
  return (
    <div class="d-flex justify-content-evenly flex-wrap ">
    <GameCard/>
    <GameCard/>
    <GameCard/>
    <GameCard/>
    <GameCard/>
    <GameCard/>
    </div>
  );
};

export default Games;
