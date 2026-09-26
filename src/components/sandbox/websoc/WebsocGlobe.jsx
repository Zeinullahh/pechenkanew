"use client";

import React, { useEffect, useRef, useCallback } from "react";
import { getCountryColor } from "@/lib/colors";

const dotRadius = 0.4;

function fixPolygon(feature) {
  if (feature.geometry.type === "Polygon") {
    feature.geometry.coordinates = feature.geometry.coordinates.map((ring) => {
      const first = ring[0];
      const last = ring[ring.length - 1];
      if (first[0] !== last[0] || first[1] !== last[1]) {
        ring.push([...first]);
      }
      return ring;
    });
  }
  if (feature.geometry.type === "MultiPolygon") {
    feature.geometry.coordinates = feature.geometry.coordinates.map((polygon) =>
      polygon.map((ring) => {
        const first = ring[0];
        const last = ring[ring.length - 1];
        if (first[0] !== last[0] || first[1] !== last[1]) {
          ring.push([...first]);
        }
        return ring;
      })
    );
  }
  return feature;
}

export default function WebsocGlobe({
  countryValues = {},
  maxValue = 100,
  setHoveredCountry,
  blacklist = [],
  theme,
}) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const globeRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const controlsRef = useRef(null);
  const THREERef = useRef(null);
  const geoDataRef = useRef(null);
  const animFrameIdRef = useRef(null);

  const ambientLightRef = useRef(null);
  const directionalLight1Ref = useRef(null);
  const directionalLight2Ref = useRef(null);
  const pointLightRef = useRef(null);

  const updateCountryColors = useCallback(() => {
    if (!globeRef.current || !THREERef.current || !geoDataRef.current) return;
    const Globe = globeRef.current;

    Globe.hexPolygonColor((e) => {
      const countryCode = e.properties.ISO_A2;
      const value = countryValues[countryCode]?.total || 0;
      return getCountryColor(value, maxValue, countryCode, blacklist, theme);
    });

    Globe.children.forEach((child) => {
      if (child.material) {
        child.material.needsUpdate = true;
      }
    });
  }, [countryValues, maxValue, blacklist, theme]);

  // Scene initialization
  useEffect(() => {
    let isDisposed = false;
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const width = container.clientWidth || 1384;
    const height = container.clientHeight || 950;

    Promise.all([
      import("three"),
      import("three/examples/jsm/controls/OrbitControls.js"),
      import("three-globe"),
    ])
      .then(([THREE, { OrbitControls }, ThreeGlobeModule]) => {
        if (isDisposed) return;
        const ThreeGlobeClass = ThreeGlobeModule.default || ThreeGlobeModule;
        THREERef.current = THREE;

        const renderer = new THREE.WebGLRenderer({
          antialias: true,
          canvas,
          alpha: true,
        });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
        renderer.setSize(width, height);
        rendererRef.current = renderer;

        const scene = new THREE.Scene();
        sceneRef.current = scene;

        const ambientLight = new THREE.AmbientLight(theme.ambientLight, 0.3);
        ambientLightRef.current = ambientLight;
        scene.add(ambientLight);

        const camera = new THREE.PerspectiveCamera(45, width / height, 10, 3000);
        camera.position.z = 400;
        cameraRef.current = camera;
        scene.add(camera);

        const dirLight1 = new THREE.DirectionalLight(theme.directionalLight1, 0.8);
        dirLight1.position.set(-800, 2000, 400);
        directionalLight1Ref.current = dirLight1;
        camera.add(dirLight1);

        const dirLight2 = new THREE.DirectionalLight(theme.directionalLight2, 1);
        dirLight2.position.set(-200, 500, 200);
        directionalLight2Ref.current = dirLight2;
        camera.add(dirLight2);

        const pLight = new THREE.PointLight(theme.pointLight, 0.5);
        pLight.position.set(-200, 500, 200);
        pointLightRef.current = pLight;
        camera.add(pLight);

        scene.fog = new THREE.Fog(theme.fog, 400, 2000);

        const controls = new OrbitControls(camera, canvas);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.enablePan = false;
        controls.enableZoom = false; // Prevent wheel hijacks inside sandbox
        controls.rotateSpeed = 0.8;
        controls.minPolarAngle = Math.PI / 3.5;
        controls.maxPolarAngle = Math.PI - Math.PI / 3;
        controlsRef.current = controls;

        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();
        let lastCountry = null;

        const onMouseMove = (event) => {
          const rect = canvas.getBoundingClientRect();
          mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
          mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

          raycaster.setFromCamera(mouse, camera);
          const intersects = raycaster.intersectObjects(scene.children, true);

          let frontIntersect = null;
          for (const intersect of intersects) {
            if (intersect.object.__data && intersect.object.__data.properties) {
              const normal = intersect.point.clone().normalize();
              const toCamera = new THREE.Vector3().subVectors(camera.position, intersect.point);
              if (normal.dot(toCamera) > 0) {
                frontIntersect = intersect;
                break;
              }
            }
          }

          if (frontIntersect) {
            const iso = frontIntersect.object.__data.properties.ISO_A2;
            if (iso !== lastCountry) {
              lastCountry = iso;
              setHoveredCountry?.(iso);
            }
          } else {
            if (lastCountry !== null) {
              lastCountry = null;
              setHoveredCountry?.(null);
            }
          }
        };

        const onMouseLeave = () => {
          lastCountry = null;
          setHoveredCountry?.(null);
        };

        canvas.addEventListener("mousemove", onMouseMove);
        canvas.addEventListener("mouseleave", onMouseLeave);

        const animate = () => {
          if (isDisposed) return;
          controls.update();
          renderer.render(scene, camera);
          animFrameIdRef.current = requestAnimationFrame(animate);
        };

        // Fetch GeoJSON
        fetch("/data/countries.geojson")
          .then((res) => {
            if (!res.ok) throw new Error("Failed to load geojson");
            return res.json();
          })
          .then((geoData) => {
            if (isDisposed) return;
            geoData.features = geoData.features.filter((f) => f.properties.ISO_A2 !== "AQ");
            geoData.features.forEach((f, idx) => {
              geoData.features[idx] = fixPolygon(f);
            });
            geoDataRef.current = geoData;

            const Globe = new ThreeGlobeClass({
              waitForGlobeReady: true,
              animateIn: true,
            })
              .hexPolygonsData(geoData.features)
              .hexPolygonResolution(3)
              .hexPolygonMargin(0.3)
              .showAtmosphere(true)
              .atmosphereColor(theme.atmosphere)
              .atmosphereAltitude(0.2)
              .hexPolygonColor((e) => {
                const countryCode = e.properties.ISO_A2;
                const value = countryValues[countryCode]?.total || 0;
                return getCountryColor(value, maxValue, countryCode, blacklist, theme);
              });

            Globe.rotateY(-Math.PI * (5 / 9));
            Globe.rotateZ(-Math.PI / 6);

            const mat = Globe.globeMaterial();
            mat.color = new THREE.Color(theme.globeMaterial);

            scene.add(Globe);
            globeRef.current = Globe;

            // Trigger color pass
            updateCountryColors();
            animate();
          })
          .catch((err) => {
            console.error("WebsocGlobe init error:", err);
            // Fallback rendering
            const sphereGeo = new THREE.SphereGeometry(100, 32, 32);
            const sphereMat = new THREE.MeshBasicMaterial({
              color: theme.globeMaterial,
              wireframe: true,
            });
            const mesh = new THREE.Mesh(sphereGeo, sphereMat);
            scene.add(mesh);
            globeRef.current = mesh;
            animate();
          });
      })
      .catch((err) => {
        console.error("Three.js or ThreeGlobe import error:", err);
      });

    return () => {
      isDisposed = true;
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, []); // Run once on mount

  // Update country colors dynamically when props change
  useEffect(() => {
    updateCountryColors();
  }, [updateCountryColors]);

  // Update scene when theme changes
  useEffect(() => {
    if (!sceneRef.current || !globeRef.current || !THREERef.current) return;
    const THREE = THREERef.current;

    sceneRef.current.fog = new THREE.Fog(theme.fog, 400, 2000);
    if (ambientLightRef.current) ambientLightRef.current.color = new THREE.Color(theme.ambientLight);
    if (directionalLight1Ref.current) directionalLight1Ref.current.color = new THREE.Color(theme.directionalLight1);
    if (directionalLight2Ref.current) directionalLight2Ref.current.color = new THREE.Color(theme.directionalLight2);
    if (pointLightRef.current) pointLightRef.current.color = new THREE.Color(theme.pointLight);

    if (globeRef.current.globeMaterial) {
      const mat = globeRef.current.globeMaterial();
      mat.color = new THREE.Color(theme.globeMaterial);
    }
    if (globeRef.current.atmosphereColor) {
      globeRef.current.atmosphereColor(theme.atmosphere);
    }

    updateCountryColors();
  }, [theme, updateCountryColors]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-auto"
      style={{ background: theme.background }}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-grab active:cursor-grabbing block"
      />
    </div>
  );
}
