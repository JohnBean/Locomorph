#pragma strict
public var maxX = 480;
public var minX = -480;
public var maxY = 480;
public var minY = -480;
var xDir: int;
var yDir: int;
var virus : Rigidbody;
var dummyvirus: Rigidbody;
var virusClone: Transform;
var dummyClone:Transform;
var cell : Rigidbody;
var cellClone : Transform;
public var minCells: int;
public var numVirusStart : float;
var vPercent : float;
var cPercent : float;
var scoreVal: int;
var multiplier :float=90;
public var numCellsStart : float;
var winScreen : Texture;
var loseScreen : Texture;
var pauseScreen : Texture;
var newFont : Font;

function Start () {
	for(var psudoRand=0; psudoRand<Time.time*500;psudoRand++){
		Random.seed = psudoRand;
	}
	
	numVirusStart=30.0;
	
	spawnCells();
	for(var virusGenerator = 0; virusGenerator<numVirusStart;virusGenerator++){//spawn viruses at random locations
		var virusClone : Rigidbody = Instantiate(virus, Vector3(Random.Range(minX+100,maxX-100),Random.Range(minY+100,maxY-100),0), virusClone.rotation);
	}
	/*for(var dummyGenerator=0; dummyGenerator<10; dummyGenerator++){
		var dummyClone: Rigidbody = Instantiate(dummyvirus,Vector3(Random.Range(-1000,-500),Random.Range(500,1000),0),dummyClone.rotation);

	}*/
}

function spawnCells(){
	//Spawn cells in a grid, then give them all random velocities
	for(var i = 0; i < Mathf.Sqrt(numCellsStart); i++){
		for(var j = 0; j < Mathf.Sqrt(numCellsStart); j++){
			var spawnX = (i / Mathf.Sqrt(numCellsStart) * 1000) - 500;
			var spawnY = (j / Mathf.Sqrt(numCellsStart) * 1000) - 500;
			var cellClone : Rigidbody = Instantiate(cell, Vector3(spawnX, spawnY, 0), cellClone.rotation);
			cellClone.rigidbody.velocity = Vector3(Random.Range(-1.0, 1.0) * 1000, Random.Range(-1, 1) * 1000, 0);
		}
	}
}

function Update () {
	 if (Input.GetKeyDown("p")){	 	
	 	if(Time.timeScale!=0){
	 		Time.timeScale=0;
	 	}
	 	else{
	 		Time.timeScale=1.0;
	 	}
	 }
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
    
    GUI.skin.font = newFont;
    
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
			GameObject.FindGameObjectWithTag("Player").GetComponent(playerMovement).restart();
			this.Start();//gameObject.Start();
		}
    }
    else{
    	if(Time.timeScale==0){
	 		GUI.DrawTexture(Rect(Screen.width/2-200,Screen.height/2-200,400,400),pauseScreen,ScaleMode.ScaleToFit,true,1);
	 	}
    	gos = GameObject.FindGameObjectsWithTag("Respawn");   
    	GUI.Label(Rect(Screen.width/2-300,15,100,100),"SCORE: " + (scoreVal*100)*Mathf.Round(multiplier));//Score
    	
    	GUI.backgroundColor = Color(255-(30*cPercent),1-(1*cPercent),1-(1*cPercent));//update color from red to brownred
   		GUI.HorizontalScrollbar(Rect (Screen.width/2-200,20,200,20), 0, cPercent*100,0, 100);//scale health
   		GUI.Label(Rect(((Screen.width/4))+50,2,200,200),"CELLS REMAINING: " + gos.length);//cells
   		GUI.backgroundColor = Color(0, 255-(30*vPercent),2-(2*vPercent),50);//change color based on number of viruses, fade green to teal
    	GUI.HorizontalScrollbar(Rect (Screen.width/2,20,200,20), 2000, vPercent*100,0, 100);//scale health//change virus bar based on percent remaining
    	gos = GameObject.FindGameObjectsWithTag("Finish"); //finds how many viruses are left
    	GUI.Label(Rect(((Screen.width/4)*2)+30,2,200,200),"VIRUSES REMAINING: " + gos.length);//virus
    	//print(GameObject.FindGameObjectWithTag("Player").GetComponent(playerMovement).slow);
    	if(GameObject.FindGameObjectWithTag("Player").GetComponent(playerMovement).slow){
    		GUI.Label(Rect(((Screen.width/2))+0,600,200,200),"SLOWED");//virus
    	}
    }
}