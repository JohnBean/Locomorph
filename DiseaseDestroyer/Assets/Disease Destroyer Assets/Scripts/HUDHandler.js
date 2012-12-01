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
var scoreVal: float;
var multiplier :float=90;
public var numCellsStart : float;
var winScreen : Texture;
var loseScreen : Texture;
var pauseScreen : Texture;
var splashScreen: Texture;
var intro1 : Texture;
var intro2 : Texture;
var newFont : Font;
enum gameState {splash, game, pause, win, lose, intro1, intro2};
var state : gameState;
var startTime : float;
var startPop :float;


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
			for(var psudoRand=0; psudoRand<Time.time*500;psudoRand++){
				Random.seed = psudoRand;
			}
			
			//cellClone.rigidbody.rotation= Quaternion.LookRotation(Vector3(0,0,0));
			cellClone.rigidbody.velocity = Vector3(Random.Range(-1.0, 1.0) * 1000, Random.Range(-1, 1) * 1000, 0);
		}
	}
}

function Update () {
	 //Gets stuff for win/lose conditions
	 var gos : GameObject[];
	 gos = GameObject.FindGameObjectsWithTag("Respawn"); //How many Cells remain
     cPercent= (gos.Length-minCells)/(numCellsStart-minCells);
     gos = GameObject.FindGameObjectsWithTag("Finish"); //finds how many viruses are left
	 vPercent = gos.Length/numVirusStart;
	 gos = GameObject.FindGameObjectsWithTag("Respawn");  
	 startPop=6973738433;
     scoreVal=startPop-((numCellsStart-gos.length)*10000000)-(startTime*20000000);
	 //Conditions for changing game states
	 if (Input.GetKeyDown("p")){	 	//Pausing and unpausing
	 	print(state);
	 	if(state == gameState.game){
	 		state = gameState.pause;
	 	}
	 	else if(state == gameState.pause){
	 		state = gameState.game;
	 	}
	 }
	 
	 if(vPercent <= 0){ //Win
	 	state = gameState.win;
	 }
	 if(cPercent <= 0){//Lose
	 	state = gameState.lose;
	 }
	 
	 //Handling game states
	 if(state == gameState.game){
	 	Time.timeScale = 1.0;
	 	
	 }
	 else if(state == gameState.pause){
	 	Time.timeScale = 0.0;
	 }
	 else if(state == gameState.splash){
	 	Time.timeScale = 0.0;
	 	if(Input.GetMouseButtonDown(1)){
	 		
	 		state=gameState.intro1;
	 	}
	 }
	 else if(state == gameState.intro1){
	 	Time.timeScale = 0.0;
	 	if(Input.GetMouseButtonDown(1)){
	 		state=gameState.intro2;
	 	} else if (Input.GetMouseButtonDown(2)){
	 		state=gameState.splash;
	 	}
	 }
	 else if(state == gameState.intro2){
	 	Time.timeScale = 0.0;
	 	if(Input.GetMouseButtonDown(1)){
	 		state=gameState.game;
	 		startTime=Time.time;
	 	} else if (Input.GetMouseButtonDown(2)){
			state=gameState.intro1;
	 	}
	 }
	 
	 else if(state == gameState.win){

	 }
	 else if(state == gameState.lose){

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
    
    //--------------------------WIN AND LOSE SCREENS-----------------------
    if(state == gameState.win || state == gameState.lose){
		if(state == gameState.win){
    	GUI.DrawTexture(Rect(0,0,Screen.width, Screen.height),winScreen,ScaleMode.ScaleToFit,true,1.777f);
		}
		if(state == gameState.lose){
    	GUI.DrawTexture(Rect(0,0,Screen.width, Screen.height),loseScreen,ScaleMode.ScaleToFit,true,1.777f);
		}
	    if (Input.GetKeyDown ("space")) {
	    	startTime=Time.time;
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
			state = gameState.game;
			this.Start();//gameObject.Start();
		}    
	}
    
    //-------------------PAUSE SCREEN---------------------
    if(state == gameState.pause){
    	GUI.DrawTexture(Rect(0,0,Screen.width, Screen.height),pauseScreen,ScaleMode.ScaleToFit,true,1.777f);
    }
    //-------------------SPLASH SCREEN-------------------------
    if(state==gameState.splash){
       GUI.DrawTexture(Rect(0,0,Screen.width, Screen.height),splashScreen,ScaleMode.ScaleToFit,true,1.777f);

    }
    if(state==gameState.intro1){
       GUI.DrawTexture(Rect(0,0,Screen.width, Screen.height),intro1,ScaleMode.ScaleToFit,true,1.777f);

    }
    if(state==gameState.intro2){
       GUI.DrawTexture(Rect(0,0,Screen.width, Screen.height),intro2,ScaleMode.ScaleToFit,true,1.777f);

    }
    
    
    
    
    /*if(multiplier>1){
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
    }*/
    
    
    if(state==gameState.game){
    
    
	gos = GameObject.FindGameObjectsWithTag("Respawn");   
	var longScore:long=scoreVal;
	GUI.Label(Rect(Screen.width/2-500,15,300,200),"PROJECTED EARTH POPULATION: ");
	GUI.Label(Rect(Screen.width/2-500,30,300,200),longScore+" humans surviving"); //Score

	
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
	}}
}