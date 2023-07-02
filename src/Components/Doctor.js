import { Nav } from "./Nav";
import Card from "./Card";
import { Data1 } from "../constants/Data1";

const Doctor = () => {
  return (
    <div>
      <h1>Welcome!</h1>
      <div>
      {Data1.map((m) => (
          <h1 key={m.id}>{m.title}</h1>
        ))}
      <Card></Card>
      </div>
    </div>
  );
};
export default Doctor;
