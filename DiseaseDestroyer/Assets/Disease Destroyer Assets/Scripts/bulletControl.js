public var radius = 60.0;
var power = 2.0;
// Use this for initialization
function Start () {
}

// Update is called once per frame
function Update () {

}

function OnCollisionStay(hit : Collision) {

}
function OnCollisionEnter(collision : Collision) {
	var explosionPos : Vector3 = gameObject.rigidbody.position;
    		var colliders = GameObject.FindGameObjectsWithTag("Finish");
    		for (var hit : GameObject in colliders) {
            	var diff = (transform.position - hit.rigidbody.position);      	
            	var curDistance = Mathf.Sqrt(( Mathf.Abs(diff.x)*Mathf.Abs(diff.x))+(Mathf.Abs(diff.y)+Mathf.Abs(diff.y))); 
        		if (curDistance<=radius){
        			hit.GetComponent(virusMovement).kill();
    			}
    		}
    		colliders = GameObject.FindGameObjectsWithTag("Respawn");
    		for (var hit : GameObject in colliders) 
    		{
    		
            	diff = (rigidbody.position - hit.rigidbody.position);    	
            	curDistance = Mathf.Sqrt(( Mathf.Abs(diff.x)*Mathf.Abs(diff.x))+(Mathf.Abs(diff.y)+Mathf.Abs(diff.y))); 
        		if (curDistance<=radius){
        			print("cell:"+curDistance + " radius " + radius);
           			hit.rigidbody.velocity=hit.rigidbody.velocity+(diff)*-9;//.x=100;//AddExplosionForce(power, explosionPos, radius, 2.0);
    			}
    		}
 	if(!collision.gameObject.tag.Contains("Player")){
		Destroy(collision.gameObject);
    	Destroy (gameObject);

// Removes this script instance from the game object
		//Destroy (this);

// Removes the rigidbody from the game object
		//Destroy (rigidbody);
    }
}