const  canvas = document.getElementById('canvas1'); 
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight; 
canvas.style.border = '1px solid white';
const particlesArray = [];

window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;   
})


const mouse = { 
    x: 0,
    y: 0,
};

canvas.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
})  
canvas.addEventListener('click', function(event){
    mouse.x = event.x;
    mouse.y = event.y;  
})

class Particle{ 
    constructor(){
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        
        this.size = Math.random() * 50 + 1;  
        this.speedX = Math.random() * 3 - 1.5 ;
        this.speedY = Math.random() * 3 - 1.5 ;
        
        const colors = ["blue", "red", "green", "yellow", "orange"]; // Array of colors
        this.color = colors[Math.floor(Math.random() * colors.length)]; // Random color from the array
    }


    draw(){
        ctx.fillStyle = this.color;
        ctx.strokeStyle = 'white';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); 
        ctx.fill();
    }

    update(){
        this.x += this.speedX;
        this.y += this.speedY;
        this.draw();
    }
}


function init(n){
    for(let i = 0; i < n; i++){
        particlesArray.push(new Particle());
    }
}

init(100); 

console.log(particlesArray);

function handleParticles(){
    for(let i = 0; i < particlesArray.length; i++){
        particlesArray[i].update();
        particlesArray[i].draw();   

    }
}

function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    handleParticles();
    requestAnimationFrame(animate);
}   
animate();

