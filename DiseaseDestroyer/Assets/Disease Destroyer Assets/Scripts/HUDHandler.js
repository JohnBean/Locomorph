#pragma strict
var minCells: int;
var numVirusStart : float;
var vPercent : float;
var cPercent : float;
var scoreVal: int;
var multiplier :float;
var numCellsStart : float;
var winScreen : Texture;
var loseScreen : Texture;
function Start () {

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
			print("restart");
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