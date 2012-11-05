
// Use this for initialization
function Start () {
}

// Update is called once per frame
function Update () {

}

function OnCollisionStay(hit : Collision) {

}
function OnCollisionEnter(collision : Collision) {


    	Destroy (gameObject);

// Removes this script instance from the game object
		Destroy (this);

// Removes the rigidbody from the game object
		Destroy (rigidbody);

}