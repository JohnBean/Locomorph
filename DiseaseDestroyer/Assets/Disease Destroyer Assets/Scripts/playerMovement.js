private var maxX = 490;
private var minX = -490;
private var maxY = 490;
private var minY = -490;
var speed : float;
var bullet : Rigidbody;
var bulletSpeed : float;
var clone : Transform;
var burstLength : float;
var burstAngle : float;
var burstVel : float;
private var startTime;
var curBullet: Rigidbody;
// Use this for initialization
function Start () {
	startTime=Time.realtimeSinceStartup;
}
function restart(){
	rigidbody.position=Vector3.zero;
	rigidbody.velocity=Vector3.zero;
	startTime=Time.realtimeSinceStartup;
}
//Update is called once per frame
function Update(){
	//Finds number of bullets, fires if there are none
	var numBullets = GameObject.FindGameObjectsWithTag("Bullet").Length;
	if (Input.GetButtonDown("Fire1")) {
		if(numBullets == 0){
			curBullet = Instantiate(bullet, GameObject.Find("BulletSpawn").transform.position, transform.rotation);
			curBullet.velocity = Vector3.Normalize(GameObject.Find("BulletSpawn").transform.position - transform.position) * bulletSpeed;// + GameObject.Find("Character").rigidbody.velocity;
		}
		else{
			curBullet.GetComponent(bulletControl).kill();
		}
		 // Instantiate the projectile at the position and rotation of this transform
		 
		
	}	
	if(Input.GetButtonDown("Fire2")){
		burstAttack();
	}
}

// FixedUpdate is called with physics
function FixedUpdate () {
	if((Time.realtimeSinceStartup>(this.startTime+1))){//only move if the game isn't over
		PlayerFacing();
    	if(rigidbody.velocity.magnitude<350){
    		rigidbody.velocity.y =  rigidbody.velocity.y+Input.GetAxis("Vertical") * speed;
    		rigidbody.velocity.x =  rigidbody.velocity.x+Input.GetAxis("Horizontal") * speed;
    	}	
    }
    else{
    	rigidbody.position=Vector3.zero;
		rigidbody.velocity=Vector3.zero;
    }
    if(rigidbody.transform.position.x>maxX){//if the virus leaves the bounding box bring it back in and send it toward the center
    	rigidbody.transform.position.x=maxX;
    	rigidbody.velocity.x=-Mathf.Abs(rigidbody.velocity.x*.5);
    }
    if(rigidbody.transform.position.x<minX){
    	rigidbody.transform.position.x=minX;
    	rigidbody.velocity.x=Mathf.Abs(rigidbody.velocity.x*.5);
    }
    if(rigidbody.transform.position.y>maxY){
    	rigidbody.transform.position.y=maxY;
    	rigidbody.velocity.y=-Mathf.Abs(rigidbody.velocity.y*.5);
    }
    if(rigidbody.transform.position.y<minY){
    	rigidbody.transform.position.y=minY;
    	rigidbody.velocity.y=Mathf.Abs(rigidbody.velocity.y*.5);
    }
	if(rigidbody.velocity.magnitude>=450){
		rigidbody.velocity=rigidbody.velocity*.95;
	}
	else{
		rigidbody.velocity=rigidbody.velocity*.99;
	}
}
function addVel(velocity: Vector3){
	rigidbody.velocity.x=velocity.x;
	rigidbody.velocity.y=velocity.y;	
}

function burstAttack(){
	var colliders = Physics.OverlapSphere(transform.position, burstLength);
	for(var hit : Collider in colliders){
		if(hit.rigidbody){
			//Detects whether they're within the proper angle
			var angle = Vector3.Angle(hit.rigidbody.position - transform.position, transform.forward);
			if(angle <= burstAngle){
				//BURST CODE HERE
				var burstDir = Vector3.Normalize(hit.rigidbody.position - transform.position);
				hit.rigidbody.velocity = hit.rigidbody.velocity + burstDir * burstVel;
			}
		}
	}
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


