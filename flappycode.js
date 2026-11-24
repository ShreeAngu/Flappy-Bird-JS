import {LinkedList}  from "./linkedpipe.js"
let bird=document.getElementById("bird")
let playarea=document.getElementById("playarea")
let xbird=100
let ybird=0
let xbirdmovementspeed=0
let ybirdmovementspeed=3
let windowwidth =window.innerWidth
let windowheight=window.innerHeight
let pipespeed=2
let ykeyspeed=4
let padding=5
let keymovement=30
let addscore=1
let currentscore=0
let paused=false
let minheight=10
let maxheight=50
let maxwidth=5
let velocity=0
let birdheight=bird.clientHeight
let birdwidth=bird.clientWidth
let maxheight2=0
let minwidth=5
let threshold=500
let gap=100
let height1=Math.random()*(maxheight-minheight)+minheight
let width1=Math.random()*(maxwidth-minwidth)+minwidth
let p1=new LinkedList(1,`${height1}%`,`${width1}%`,pipespeed,true)
p1.move()
let currpipe=p1
document.addEventListener('keydown',(event)=>{if (event.key=='ArrowUp'){velocity=-keymovement}})
document.addEventListener('visibilitychange',()=>pause())


let height2=Math.random()*(maxheight-minheight)+minheight
let p2=new LinkedList(1,`${height2}%`,`${width1}%`,pipespeed,false)
p2.move()
let currpipe2=p2
function birdauto(){
    if (!paused){
    xbird+=xbirdmovementspeed
    ybird+=ybirdmovementspeed+  velocity
    currentscore+=addscore
    bird.style.transform=`translate(${xbird}px,${ybird}px)`
    hit(currpipe)
    hit(currpipe2)
    if (currentscore>threshold){
        pipespeed+=1
        threshold*=2
        var p3=currpipe
        var p4=currpipe2
        while (p3){
            p3.pipespeed+=1
            p4.pipespeed+=1
            p3=p3.tail
            p4=p4.tail
        }
    }
    if (ybird<0 || xbird>=windowwidth || ybird>=windowheight ){
        sessionStorage.setItem("currentscore",currentscore)
        window.location.replace("out-flappy.html")
        return 
    }
    if (velocity<0){
        velocity+=ykeyspeed
        if (velocity>0){
            velocity=0
        }
    }
    if (currpipe.Removed==true){
        currpipe=currpipe.tail
        
    }
    if (currpipe2.Removed==true){
        currpipe2=currpipe2.tail
        
    }}
    requestAnimationFrame(birdauto)
}
function hit(currpipe){
    ishit(xbird,ybird-padding,currpipe)
    ishit(xbird+birdwidth-padding,ybird-padding,currpipe)
    ishit(xbird,ybird+birdheight-padding,currpipe)
    ishit(xbird+birdwidth-padding,ybird+birdheight-padding,currpipe)

}
function ishit(tempx,tempy,currpipe){
    var currentwidth=currpipe.pipe.clientWidth
    var currentxpipe=currpipe.xpipe+windowwidth-currentwidth
    var currentheight=currpipe.pipe.clientHeight
    var currypipe=windowheight-currentheight
    if (currpipe.bottom){
        var currypipe=windowheight-currentheight
        if (((tempx>=currentxpipe && tempx<=currentxpipe+currentwidth) && tempy>=currypipe) ){
        sessionStorage.setItem("currentscore",currentscore)
        window.location.replace("index.html")
        return
    }
    }else{
        var currypipe=currentheight
        if (((tempx>=currentxpipe && tempx<=currentxpipe+currentwidth) && tempy<=currypipe)){
        sessionStorage.setItem("currentscore",currentscore)
        window.location.replace("index.html")
        return
    }
    }   
}
function sleep(time){
    return new Promise((resolve)=>{setTimeout(()=>resolve(1),time)})
    
}
async function createpipes(){
    while (true){
    await sleep((p2.pipe.clientWidth+gap)*1000/(60*pipespeed))
    while (paused){await sleep(1000)}
    height1=Math.random()*(maxheight-minheight)+minheight
    width1=Math.random()*(maxwidth-minwidth)+minwidth
    p1.tail=new LinkedList(1,`${height1}%`,`${width1}%`,pipespeed,true)
    p1=p1.tail
    p1.move()
    maxheight2=windowheight-(p1.pipe.clientHeight+birdheight+keymovement*1.8)
    height2=Math.random()*(maxheight2*100/windowheight-minheight)+minheight
    p2.tail=new LinkedList(1,`${height2}%`,`${width1}%`,pipespeed,false)
    p2=p2.tail
    p2.move()
    }}
createpipes()
birdauto()

function pause(){
    if (document.hidden){
        paused=true
        var p3=currpipe
        var p4=currpipe2
        while (p3){
            p3.paused=true
            p4.paused=true
            p3=p3.tail
            p4=p4.tail
        }
        }else{
            if (paused){
                paused=false
                var p3=currpipe
                var p4=currpipe2
                while (p3){
                    p3.paused=false
                    p4.paused=false
                    p3=p3.tail
                    p4=p4.tail   
                }             
            }
        }
    
}
