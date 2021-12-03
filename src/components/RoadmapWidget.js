import styles from '../styles/RoadmapWidget.module.css'

const RoadmapWidget = (props) => {
  return (
    <div>
      <div>
        <h1>Roadmap</h1>
        <button>View</button>
      </div>
      <div>
        <div>
          <h2>Planned</h2>
          <p>2</p>
        </div>
        <div>
          <h2>In-Progress</h2>
          <p>3</p>
        </div>
        <div>
          <h2>Live</h2>
          <p>1</p>
        </div>
      </div>
    </div>
  );
};

export default RoadmapWidget;
