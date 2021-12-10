import Categories from "./Categories";
import Header from "./Header";
import RoadmapWidget from "./RoadmapWidget";
const Sidebar = (props) => {
  return (
    <div>
      <Header />
      <Categories />
      <RoadmapWidget />
    </div>
  );
};

export default Sidebar;
