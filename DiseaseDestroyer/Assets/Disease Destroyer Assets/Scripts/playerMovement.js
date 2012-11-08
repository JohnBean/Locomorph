public var maxX = 480;
public var minX = -480;
public var maxY = 480;
public var minY = -480;
var speed : float;
var bullet : Rigidbody;
var bulletSpeed : float;
var clone : Transform;

// Use this for initialization
function Start () {
	
}

//Update is called once per frame
function Update(){
	//Finds number of bullets, fires if there are none
	var numBullets = GameObject.FindGameObjectsWithTag("Bullet").Length;
	if (Input.GetButtonDown("Fire1") && numBullets == 0) {
		
		 // Instantiate the projectile at the position and rotation of this transform
		 
		var clone : Rigidbody = Instantiate(bullet, GameObject.Find("BulletSpawn").transform.position, transform.rotation);
		clone.velocity = Vector3.Normalize(GameObject.Find("BulletSpawn").transform.position - transform.position) * bulletSpeed;
	}	
}

// FixedUpdate is called with physics
function FixedUpdate () {
	//if(cPercent>=0 && vPercent>=0){//only move if the game isn't over
		PlayerFacing();
    	rigidbody.velocity.y =  Input.GetAxis("Vertical") * speed;
    	rigidbody.velocity.x =  Input.GetAxis("Horizontal") * speed;	
    //}

}

//Player always faces the mouse, does some voodoo shit with raycasting to determine direction to face
function PlayerFacing(){
	var hitdist = 1.0;
	var ray = Camera.main.ScreenPointToRay(Input.mousePosition);
	var playerPlane = new Plane(Vector3(0,0,1), transform.position);
	if(playerPlane.Raycast(ray, hitdist)){
		var targetPoint = ray.GetPoint(hitdist);
		var rotation = Quaternion.LookRotation(targetPoint - transform.position);
		//transform.rotation = Quaternion.Slerp(transform.rotation, rotation, Time.deltaTime);
		transform.rotation = rotation;
	}
}


