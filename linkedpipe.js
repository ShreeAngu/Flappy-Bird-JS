export class LinkedList{
    constructor(id,height,width,speed,bottom){
        this.pipe=document.createElement("img")
        this.pipe.id=id
        this.tail=NaN   
        this.pipe.className="pipe"
        this.pipe.style.height=height
        this.pipe.style.width=width
        this.windowwidth=window.innerWidth
        if (bottom){
            this.pipe.style.bottom="0px"
        }else{
            this.pipe.style.top="0px"
        }
        this.bottom=bottom
        this.xpipe=0
        this.pipespeed=speed
        this.Removed=false
        this.paused=false
        playarea.append(this.pipe)
    }
    remove(){
        this.pipe.remove()
        this.Removed=true
    }
    move(){
        if (!this.paused){

        this.xpipe-=this.pipespeed
        if (this.bottom){
            this.pipe.style.transform=`translate3d(${this.xpipe}px,0,0)`
        }else{
            this.pipe.style.transform=`translate3d(${this.xpipe}px,0,0) rotate(180deg)`
        }
        if (this.xpipe<=-this.windowwidth){
            return this.remove()
        }
    }
        requestAnimationFrame(()=>this.move())
        //the this is only hold when it is called with the obj attachedd to the class so in recursive we can't directly give move() 
        //so we give like a arraw function so that the the propeties are inherited
    }

}
