var pushRadius : float;
var deathRadius : float;
//var deathEmitter: ParticleEmitter;

public var emitter: ParticleEmitter;
public var pushEmitter: ParticleEmitter;
var power : float;
// Use this for initialization
function Start () {
emitter = GetComponentInChildren(ParticleEmitter);  
  
    if (emitter) {
        emitter.emit = false;
    }
    pushEmitter = GetComponentInChildren(ParticleEmitter);  
    if (pushEmitter) {
        pushEmitter.emit = false;
    }
	//var deathEmitter = GetComponentInChildren(ParticleEmitter); 
	//if (deathEmitter) {
    //    deathEmitter.emit = false;
    //}
  //  pushEmitter = GetComponentInChildren(ParticleEmitter); 
  //  if (pushEmitter) {
  //      pushEmitter.emit = false;
  //  }
}

// Update is called once per frame
function Update () {

}

function OnCollisionStay(hit : Collision) {

}
function OnCollisionEnter(collision : Collision) {
	kill();
			

}
function kill(){
	var explosionPos : Vector3 = gameObject.rigidbody.position;
    		var colliders = GameObject.FindGameObjectsWithTag("Finish");
    		for (var hit : GameObject in colliders) {
            	var diff = (explosionPos - hit.rigidbody.position);      	
            	var curDistance = Mathf.Sqrt(( Mathf.Abs(diff.x)*Mathf.Abs(diff.x))+(Mathf.Abs(diff.y)*Mathf.Abs(diff.y))); 
        		if (curDistance<=deathRadius+10){
        		//print(diff.y);
        		//print("virus:"+curDistance + " radius " + pushRadius);
        			hit.GetComponent(virusMovement).kill();
    			}
    		}
    		colliders = GameObject.FindGameObjectsWithTag("Respawn");
    		for (var hit : GameObject in colliders) 
    		{
    		
            	diff = (explosionPos - hit.rigidbody.position);    	
            	curDistance = Mathf.Sqrt(( Mathf.Abs(diff.x)*Mathf.Abs(diff.x))+(Mathf.Abs(diff.y)*Mathf.Abs(diff.y))); 
            	//print("cell:"+curDistance + " radius " + deathRadius);
            	if (curDistance<=deathRadius+20){

        			hit.GetComponent(cellMovement).kill();
    			}
        		else if (curDistance<=pushRadius+20){
        			//print("cell:"+curDistance + " radius " + pushRadius);
           			hit.rigidbody.velocity=hit.rigidbody.velocity+(diff)*-11;//.x=100;//AddExplosionForce(power, explosionPos, radius, 2.0);
    			}
    		}
    		diff = (explosionPos - GameObject.FindGameObjectWithTag("Player").rigidbody.position);    	
            curDistance = Mathf.Sqrt(( Mathf.Abs(diff.x)*Mathf.Abs(diff.x))+(Mathf.Abs(diff.y)*Mathf.Abs(diff.y))); 
    		if(curDistance<=pushRadius+10){
    			//print("player"+GameObject.FindGameObjectWithTag("Player").rigidbody.velocity);
    			GameObject.FindGameObjectWithTag("Player").GetComponent(playerMovement).addVel(diff*-6);//.rigidbody.position = diff*-2000;
    		}
    //Destroys object in question if not the player or a wall
    emitter = GetComponentInChildren(ParticleEmitter);  
 	emitter.emit=true;
	emitter.transform.parent=null; // detach particle system
	Destroy(emitter.gameObject, 2);
	pushEmitter = GetComponentInChildren(ParticleEmitter);  
    pushEmitter.emit=true;
    pushEmitter.transform.parent=null; // detach particle system
    Destroy(pushEmitter.gameObject, 2);
		

    
    //Destroys object
    Destroy (gameObject);
}