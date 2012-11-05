var speed  = 10.0;
var velocity : Vector3;
public var maxX = 480;
public var minX = -480;
public var maxY = 480;
public var minY = -480;
//var clone : Transform;
private var wallX=false;
private var wallY=false;
private var tChange: float = 0; // force new direction in the first Update
var xDir: float;
var yDir: float;


//var virus : Rigidbody;



// Use this for initialization
function Start () {

}

// Update is called once per frame
function Update () {
	// change to random direction at random intervals
    if (Time.time >= tChange){
       //randomDirection();   
       nearestCell();    
       //decide();
    }
 /*   if (transform.position.x >= maxX){ 
    	xDir= -Mathf.Abs(Random.Range(0,2));
    	transform.position.x=maxX-1;
    } 
    if (transform.position.x <= minX){ 
    	xDir= Mathf.Abs(Random.Range(0,2));
    	transform.position.x=minX+1;
    } 
    if (transform.position.y >= maxY){ 
    	yDir = -Mathf.Abs(Random.Range(0,2));
    	transform.position.y=maxY-1;
    } 
    if (transform.position.y <= minY){ 
    	yDir= Mathf.Abs(Random.Range(0,2));
    	transform.position.y=minY+1;
    } */
    transform.Translate(Vector3(xDir,0,yDir) * speed * Time.deltaTime);
    transform.position.z=0;   

}
function randomDirection(){
	randomDir(.5,1.5);
}
function randomDir(minDuration: float, maxDuration: float){
	tChange = Time.time + Random.Range(minDuration,maxDuration);
	xDir = Random.Range(-2,2.0); // with float parameters, a random float
    yDir = Random.Range(-2.0,2.0); //  between -2.0 and 2.0 is returned
}

function nearestCell(){
	var gos : GameObject[];
    gos = GameObject.FindGameObjectsWithTag("Respawn"); 
    var closest : GameObject; 
    var distance = Mathf.Infinity; 
    var position = transform.position; 
    // Iterate through them and find the closest one
    for (var go : GameObject in gos)  {
    	
        var diff = (go.transform.position - position);

        var curDistance = diff.sqrMagnitude; 
        if (curDistance < distance) { 
            closest = go; 
            distance = curDistance; 
        } 
    }
    if(closest!=null){
    	if(closest.transform.position.y<position.y){
    		yDir=Random.Range(0.0,2.0);
    	}
    	else if(closest.transform.position.y>position.y){
    		yDir=Random.Range(-2.0,0.0);
    	}
    	if(closest.transform.position.x<position.x){
    		xDir=Random.Range(-2.0,0.0);
    	}
   		else if(closest.transform.position.x>position.x){
    		xDir=Random.Range(0.0,2.0);
   	 	}
    }
    tChange = Time.time + Random.Range(1,2);
}

function flee(){
	var player=GameObject.FindGameObjectWithTag("Player");
	var position = transform.position; 
	if(player!=null){
    	if(player.transform.position.y<position.y){
    		yDir=Random.Range(-2.0,0.0);
    	}
    	else if(player.transform.position.y>position.y){
    		yDir=Random.Range(0.0,2.0);
    	}
    	if(player.transform.position.x<position.x){
    		xDir=Random.Range(0.0,2.0);
    	}
   		else if(player.transform.position.x>position.x){
    		xDir=Random.Range(-2.0,0.0);
   	 	}
    }
    tChange = Time.time + Random.Range(1,2);
}
function attack(){
	var player=GameObject.FindGameObjectWithTag("Player");
	var position = transform.position; 
	if(player!=null){
    	if(player.transform.position.y<position.y){
    		yDir=Random.Range(0.0,2.0);
    	}
    	else if(player.transform.position.y>position.y){
    		yDir=Random.Range(-2.0,0.0);
    	}
    	if(player.transform.position.x<position.x){
    		xDir=Random.Range(-2.0,0.0);
    	}
   		else if(player.transform.position.x>position.x){
    		xDir=Random.Range(0.0,2.0);
   	 	}
    }
    tChange = Time.time + Random.Range(1,2);
}
function decide(){
	var player=GameObject.FindGameObjectWithTag("Player");
	var distance = Mathf.Infinity; 
    var position = transform.position; 
    var diff = (player.transform.position - position);
	var curDistance = diff.sqrMagnitude; 
	if(GameObject.FindGameObjectsWithTag("Respawn").Length==0 || curDistance<50){
		attack();//flee();
	}
	else{
		if(Random.Range(0,6)<2){
			randomDirection();
		}
		else{
			nearestCell();
		}
	}	
}
function OnCollisionEnter( collision : Collision )
{
    if(collision.gameObject.name=="Player"){
    	Destroy (gameObject);

// Removes this script instance from the game object
		Destroy (this);

// Removes the rigidbody from the game object
		Destroy (rigidbody);
    }
    
}