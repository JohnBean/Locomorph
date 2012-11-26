var splat : AudioSource;//death sound
var oneShotAudio=false;//singleton for death sound
private var maxX = 480;//bounding box
private var minX = -480;
private var maxY = 480;
private var minY = -480;
private var health=3;
private var emitter: ParticleEmitter;
public var tex1: Texture2D;
public var tex2: Texture2D;
public var tex3: Texture2D;
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
    	rigidbody.velocity.y=Mathf.Abs(rigidbody.velocity.y);
    }
}

function OnCollisionEnter(collision : Collision) {
	//var tex = Resources.Load("cell3");
	
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
	}/*
	if(collision.gameObject.name.Contains("Character")){
		renderer.material.mainTexture = tex3;
	}*/
	if(collision.gameObject.name.Contains("Virus")&&(Time.realtimeSinceStartup>(this.startTime+2))){//destroy 2 seconds after a viruses touch
		health=health-1;
		if(health==2){renderer.material.mainTexture = tex2;}
		if(health==1){renderer.material.mainTexture= tex3;}
		if(health==0){
			if(emitter!=null){
				emitter.emit=true;
				emitter.transform.parent=null; // detach particle system
				Destroy(emitter.gameObject, 3);
			}
			if(!oneShotAudio){//play death sound and destroy
				splat.Play();
				oneShotAudio=true;
			}
    		Destroy (gameObject,1.0);
			Destroy (this,1.0);
			Destroy (rigidbody,1.0);
		}
    }
    if(collision.gameObject.name.Contains("bullet")){
    	health=health-1;
		if(health==2){renderer.material.mainTexture = tex2;}
		if(health==1){renderer.material.mainTexture= tex3;}
		if(health==0){
    		if(!oneShotAudio){
				splat.Play();
				oneShotAudio=true;
			}
    		Destroy (gameObject);
			Destroy (this);
			Destroy (rigidbody);
		}
    }
}

function kill(){
	health=health-1;
		if(health==2){renderer.material.mainTexture = tex2;}
		if(health==1){renderer.material.mainTexture= tex3;}
		if(health==0){
			if(emitter!=null){
				emitter.emit=true;
				emitter.transform.parent=null; // detach particle system
				Destroy(emitter.gameObject, 3);
			}
			if(!oneShotAudio){//play death sound and destroy
				splat.Play();
				oneShotAudio=true;
			}
    		Destroy (gameObject);
			Destroy (this);
			Destroy (rigidbody);
		}
}