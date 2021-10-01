import './App.css';
import * as THREE from "three";
import { useEffect } from "react";

const initialSetup = () => {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
  camera.position.set(0, 1, 5);
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize( window.innerWidth, window.innerHeight );

  document.body.appendChild( renderer.domElement );

  return {
    scene, camera, renderer
  }
}

const addCubes = (scene) => {
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({
    color: '#66ccff',
    wireframe: true
  });

  const cube = new THREE.Mesh(geometry, material)

  scene.add(cube);

  cube.position.set(0, 0, 0);

  return cube;
}

const App = () => {
  useEffect(() => {
    const { scene, camera, renderer } = initialSetup();

    const cube = addCubes(scene);

    renderer.setAnimationLoop(() => {
      cube.rotation.y += 0.001;
      renderer.render(scene, camera);
    });
  }, []);

  return (
    <div className="App" />
  );
}

export default App;
