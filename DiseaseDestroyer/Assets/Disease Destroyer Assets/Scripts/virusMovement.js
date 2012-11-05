var speed  = 10.0;
var maxSpeed=45;
var velocity : Vector3;
public var attached=false;
public var food;
public var foodOffset: Vector3;
public var maxX = 480;
public var minX = -480;
public var maxY = 480;
public var minY = -480;
//public var friction = .85;//percent of speed that remains (at .85 it loses 15% of its speed)
//var clone : Transform;
private var wallX=false;
private var wallY=false;
private var tChange: float = 0; // force new direction in the first Update
var xDir: float;
var yDir: float;


//var virus : Rigidbody;



// Use this for initialization
function Start () {
	var food: GameObject;
	var foodOffset: Vector3;
}

// Update is called once per frame
function Update () {
	// change to random direction at random intervals
	if(food!=null&&attached){
		rigidbody.velocity=food.velocity;
		rigidbody.position= food.position+foodOffset;
	}
    if (Time.time >= tChange){
    	attached=false;
       //randomDirection();   
       //nearestCell();    
           
       decide();
       rigidbody.velocity=rigidbody.velocity+Vector3(xDir*speed,yDir*speed,yDir*speed);
    }
    if(rigidbody.velocity.magnitude>maxSpeed){
    	rigidbody.velocity=rigidbody.velocity*.8;
    }
    if(rigidbody.position.x>maxX+30){
    	rigidbody.position.x=maxX;
    }
    if(rigidbody.position.x<minX-30){
    	rigidbody.position.x=minX;
    }
        if(rigidbody.position.y>maxY+30){
    	rigidbody.position.y=maxY;
    }
        if(rigidbody.position.y<minY-30){
    	rigidbody.position.y=minY;
    }
    
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
    		yDir=Random.Range(-2.0,0.0);
    	}
    	else if(closest.transform.position.y>position.y){
    		yDir=Random.Range(0.0,2.0);
    		
    	}
    	if(closest.transform.position.x<position.x){
    		xDir=Random.Range(-2.0,0.0);
    	}
   		else if(closest.transform.position.x>position.x){
    		xDir=Random.Range(0.0,2.0);
   	 	}
    }
    tChange = Time.time + Random.Range(2,4);
}

function attack(){
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
    		xDir=Random.Range(-2.0,0.0);
    		
    	}
   		else if(player.transform.position.x>position.x){
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
	if(GameObject.FindGameObjectsWithTag("Respawn").Length<30 || curDistance<100){
		attack();//flee();
	}
	else{
		if(Random.Range(0,8)<1){
			randomDirection();
		}
		else{
			nearestCell();
		}
	}	
}
function OnCollisionEnter( collision : Collision )
{
	if(collision.gameObject.name.Contains("Border")){
		if(rigidbody.position.x>0&&Mathf.Abs(rigidbody.position.x)>450){
			rigidbody.velocity.x=-Mathf.Abs(rigidbody.velocity.x);
		}
		if(rigidbody.position.x<0&&Mathf.Abs(rigidbody.position.x)>450){
			rigidbody.velocity.x=Mathf.Abs(rigidbody.velocity.x);
		}
		if(rigidbody.position.y>0&&Mathf.Abs(rigidbody.position.y)>450){
			rigidbody.velocity.y=-Mathf.Abs(rigidbody.velocity.y);
		}
		if(rigidbody.position.y<0&&Mathf.Abs(rigidbody.position.y)>450){
			rigidbody.velocity.y=Mathf.Abs(rigidbody.velocity.y);
		}
    }
	  if(collision.gameObject.name.Contains("bullet")){
    	Destroy (gameObject);

// Removes this script instance from the game object
		Destroy (this);

// Removes the rigidbody from the game object
		Destroy (rigidbody);
    }
    if(collision.gameObject.name=="Player"){
    	Destroy (gameObject);

// Removes this script instance from the game object
		Destroy (this);

// Removes the rigidbody from the game object
		Destroy (rigidbody);
    }
    if(collision.gameObject.tag=="Respawn"&&Time.realtimeSinceStartup>2){
    	attached=true;
    	var food=collision.gameObject;
    	foodOffset= food.rigidbody.position-this.rigidbody.position;
    	rigidbody.velocity=food.rigidbody.velocity;
    	tChange=Time.time+2;
    }
}