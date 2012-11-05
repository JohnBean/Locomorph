public var maxX = 240;
public var minX = -240;
public var maxY = 240;
public var minY = -240;
var speed : float;
var numCellsStart : float;
var minCells: int;
var numVirusStart : float;
var virus : Rigidbody;
var virusClone: Transform;
var cell : Rigidbody;
var cellClone: Transform;
// Use this for initialization
function Start () {
	var cellGenerator=0;
	var cellGroup=0;
	var groupSize= (Random.Range(0,10));
	numVirusStart=20.0;
	numCellsStart=90;
	minCells=0;
	
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
    transform.Translate (Input.GetAxis ("Horizontal") * speed* Time.deltaTime,Input.GetAxis ("Vertical") * speed* Time.deltaTime, 0);
}


function OnGUI() {
	var gos : GameObject[];
	var vPercent : float;
    gos = GameObject.FindGameObjectsWithTag("Finish"); //finds how many viruses are left
	vPercent = gos.Length/numVirusStart;
    GUI.backgroundColor = Color(0, 255-(30*vPercent),2-(2*vPercent));//change color based on number of viruses, fade green to teal
    GUI.HorizontalScrollbar(Rect (375,40,200,20), 200, vPercent*100,0, 100);//change virus bar based on percent remaining
    GUI.Label(Rect(10,5,100,50),"Score = " + (numVirusStart-gos.Length));//Score
    
    gos = GameObject.FindGameObjectsWithTag("Respawn"); //How many Cells remain
    cPercent= (gos.Length-minCells)/(numCellsStart-minCells);
    GUI.backgroundColor = Color(255-(30*cPercent),1-(1*cPercent),1-(1*cPercent));//update color from red to brownred
    GUI.HorizontalScrollbar(Rect (175,40,200,20), 0, cPercent*100,0, 100);//scale health
}
