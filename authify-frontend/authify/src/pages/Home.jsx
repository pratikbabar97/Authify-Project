import { Header } from "../components/Header";
import { Menubar } from "../components/Menubar";

export const Home = () => {
  return (
    <div className="flex flex-col items-center justify-content-center min-vh-100" >
    <Menubar></Menubar>
    <Header></Header>
    </div>
  );
};
