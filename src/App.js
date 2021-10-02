import './App.css';
import {Canvas} from "@react-three/fiber";
import {Cylinder, OrbitControls, PerspectiveCamera} from "@react-three/drei";

const cylinderConfigs = [
  {
    color: "#714CFE",
    x: -1.8,
    y: 0.9
  },
  {
    color: "#00FFEE",
    x: 0,
    y: 0.9
  },
  {
    color: "#CC6699",
    x: 1.8,
    y: 0.9
  },
  {
    color: "#FFEE00",
    x: -0.9,
    y: -0.65
  },
  {
    color: "#EE2266",
    x: 0.9,
    y: -0.65
  }
]

const App = () => {
  return (
    <div className="App">
      <Canvas>
        <color attach="background" args={"#212121"} />
        {/*<axesHelper />*/}
        <PerspectiveCamera makeDefault position={[0, 0, 5]}
                           fov={50}
                           aspect={window.innerWidth/window.innerHeight}
                           near={0.1}
                           far={1000} />
        <directionalLight position={[5, 10, 25]} intensity={1} color={"#FFFFFF"}/>
        <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />

        { cylinderConfigs.map((cylinderConfig, index) => (
              <Cylinder args={[1, 1, 0.1, 6]} key={index} position={[
                  cylinderConfig.x, cylinderConfig.y, 0
              ]} rotation={[Math.PI / 2, 0, 0]}>
                <meshPhongMaterial attach="material" color={cylinderConfig.color} />
              </Cylinder>
          )) }

      </Canvas>
    </div>
  );
}

export default App;
