var scene, renderer, camera, stats;
var cube;
var controls;

let mesh, mixer;

let prevTime = Date.now();

init();
animate();

function init() {



    /* renderer */
    renderer = new THREE.WebGLRenderer({ antialias: true });
    var width = window.innerWidth;
    var height = window.innerHeight;
    renderer.setSize(width, height);
    document.body.appendChild(renderer.domElement);

    /* scene params */
    scene = new THREE.Scene();
    scene.background = new THREE.Color('#444444')

    /*
    //test cube

    var cubeGeometry = new THREE.BoxGeometry(10, 10, 10);
    var cubeMaterial = new THREE.MeshBasicMaterial({ color: 0x1ec876 });
    cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

    cube.position.set(0, 0, 0);
    scene.add(cube);*/

    /* camera */
    camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
    camera.position.y = 160;
    camera.position.z = 400;
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    const loader = new THREE.GLTFLoader();
    loader.load('./models/clocker11.gltf', gltf => {
    /*loader.load('./models/clocker11.glb', gltf => {*/
    /*loader.load('./models/satanhands.gltf', gltf => {*/
        mesh = gltf.scene.children[0];
        mesh.scale.set(14, 14, 14);
        mesh.position.set(0, -18, -4);
        mesh.rotation.set(0, 0, 0);
        scene.add(mesh);

        mixer = new THREE.AnimationMixer(mesh);
        mixer.clipAction(gltf.animations[0]).setDuration(0.5).play();
    })

    /* lights 
    const skyColor = '#c3c3c3';  // light blue
    const groundColor = '#ffffff';  // brownish orange
    const intensity = 1;
    const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
    scene.add(light);*/



    const light1 = new THREE.DirectionalLight(0xefefff, 0);
    light1.position.set(1, 1, 1).normalize();
    scene.add(light1);

    const light2 = new THREE.DirectionalLight(0xffefef, 0);
    light2.position.set(- 1, - 1, - 1).normalize();
    scene.add(light2);


    /* camera controls */
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.maxDistance = 20;
    controls.minDistance = 5;
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enablePan = false;

    /* var gridXZ = new THREE.GridHelper(10, 10);
    scene.add(gridXZ); */

}

function modelAnimation() {
    if (mixer) {
        const time = Date.now();
        mixer.update((time - prevTime) * 0.001);
        prevTime = time;
    }
}

function animate() {
    controls.update();
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    modelAnimation()
}
