public var maxX = 240;
public var minX = -240;
public var maxY = 240;
public var minY = -240;
var speed : float;
var numCellsStart : int;
var minCells: int;
var numVirusStart : int;
var virus : Rigidbody;
// Use this for initialization
function Start () {
	numVirusStart=20;
	numCellsStart=20;
	minCells=5;
	for(virusGenerator = 0; virusGenerator<numVirusStart;virusGenerator++){
		var virusClone : Rigidbody = Instantiate(virus, Vector3(Random.Range(minX+20,maxX-20),Random.Range(minY+20,maxY-20),0), virus.rotation);
	}
	//virusClone.GetComponent(virusMovement).randomDir();
	speed = 100.0;
}

// Update is called once per frame
function Update () {
    transform.Translate (Input.GetAxis ("Horizontal") * speed* Time.deltaTime,Input.GetAxis ("Vertical") * speed* Time.deltaTime, 0);
}


function OnGUI() {
	GUI.backgroundColor = Color.red;
	//curCells= ge
	cellPercent=(numCellsStart-minCells);
    GUI.HorizontalScrollbar(Rect (175,40,200,20), 0, Mathf.Abs(Input.GetAxis ("Horizontal"))*100,0, 100);
    GUI.backgroundColor = Color.green;
    GUI.HorizontalScrollbar(Rect (375,40,200,20), 200, Mathf.Abs(Input.GetAxis ("Horizontal"))*100,0, 100);
    
}
