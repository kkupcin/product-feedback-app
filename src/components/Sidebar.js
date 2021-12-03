import styles from '../styles/Sidebar.module.css'
import Categories from './Categories';
import Header from './Header'
import RoadmapWidget from './RoadmapWidget';
const Sidebar = (props) => {
  return (
    <div className={styles.container}>
        <Header />
        <Categories />
        <RoadmapWidget />
    </div>
  );
};

export default Sidebar;
