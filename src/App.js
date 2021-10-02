import './App.css';
import {useState} from "react";
import {Canvas, useFrame, useThree} from "@react-three/fiber";
import {Cylinder, PerspectiveCamera, OrbitControls} from "@react-three/drei";

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

const AnimateCamera = ({cursorPosition, screenSize}) => {
  const { gl, camera } = useThree()

  const animationRatio = Math.PI / 2 / 90 * 0.5

  const calculateDegree = (screenSize, current) => {
    const percentage = (screenSize / 2  - current) / screenSize * 2;
    return percentage * animationRatio
  }

  useFrame(() => {
    camera.rotateX(calculateDegree(screenSize[1], cursorPosition[1]));
    camera.rotateY(calculateDegree(screenSize[0], cursorPosition[0]));
  });

  return <OrbitControls enablePan={false} enableRotate={false} enableZoom={false}
                        target={[0, 0, 0]} args={[camera, gl.domElement]}/>;
}

const App = () => {
  const [cursorPosition, setCursorPosition] = useState([null, null]);
  const screenSize = [window.innerWidth, window.innerHeight];

  return (
    <div className="App" onMouseMove={event => setCursorPosition([event.clientX, event.clientY])}>
      <Canvas onCreated={state => state.gl.setClearColor("#212121")}>
        <PerspectiveCamera makeDefault position={[0, 0, 5]}
                           fov={50}
                           aspect={window.innerWidth/window.innerHeight}
                           near={0.1}
                           far={1000} />
        <directionalLight position={[5, 10, 25]} intensity={1} color={"#FFFFFF"}/>

        { cylinderConfigs.map((cylinderConfig, index) => (
              <Cylinder args={[1, 1, 0.1, 6]} key={index} position={[
                  cylinderConfig.x, cylinderConfig.y, 0
              ]} rotation={[Math.PI / 2, 0, 0]}>
                <meshPhongMaterial attach="material" color={cylinderConfig.color} />
              </Cylinder>
          )) }

        <AnimateCamera cursorPosition={cursorPosition} screenSize={screenSize}/>
      </Canvas>
    </div>
  );
}

export default App;