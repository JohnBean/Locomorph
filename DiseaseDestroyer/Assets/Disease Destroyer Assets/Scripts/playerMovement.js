public var maxX = 480;
public var minX = -480;
public var maxY = 480;
public var minY = -480;
var speed : float;
var bullet : Rigidbody;
var bulletSpeed : float = 20;
var clone : Transform;



//temp
public var radius = 60.0;
var power = 300.0;


// Use this for initialization
function Start () {
	
}

// Update is called once per frame
function FixedUpdate () {
	var MouseWorldPosition: Vector3;
	//if(cPercent>=0 && vPercent>=0){//only move if the game isn't over
		PlayerFacing();
		if (Input.GetButtonDown("Fire1")) {
			
   			 // Instantiate the projectile at the position and rotation of this transform
   			 
   			var clone : Rigidbody = Instantiate(bullet, GameObject.Find("BulletSpawn").transform.position, transform.rotation);
			clone.velocity = Vector3.Normalize(GameObject.Find("BulletSpawn").transform.position - transform.position) * bulletSpeed;
    	}
    	if (Input.GetButtonDown("Fire2")) {
			var explosionPos : Vector3 = gameObject.transform.position;
    		var colliders = GameObject.FindGameObjectsWithTag("Finish");
    		for (var hit : GameObject in colliders) {
            	var diff = (transform.position - hit.rigidbody.position);      	
            	var curDistance = Mathf.Sqrt(( Mathf.Abs(diff.x)*Mathf.Abs(diff.x))+(Mathf.Abs(diff.y)+Mathf.Abs(diff.y))); 
        		if (curDistance<=radius){
        			hit.GetComponent(virusMovement).kill();
    			}
    		}
    		colliders = GameObject.FindGameObjectsWithTag("Respawn");
    		for (var hit : GameObject in colliders) {
            	diff = (transform.position - hit.rigidbody.position);    	
            	curDistance = Mathf.Sqrt(( Mathf.Abs(diff.x)*Mathf.Abs(diff.x))+(Mathf.Abs(diff.y)+Mathf.Abs(diff.y))); 
        		if (curDistance<=radius){
           			hit.rigidbody.AddExplosionForce(power, explosionPos, radius, 2.0);
    			}
    		}
    		print("boom");
    	}
    	transform.position.y = transform.position.y + Input.GetAxis("Vertical") * Time.deltaTime * speed;
    	transform.position.x = transform.position.x + Input.GetAxis("Horizontal") * Time.deltaTime * speed;	
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


