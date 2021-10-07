import { animated, SpringValue } from "@react-spring/three";
import React, { FC } from "react";
import { useThree } from "@react-three/fiber";
import { PerspectiveCamera } from "three";

interface AnimateCameraProps {
  cameraX: SpringValue<number>;
  cameraY: SpringValue<number>;
  cameraZ: SpringValue<number>;
}

export const AnimateCamera: FC<AnimateCameraProps> = ({
  cameraX,
  cameraY,
  cameraZ,
}) => {
  const { camera, set, size } = useThree();
  const cameraRef = React.useRef<PerspectiveCamera>();

  React.useLayoutEffect(() => {
    const { current: cam } = cameraRef;
    if (cam) {
      cam.aspect = size.width / size.height;
      cam.updateProjectionMatrix();
    }
  }, [size]);

  React.useLayoutEffect(() => {
    if (cameraRef.current) {
      const oldCam = camera;
      set(() => ({ camera: cameraRef.current }));
      return () => set(() => ({ camera: oldCam }));
    }
  }, [camera, cameraRef, set]);

  return (
    <animated.perspectiveCamera
      ref={cameraRef}
      position-x={cameraX}
      position-y={cameraY}
      position-z={cameraZ}
      fov={50}
      aspect={window.innerWidth / window.innerHeight}
      near={0.1}
      far={1000}
    />
  );
};
