import{ useState } from "react";
import memesData from "../utills/memes.json"; 

const RandomMemeCard = () => {
  const [meme, setMeme] = useState(getRandomMeme());

  function getRandomMeme() {
    const memes = memesData.memes;
    const randomIndex = Math.floor(Math.random() * memes.length);
    return memes[randomIndex];
  }

  const handleNewMeme = () => {
    setMeme(getRandomMeme());
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "2rem auto",
        padding: "1rem",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        textAlign: "center",
        backgroundColor: "#1e1e1e",
        color: "#f5f5f5",
      }}
    >
      <h2>🎰 Random Crypto Meme</h2>
      <img
        src={meme.image_url}
        alt={meme.description}
        style={{
          width: "100%",
          borderRadius: "8px",
          marginTop: "1rem",
        }}
      />
      <p style={{ marginTop: "1rem", fontSize: "1rem" }}>
        {meme.description}
      </p>
      <button
        onClick={handleNewMeme}
        style={{
          marginTop: "1rem",
          padding: "0.6rem 1.2rem",
          border: "none",
          borderRadius: "6px",
          backgroundColor: "#00c853",
          color: "#fff",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        🎲 Show Another
      </button>
    </div>
  );
};

export default RandomMemeCard;
