let scene, camera, renderer;
const BACKGROUND_COLOR = 0xf1f1f1;
const model_path = "../models/car/scene.gltf";

window.onload = function EntryPoint()
{
	scene = new THREE.Scene();
	scene.background = new THREE.Color(BACKGROUND_COLOR);
	
	camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 5000);
	camera.rotation.y = 45 / 180 * Math.PI;
	camera.position.x = 850;
	camera.position.y = 200;
	camera.position.z = 800;
	
	hlight = new THREE.AmbientLight(0x404040, 10);
	scene.add(hlight);
	
	directionalLight = new THREE.DirectionalLight(0x404040, 10);
	directionalLight.position.set(30, 10, 30);
	directionalLight.castShadow = true;
	scene.add(directionalLight);
	
	light = new THREE.PointLight(0x808080, 20);
	light.position.set(0, 300, 500);
	scene.add(light);
	light1 = new THREE.PointLight(0x808080, 20);
	light1.position.set(500, 100, 0);
	scene.add(light1);
	light2 = new THREE.PointLight(0x808080, 20);
	light2.position.set(0, 100, -500);
	scene.add(light2);
	light3 = new THREE.PointLight(0x808080, 20);
	light3.position.set(-500, 300, 0);
	scene.add(light3);
	
	renderer = new THREE.WebGLRenderer({antialias: true});
	document.body.appendChild(renderer.domElement);
	
	var controls = new THREE.OrbitControls( camera, renderer.domElement );
			controls.enableDamping = true;
			controls.enablePan = false;
			controls.dampingFactor = 0.1;
			controls.autoRotate = false;
			controls.autoRotateSpeed = 0.2;
	
	let loader = new THREE.GLTFLoader();
	
	loader.load(model_path, function(obj){
		car = obj.scene.children[0];
		car.scale.set(1, 1, 1);
		scene.add(obj.scene);
		
		animate();
	});
	
	function resizeRendererToDisplaySize(renderer) 
	{
		const canvas = renderer.domElement;
		var width = window.innerWidth;
		var height = window.innerHeight;
		var canvasPixelWidth = canvas.width / window.devicePixelRatio;
		var canvasPixelHeight = canvas.height / window.devicePixelRatio;
		const needResize = canvasPixelWidth !== width || canvasPixelHeight !== height;
		
		if (needResize) { 
					renderer.setSize(width, height, false);
				}
		
		return needResize;
	}
	
	function animate()
	{
		renderer.render(scene, camera);
		requestAnimationFrame(animate);
		controls.update();
		
		if (resizeRendererToDisplaySize(renderer)) {
					const canvas = renderer.domElement;
					camera.aspect = canvas.clientWidth / canvas.clientHeight;
					camera.updateProjectionMatrix();
				}
	}
}