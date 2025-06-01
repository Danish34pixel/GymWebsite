import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const ThreeScene = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 400 / 300, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(400, 300);
    renderer.setClearColor(0x000000, 0);

    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

    // Lighting
    scene.add(new THREE.AmbientLight(0xffffff, 0.7));
    const dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.position.set(5, 5, 5);
    scene.add(dirLight);

    camera.position.z = 6;

    const loader = new GLTFLoader();
    const models = [];

    // List of GLB files with positions
    const glbModels = [
      {
        url: "/Strength_in_Focus_0601190043_texture.glb",
        position: [0, 0, 0],
        scale: [1.5, 1.5, 1.5],
      },
      {
        url: "/Dumbbells_on_Mat_0601193646_texture.glb", // Replace with your second model path
        position: [2, -2, 0],
        scale: [1.2, 1.2, 1.2],
      },
      {
        url: "/Barbell_Shadowplay_0601194428_texture.glb", // Replace with your second model path
        position: [-2, -2, 0],
        scale: [1.2, 1.2, 1.2],
      },

      // Add more models here
    ];

    glbModels.forEach((config, index) => {
      loader.load(
        config.url,
        (gltf) => {
          const model = gltf.scene;
          model.position.set(...config.position);
          model.scale.set(...config.scale);
          scene.add(model);
          models.push(model);
        },
        undefined,
        (error) => {
          console.error(`Failed to load model ${config.url}:`, error);
        }
      );
    });

    const animate = () => {
      requestAnimationFrame(animate);
      models.forEach((model) => {
        model.rotation.y += 0.01;
      });
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="flex justify-center" />;
};

export default ThreeScene;
