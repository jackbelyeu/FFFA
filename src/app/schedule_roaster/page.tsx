// Importing Schedule_RoasterLayout in a client-side component
import dynamic from "next/dynamic";
const Schedule_RoasterLayout = dynamic(() => import("./layout"), {
  ssr: false,
});

const Scheduke_Roster: React.FC = () => {
  return <></>;
};

export default Scheduke_Roster;
