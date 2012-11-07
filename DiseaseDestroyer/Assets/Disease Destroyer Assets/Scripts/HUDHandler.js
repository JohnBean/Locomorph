#pragma strict
var minCells: int;
var numVirusStart : float;
var vPercent : float;
var cPercent : float;
var scoreVal: int;
var multiplier :float;
var numCellsStart : float;
function Start () {

}

function Update () {

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
   // print(Time.deltaTime);
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
    GUI.Label(Rect(30,20,100,100),"Score = " + (scoreVal*100)*Mathf.Round(multiplier));//Score
    
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