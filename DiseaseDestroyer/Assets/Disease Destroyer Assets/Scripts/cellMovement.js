
// Use this for initialization
function Start () {
}

// Update is called once per frame
function Update () {

}

function OnCollisionStay(hit : Collision) {

}
function OnCollisionEnter(collision : Collision) {
print(collision.gameObject.name);
if(collision.gameObject.name.Contains("Virus")){
    	Destroy (gameObject,2.0);

// Removes this script instance from the game object
		Destroy (this,2.0);

// Removes the rigidbody from the game object
		Destroy (rigidbody,2.0);
    }
}