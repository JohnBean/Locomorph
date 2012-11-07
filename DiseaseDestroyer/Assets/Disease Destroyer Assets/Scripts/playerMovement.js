public var maxX = 480;
public var minX = -480;
public var maxY = 480;
public var minY = -480;
var speed : float;
var numCellsStart : float;
var minCells: int;
var numVirusStart : float;
var virus : Rigidbody;
var virusClone: Transform;
var cell : Rigidbody;
var cellClone : Transform;
var vPercent : float;
var cPercent : float;
var scoreVal: int;
var bullet : Transform;
var bulletSpeed : float = 20;
var clone : Transform;
var multiplier :float =90;


//temp
public var radius = 60.0;
var power = 300.0;

//Sends needed variables that seem to be here to a HUDHandler for easier editing
function HUDUpdate(){
	GameObject.Find("Main Camera").GetComponent(HUDHandler).minCells=minCells;
	GameObject.Find("Main Camera").GetComponent(HUDHandler).numVirusStart=numVirusStart;
	GameObject.Find("Main Camera").GetComponent(HUDHandler).vPercent=vPercent;
	GameObject.Find("Main Camera").GetComponent(HUDHandler).cPercent=cPercent;
	GameObject.Find("Main Camera").GetComponent(HUDHandler).scoreVal=scoreVal;
	GameObject.Find("Main Camera").GetComponent(HUDHandler).multiplier=multiplier;
	GameObject.Find("Main Camera").GetComponent(HUDHandler).numCellsStart=numCellsStart;
}
// Use this for initialization
function Start () {
	var cellGenerator=0;
	var cellGroup=0;
	for(psudoRand=0; psudoRand<Time.time*2;psudoRand++){
		Random.Range(-2,2);//trying to change what random is used when starting creation
	}
	
	//Long yet still rather bad cell placement 
	var groupSize= (Random.Range(0,6));
	var xLoc= Random.Range(1,maxX);
	var yLoc= Random.Range(1,maxY);
	var top= (Random.Range(-3,3)>0);
	var left= (Random.Range(-3,3)>0);
	var xDir;
	var yDir;
	
	numVirusStart=80.0;
	numCellsStart=250;
	minCells=150;
	
	while(cellGenerator<numCellsStart){
		if(cellGroup==0){
			if(top){//should we be placing cells above or below our location(move toward center)
				yDir=1;
			}
			else{
				yDir=-1;
				yLoc=-yLoc;
			}
			
			if(left){
				xDir=1;
				xLoc= -xLoc;
			}
			else{
				xDir=-1;
			}
			
			if(xLoc>0){
				xDir=-1;
			}
			else{
				xDir=1;
			}
			
			if(yLoc>0){
				yDir=-1;
			}
			else{
				yDir=1;
			}
		}	
		var cellClone : Rigidbody = Instantiate(cell, Vector3(xLoc,yLoc,0), cellClone.rotation);//create the cell at the location

		yLoc=yLoc+((55+Random.Range(0,10))*yDir);//change to a new spot
		xLoc=xLoc+((55+Random.Range(0,10))*xDir);
		if((Mathf.Abs(xLoc)>(maxX-30)) || (Mathf.Abs(yLoc)>(maxY-30)) || cellGroup >= groupSize){//if it's a new group choose a new place and direction to put the group
			groupSize= (Random.Range(0,10));
			xLoc= Random.Range(1,maxX);
			yLoc= Random.Range(1,maxY);
			top= (Random.Range(-3,3)>0);
			left= (Random.Range(-3,3)>0);
			cellGroup=0;
		}
		cellGenerator=cellGenerator+1;//go until you have the desired number of cells
	}
	for(virusGenerator = 0; virusGenerator<numVirusStart;virusGenerator++){//spawn viruses at random locations
		var virusClone : Rigidbody = Instantiate(virus, Vector3(Random.Range(minX,maxX),Random.Range(minY,maxY),0), virusClone.rotation);
	}
}

// Update is called once per frame
function FixedUpdate () {
	var MouseWorldPosition: Vector3;
	//if(cPercent>=0 && vPercent>=0){//only move if the game isn't over
		PlayerFacing();
		if (Input.GetButtonDown("Fire1")) {
			
   			 // Instantiate the projectile at the position and rotation of this transform
   			 
   			//clone = Instantiate(bullet, transform.position, transform.rotation);
			//clone.transform.LookAt(Input.mousePosition);
    // Add force to the cloned object in the object's forward direction
    	//	clone.rigidbody.velocity=transform.rotation;
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

function OnGUI(){
	HUDUpdate();
}


