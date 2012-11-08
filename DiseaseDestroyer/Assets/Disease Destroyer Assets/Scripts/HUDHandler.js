#pragma strict
public var maxX = 480;
public var minX = -480;
public var maxY = 480;
public var minY = -480;
var xDir: int;
var yDir: int;
var virus : Rigidbody;
var virusClone: Transform;
var cell : Rigidbody;
var cellClone : Transform;
var minCells: int;
var numVirusStart : float;
var vPercent : float;
var cPercent : float;
var scoreVal: int;
var multiplier :float=90;
var numCellsStart : float;
var winScreen : Texture;
var loseScreen : Texture;

function Start () {
	var cellGenerator=0;
	var cellGroup=0;
	
	for(var psudoRand=0; psudoRand<Time.time*2;psudoRand++){
		Random.Range(-2,2);//trying to change what random is used when starting creation
	}
	
	//Long yet still rather bad cell placement 
	var groupSize= (Random.Range(0,6));
	var xLoc= Random.Range(1,maxX);
	var yLoc= Random.Range(1,maxY);
	var top= (Random.Range(-3,3)>0);
	var left= (Random.Range(-3,3)>0);
	
	numVirusStart=10.0;
	numCellsStart=100;
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
	for(var virusGenerator = 0; virusGenerator<numVirusStart;virusGenerator++){//spawn viruses at random locations
		var virusClone : Rigidbody = Instantiate(virus, Vector3(Random.Range(minX+100,maxX-100),Random.Range(minY+100,maxY-100),0), virusClone.rotation);
	}
}

function Update () {

}

function OnGUI() {
	var mapX=590;
	var mapY=405;
	var gos : GameObject[];
	var style : GUIStyle;
	gos = GameObject.FindGameObjectsWithTag("Respawn"); //How many Cells remain
    cPercent= (gos.Length-minCells)/(numCellsStart-minCells);
    gos = GameObject.FindGameObjectsWithTag("Finish"); //finds how many viruses are left
	vPercent = gos.Length/numVirusStart;
    
    if(multiplier>1){
    	if(cPercent>=0&&vPercent>=0){
    		multiplier=multiplier-(Time.fixedDeltaTime/2.5);
    		scoreVal=(numVirusStart-gos.Length);
    	}
    }
    else{
    	if(cPercent>=0&&vPercent>=0){
    		multiplier=1;
    		scoreVal= (numVirusStart-gos.Length);
    	}
    }
    if(cPercent<=0 || vPercent<=0){
    	if(cPercent>0){
    		GUI.DrawTexture(Rect(Screen.width/2-200,Screen.height/2-200,400,400),winScreen,ScaleMode.ScaleToFit,true,1);
    	}
    	else{
    		GUI.DrawTexture(Rect(Screen.width/2-200,Screen.height/2-200,400,400),loseScreen,ScaleMode.ScaleToFit,true,1);
    	}
    	if (GUI.Button (Rect(Screen.width/2-50,Screen.height/2+100,100,50), "Play")) {
    		gos = GameObject.FindGameObjectsWithTag("Respawn");    
    // Iterate through them and find the closest one
   			for (var go : GameObject in gos)  {
				Destroy(go);
			}
			gos = GameObject.FindGameObjectsWithTag("Finish");    
    // Iterate through them and find the closest one
   			for (var go : GameObject in gos)  {
				Destroy(go);
			}
			this.Start();//gameObject.Start();
		}
    }
    else{
    	GUI.Label(Rect(30,20,100,100),"Score = " + (scoreVal*100)*Mathf.Round(multiplier));//Score
    	GUI.backgroundColor = Color(255-(30*cPercent),1-(1*cPercent),1-(1*cPercent));//update color from red to brownred
   		GUI.HorizontalScrollbar(Rect (Screen.width/2-200,20,200,20), 0, cPercent*100,0, 100);//scale health
   		GUI.backgroundColor = Color(0, 255-(30*vPercent),2-(2*vPercent),50);//change color based on number of viruses, fade green to teal
    	GUI.HorizontalScrollbar(Rect (Screen.width/2,20,200,20), 2000, vPercent*100,0, 100);//scale health//change virus bar based on percent remaining
    }
}