#pragma strict

function Start () {

}

function Update () {
	transform.position.x = GameObject.Find("Character").transform.position.x;
	transform.position.y = GameObject.Find("Character").transform.position.y;
}