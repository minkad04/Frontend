import logo from "./logo.svg";
import "./App.css";
import { MyCustomCard } from "./MyCustomCard";
import { useHalak } from "./useHalak";

function App() {
  const { halak, error } = useHalak();

  if (error) {
    return <div>
      <MyCustomCard
        id={1}
        nev="Kék ponty"
        faj="Ponty"
        meret="20 cm"
        tonev="Kék"
        kep="" 
      />
      Error: {error.message}
    </div>;
  }

  return (
    <>
      {halak.map((hal) => (
        <MyCustomCard
          key={hal.id}
          id={hal.id}
          nev={hal.nev}
          faj={hal.faj}
          meret={hal.meret}
          tonev={hal.tonev}
          kep={hal.kep} 
        />
      ))}
    </>
  );
}

export default App;

