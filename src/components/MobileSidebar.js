import styles from "../styles/MobileSidebar.module.css";
import Categories from "./Categories";
import RoadmapWidget from "./RoadmapWidget";

const MobileSidebar = (props) => {
  return (
    <div>
      <Categories />
      <RoadmapWidget />
    </div>
  );
};

export default MobileSidebar;
