var speed : float;
// Use this for initialization
function Start () {
	speed = 100.0;
}

// Update is called once per frame
function Update () {
    transform.Translate (Input.GetAxis ("Horizontal") * speed* Time.deltaTime,Input.GetAxis ("Vertical") * speed* Time.deltaTime, 0);
}
