var splat : AudioSource;//death sound
var oneShotAudio=false;//singleton for death sound
private var maxX = 480;//bounding box
private var minX = -480;
private var maxY = 480;
private var minY = -480;
private var emitter: ParticleEmitter;
private var startTime;
// Use this for initialization

function Start () {
	emitter = GetComponentInChildren(ParticleEmitter);   
    if (emitter) {
        emitter.emit = false;
    }
    this.startTime=Time.realtimeSinceStartup;
}

// Update is called once per frame
function Update () {
	if(this.startTime==null){
		this.startTime=Time.realtimeSinceStartup;
	}
	//if(rigidbody.velocity.magnitude>=50){
	//	rigidbody.velocity=rigidbody.velocity*.95;
	//}
	if(rigidbody.transform.position.x>maxX){//if the virus leaves the bounding box bring it back in and send it toward the center
    	rigidbody.transform.position.x=maxX;
    	rigidbody.velocity.x=-Mathf.Abs(rigidbody.velocity.x);
    }
    if(rigidbody.transform.position.x<minX){
    	rigidbody.transform.position.x=minX;
    	rigidbody.velocity.x=Mathf.Abs(rigidbody.velocity.x);
    }
    if(rigidbody.transform.position.y>maxY){
    	rigidbody.transform.position.y=maxY;
    	rigidbody.velocity.y=-Mathf.Abs(rigidbody.velocity.y);
    }
    if(rigidbody.transform.position.y<minY){
    	rigidbody.transform.position.y=minY;
    	rigidbody.velocity.y=-Mathf.Abs(rigidbody.velocity.y);
    }
}

function OnCollisionEnter(collision : Collision) {
	if(collision.gameObject.name.Contains("Border")){//bounce off borders
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
    if(this.startTime==null){
		this.startTime=Time.realtimeSinceStartup;
	}
	if(collision.gameObject.name.Contains("Virus")&&(Time.realtimeSinceStartup>(this.startTime+2))){//destroy 2 seconds after a viruses touch
	
		if(emitter!=null){
			emitter.emit=true;
			emitter.transform.parent=null; // detach particle system
			Destroy(emitter.gameObject, 3);
		}
		if(!oneShotAudio){//play death sound and destroy
			splat.Play();
			oneShotAudio=true;
		}
    	Destroy (gameObject,2.0);
		Destroy (this,2.0);
		Destroy (rigidbody,2.0);
    }
    if(collision.gameObject.name.Contains("bullet")){
    	if(!oneShotAudio){
			splat.Play();
			oneShotAudio=true;
		}
    	Destroy (gameObject);
		Destroy (this);
		Destroy (rigidbody);
    }
}