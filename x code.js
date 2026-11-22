// async function birdauto(){
//     while (true){
//         await sleep()
//         x+=5
//         y+=10
//         bird.style.transition="left 16.6666667s linear, top 16.6666667s linear"
//         if (x>500){
//             break
//         }
//     }
// }
function sleep(){
    return new Promise((resolve)=>setTimeout(()=>resolve(),16.6666667))
}