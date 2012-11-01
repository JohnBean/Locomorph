var speed  = 10.0;
var velocity : Vector3;
var maxX = 245;
var minX = -245;
var maxY = 245;
var minY = -245;

private var tChange: float = 0; // force new direction in the first Update
var randomX: float;
var randomY: float;
// Use this for initialization
function Start () {
	
}

// Update is called once per frame
function Update () {
	// change to random direction at random intervals
    if (Time.time >= tChange){
        randomX = Random.Range(-2,2.0); // with float parameters, a random float
        randomY = Random.Range(-2.0,2.0); //  between -2.0 and 2.0 is returned
        // set a random interval between 0.5 and 1.5
        tChange = Time.time + Random.Range(2.5,3.5);
    }
    if (transform.position.x >= maxX){ 
    	randomX= -Mathf.Abs(randomX);
    	transform.position.x=maxX;
    } 
    if (transform.position.x <= minX){ 
    	randomX= Mathf.Abs(randomX);
    	transform.position.x=minX;
    } 
    if (transform.position.y >= maxY){ 
    	randomY= -Mathf.Abs(randomY);
    	transform.position.y=maxY;
    } 
    if (transform.position.y <= minY){ 
    	randomY= Mathf.Abs(randomY);
    	transform.position.y=minY;
    } 
    transform.Translate(Vector3(randomX,0,0) * speed * Time.deltaTime);
    transform.Translate(Vector3(0,0,randomY) * speed * Time.deltaTime);
    transform.position.z=0;    
}
