#pragma strict
var shakeTime : float = 0.0;
var decrease : float;
var shakeStrength : float;
private var camRotation : Vector3;

function Start () {
	camRotation.x = camera.main.transform.rotation.x;
	camRotation.y = camera.main.transform.rotation.x;
	camRotation.z = camera.main.transform.rotation.x;
}

function Update () {
	transform.position.x = GameObject.Find("Character").transform.position.x;
	transform.position.y = GameObject.Find("Character").transform.position.y;
	
	if(shakeTime > 0){
		shakeTime = shakeTime - decrease * Time.deltaTime;
		var cam = camera.main.transform;
		
		//cam.rotation.x += Random.Range(-shakeStrength, shakeStrength);
		//cam.rotation.y += Random.Range(-shakeStrength, shakeStrength);
		cam.rotation.z += Mathf.Sin(shakeTime) * (shakeStrength);
	}
	else{
		camera.main.transform.rotation.x = camRotation.x;
		camera.main.transform.rotation.y = camRotation.y;
		camera.main.transform.rotation.z = camRotation.z;
		
	}
}