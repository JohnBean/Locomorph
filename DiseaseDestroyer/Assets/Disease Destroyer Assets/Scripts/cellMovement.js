
// Use this for initialization
function Start () {
}

// Update is called once per frame
function Update () {
	if(rigidbody.velocity.magnitude>=200){
		rigidbody.velocity=rigidbody.velocity*.95;
	}
}

function OnCollisionStay(hit : Collision) {

}
function OnCollisionEnter(collision : Collision) {
	if(collision.gameObject.name.Contains("Border")){
		if(rigidbody.position.x>0&&Mathf.Abs(rigidbody.position.x)>450){
			rigidbody.velocity.x=-Mathf.Abs(rigidbody.velocity.x);
		}
		if(rigidbody.position.x<0&&Mathf.Abs(rigidbody.position.x)>450){
			rigidbody.velocity.x=Mathf.Abs(rigidbody.velocity.x);
		}
		if(rigidbody.position.y>0&&Mathf.Abs(rigidbody.position.y)>450){
			rigidbody.velocity.y=-Mathf.Abs(rigidbody.velocity.y);
		}
		if(rigidbody.position.y<0&&Mathf.Abs(rigidbody.position.y)>450){
			rigidbody.velocity.y=Mathf.Abs(rigidbody.velocity.y);
		}
    }
if(collision.gameObject.name.Contains("Virus")&&Time.realtimeSinceStartup>2){
    	Destroy (gameObject,2.0);

// Removes this script instance from the game object
		Destroy (this,2.0);

// Removes the rigidbody from the game object
		Destroy (rigidbody,2.0);
    }
    if(collision.gameObject.name.Contains("bullet")){
    	Destroy (gameObject);

// Removes this script instance from the game object
		Destroy (this);

// Removes the rigidbody from the game object
		Destroy (rigidbody);
    }
}