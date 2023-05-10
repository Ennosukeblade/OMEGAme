import { useState } from "react";
import GameCard from "../components/GameCard";
import GameCard2 from "../components/GameCard2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import Iframe from "react-iframe";
//import "../components/styles/Games.css";
interface Icard {
  title: string;
  image: string;
  author: string;
  avatar: string;
  description: string;
  badges: string[];
  os: string[];
}
const Games = () => {
  const [game, setGame] = useState<Icard[]>([
    {
      title: "Night Of The Consumers",
      image:
        "https://img.itch.zone/aW1hZ2UvNTY0MjM4LzExOTk4Mjk3LnBuZw==/347x500/3nA%2FTn.png",
      author: "John Doe",
      avatar: "https://itch.io/static/images/frog-gold.png",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vitae eros nec erat venenatis tincidunt nec sit amet orci. Phasellus.",
      badges: ["Horror", "Free"],
      os: ["windows", "android"],
    },
    {
      title: "Night Of The Consumers",
      image:
        "https://img.itch.zone/aW1hZ2UvNTY0MjM4LzExOTk4Mjk3LnBuZw==/347x500/3nA%2FTn.png",
      author: "John Doe",
      avatar: "https://itch.io/static/images/frog-gold.png",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vitae eros nec erat venenatis tincidunt nec sit amet orci. Phasellus.",
      badges: ["Horror", "Free"],
      os: ["windows", "android", "inBrowser"],
    },
    {
      title: "Night Of The Consumers",
      image:
        "https://img.itch.zone/aW1hZ2UvNTY0MjM4LzExOTk4Mjk3LnBuZw==/347x500/3nA%2FTn.png",
      author: "John Doe",
      avatar: "https://itch.io/static/images/frog-gold.png",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vitae eros nec erat venenatis tincidunt nec sit amet orci. Phasellus.",
      badges: ["Horror", "Free"],
      os: ["windows", "android"],
    },
    {
      title: "Night Of The Consumers",
      image:
        "https://img.itch.zone/aW1hZ2UvNTY0MjM4LzExOTk4Mjk3LnBuZw==/347x500/3nA%2FTn.png",
      author: "John Doe",
      avatar: "https://itch.io/static/images/frog-gold.png",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vitae eros nec erat venenatis tincidunt nec sit amet orci. Phasellus.",
      badges: ["Horror", "Free"],
      os: ["windows", "android"],
    },
    {
      title: "Night Of The Consumers",
      image:
        "https://img.itch.zone/aW1hZ2UvNTY0MjM4LzExOTk4Mjk3LnBuZw==/347x500/3nA%2FTn.png",
      author: "John Doe",
      avatar: "https://itch.io/static/images/frog-gold.png",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vitae eros nec erat venenatis tincidunt nec sit amet orci. Phasellus.",
      badges: ["Horror", "Free"],
      os: ["windows"],
    },
    {
      title: "Night Of The Consumers",
      image:
        "https://img.itch.zone/aW1hZ2UvNTY0MjM4LzExOTk4Mjk3LnBuZw==/347x500/3nA%2FTn.png",
      author: "John Doe",
      avatar: "https://itch.io/static/images/frog-gold.png",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vitae eros nec erat venenatis tincidunt nec sit amet orci. Phasellus.",
      badges: ["Horror", "Free"],
      os: ["windows", "inBrowser"],
    },
  ]);
  console.log("game");
  return (
    <div className="container mx-auto px-4">
      <div className="grid gap-3 grid-cols-3">
        {game.map((g: Icard) => (
          <GameCard2
            title={g.title}
            author={g.author}
            image={g.image}
            avatar={g.avatar}
            description={g.description}
            badges={g.badges}
            os={g.os}
          />
        ))}
      </div>

      {/* <Iframe
        url="https://incredible-meringue-8ae046.netlify.app/"
        width="1280px"
        height="720px"
        id=""
        className=""
        position="relative"
        allowFullScreen={true}
      /> */}
    </div>
  );
};

export default Games;
