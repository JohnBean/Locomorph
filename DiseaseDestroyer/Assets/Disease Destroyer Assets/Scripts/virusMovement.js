var speed  = 10.0;
var velocity : Vector3;
var maxX = 245;
var minX = -245;
var maxY = 245;
var minY = -245;

private var tChange: float = 0; // force new direction in the first Update
var xDir: float;
var yDir: float;
// Use this for initialization
function Start () {
	
}

// Update is called once per frame
function Update () {
	// change to random direction at random intervals
    if (Time.time >= tChange){
       //randomDirection();   
       nearestCell();    
    }
    if (transform.position.x >= maxX){ 
    	xDir= -Mathf.Abs(xDir);
    	transform.position.x=maxX;
    } 
    if (transform.position.x <= minX){ 
    	xDir= Mathf.Abs(xDir);
    	transform.position.x=minX;
    } 
    if (transform.position.y >= maxY){ 
    	yDir = -Mathf.Abs(yDir);
    	transform.position.y=maxY;
    } 
    if (transform.position.y <= minY){ 
    	yDir= Mathf.Abs(yDir);
    	transform.position.y=minY;
    } 
   // transform.Translate(Vector3(xDir,0,yDir) * speed * Time.deltaTime);
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
    	print(go.transform.position);
        var diff = (go.transform.position - position);
        var curDistance = diff.sqrMagnitude; 
        if (curDistance < distance) { 
            closest = go; 
            distance = curDistance; 
        } 
    }
   // print("Closest: " + closest.name);
    //angle = Mathf.Atan2(closest.transform.position.x, closest.transform.position.y) * Mathf.Rad2Deg;
  //  transform.rotation = Quaternion.Euler(Vector3(angle, 0,0 ));
    //rigidbody..LookAt(closest.position);
   // rigidbody.AddForce(transform.forward *speed * Time.deltaTime);
    tChange = Time.time + Random.Range(1,2);
}