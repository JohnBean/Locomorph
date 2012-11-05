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
var bullet : Transform;
var bulletSpeed : float = 20;
var clone : Transform;
// Use this for initialization
function Start () {
	var cellGenerator=0;
	var cellGroup=0;
	var groupSize= (Random.Range(0,10));
	numVirusStart=16.0;
	numCellsStart=160;
	minCells=40;
	
	while(cellGenerator<numCellsStart){
		if(cellGroup<groupSize){
			
		}
		var cellClone : Rigidbody = Instantiate(cell, Vector3(Random.Range(minX+20,maxX-20),Random.Range(minY+20,maxY-20),0), cellClone.rotation);
		cellGenerator=cellGenerator+1;
	}
	for(virusGenerator = 0; virusGenerator<numVirusStart;virusGenerator++){//spawn viruses at random locations
		var virusClone : Rigidbody = Instantiate(virus, Vector3(Random.Range(minX+20,maxX-20),Random.Range(minY+20,maxY-20),0), virusClone.rotation);
	}
	speed = 100.0;
}

// Update is called once per frame
function Update () {
	var MouseWorldPosition: Vector3;
	//if(cPercent>=0 && vPercent>=0){
		PlayerFacing();
		if (Input.GetButtonDown("Fire1")) {

   			 // Instantiate the projectile at the position and rotation of this transform
   			 
   			clone = Instantiate(bullet, transform.position, bullet.rotation);
			//clone.transform.LookAt(Input.mousePosition);
    // Add force to the cloned object in the object's forward direction
    		clone.rigidbody.velocity=Vector3(0,1,0);
    	}
    	transform.Translate (-Input.GetAxis ("Horizontal") * speed* Time.deltaTime,Input.GetAxis ("Vertical") * speed* Time.deltaTime, 0);
    //}
}

//Player always faces the mouse, does some voodoo shit with raycasting to determine direction to face
function PlayerFacing(){
	var hitdist = -1.0;
	var ray = Camera.main.ScreenPointToRay(Input.mousePosition);
	var playerPlane = new Plane(Vector3.up, transform.position);
	if(playerPlane.Raycast(ray, hitdist)){
		var targetPoint = ray.GetPoint(hitdist);
		var rotation = Quaternion.LookRotation(targetPoint - transform.position);
		//transform.rotation = Quaternion.Slerp(transform.rotation, rotation, Time.deltaTime);
		transform.rotation = rotation;
	}	
}


function OnGUI() {
	var mapX=590;
	var mapY=405;
	var gos : GameObject[];
	var style : GUIStyle;
	//style.fontSize=40;
    gos = GameObject.FindGameObjectsWithTag("Finish"); //finds how many viruses are left
	vPercent = gos.Length/numVirusStart;
    GUI.backgroundColor = Color(0, 255-(30*vPercent),2-(2*vPercent),50);//change color based on number of viruses, fade green to teal
    GUI.HorizontalScrollbar(Rect (375,20,200,20), 200, vPercent*100,0, 100);//change virus bar based on percent remaining
    GUI.Label(Rect(15,25,100,100),"Score = " + (numVirusStart-gos.Length));//Score
    
    gos = GameObject.FindGameObjectsWithTag("Respawn"); //How many Cells remain
    cPercent= (gos.Length-minCells)/(numCellsStart-minCells);
    if(cPercent>=0){
    	GUI.backgroundColor = Color(255-(30*cPercent),1-(1*cPercent),1-(1*cPercent));//update color from red to brownred
   		GUI.HorizontalScrollbar(Rect (175,20,200,20), 0, cPercent*100,0, 100);//scale health
   	}
    if(cPercent<=0 || vPercent<=0){
    	GUI.backgroundColor = Color(225,1,1);//update color from red to brownred
   		GUI.HorizontalScrollbar(Rect (175,20,200,20), 0, 0,0, 100);//scale health
    	GUI.Label(Rect(350,250,100,100),"Game Over");
    	if(cPercent>0){
    		GUI.Label(Rect(350,300,100,100),"You Win!");
    	}
    	else{
    		GUI.Label(Rect(350,300,100,100),"You Lose.");
    	}
    }
}
