var pushRadius : float;
var deathRadius : float;
var power : float;
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
        		if (curDistance<=deathRadius){
        			hit.GetComponent(virusMovement).kill();
    			}
    		}
    		colliders = GameObject.FindGameObjectsWithTag("Respawn");
    		for (var hit : GameObject in colliders) 
    		{
    		
            	diff = (rigidbody.position - hit.rigidbody.position);    	
            	curDistance = Mathf.Sqrt(( Mathf.Abs(diff.x)*Mathf.Abs(diff.x))+(Mathf.Abs(diff.y)*Mathf.Abs(diff.y))); 
        		if (curDistance<=pushRadius){
        			print("cell:"+curDistance + " radius " + pushRadius);
           			hit.rigidbody.velocity=hit.rigidbody.velocity+(diff)*-9;//.x=100;//AddExplosionForce(power, explosionPos, radius, 2.0);
    			}
    		}
    //Destroys object in question if not the player or a wall
 	if(!collision.gameObject.tag.Contains("Player") && collision.gameObject.tag != "Wall"){
		Destroy(collision.gameObject);

    }
    //Destroys object
    Destroy (gameObject);
}