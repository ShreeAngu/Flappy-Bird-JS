let currentscore=sessionStorage.getItem("currentscore")
let retry=document.getElementById("retry")
retry.addEventListener('click',()=>window.location.replace("./play-flappy.html"))//always write response in func  
let score=document.getElementById("score")
score.innerText=currentscore
let highScore=getcookie("flappybird")
if (Number(currentscore)>Number(highScore)){
    highScore=currentscore
    let playerstats={highScore:Number(currentscore)}
    let encoded=encodeURIComponent(JSON.stringify(playerstats))
    //encode bcz the cookie cant properly store the semicolon kind of stuffs
    document.cookie=`flappybird=${encoded};path=/;max-age=${7*86400};SameSite=Lax`
    
}
document.getElementById("best").innerText=highScore
function getcookie(name){
    var cookies=document.cookie ? document.cookie.split(";") :[]
    for (const cookie of cookies){
        if (cookie.startsWith(name)){
            return JSON.parse(decodeURIComponent(cookie.slice(name.length+1))).highScore //plain json obj dont have .get()
            //+1 bcz the = shouls also be removed 
            // the cookie is like a doc with key=value stored in each line as str and we search for key and return value 
        }
    }
    return 0
}

//Actually, path is part of browser access rules—not just creation and deletion.
//  When you set path=/flappybird, the browser only exposes that cookie to pages whose URL path 
// starts with /flappybird (and only sends it on requests to /flappybird or subpaths).
