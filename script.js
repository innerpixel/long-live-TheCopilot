const  canvas = document.getElementById('canvas1'); 
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight; 
canvas.style.border = '1px solid white';
const particlesArray = [];
let hue = 0;
let debounce = false;

window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;   
})


const mouse = { 
    x: undefined,
    y: undefined,
};

canvas.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
    debounce = true;
    
    for(let i = 0; i < 3; i++) {   
        particlesArray.push(new Particle());
   }
})  

canvas.addEventListener('click', function(event){
    mouse.x = event.x;
    mouse.y = event.y;  
    for(let i = 0; i < 3; i++) {   
         particlesArray.push(new Particle());
    }
})

class Particle{ 
    constructor(){
        this.x = mouse.x;
        this.y = mouse.y;

        // this.x = Math.random() * canvas.width;
        // this.y = Math.random() * canvas.height;
        
        this.size = Math.random() * 10 + 1;  
        this.speedX = Math.random() * 3 - 1.5 ;
        this.speedY = Math.random() * 3 - 1.5 ;
        
        const colors = ["blue", "red", "green", "yellow", "orange"]; // Array of colors
        this.color = 'hsl(' + hue + ', 100%, 50%)'; 
         // this.color = colors[Math.floor(Math.random() * colors.length)]; // Random color from the array
    }


    draw(){
        ctx.fillStyle = this.color ; // 'hsl(' + hue + ', 100%, 50%)';
        ctx.strokeStyle = 'white';
        ctx.beginPath();
        ctx.arc( this.x, this.y, this.size, 0, Math.PI * 2); 
        ctx.fill();
    }

    update(){
        this.x += this.speedX;
        this.y += this.speedY;
        if(this.size > 0.2) this.size -= 0.1;
        
        // this.draw();
    }
}

function handleParticles(){
    for(let i = 0; i < particlesArray.length; i++){
        particlesArray[i].update();
        particlesArray[i].draw();  
        
        for (let j = i; j < particlesArray.length; j++){
            const dx = particlesArray[i].x - particlesArray[j].x;
            const dy = particlesArray[i].y - particlesArray[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if(distance < 100){
                ctx.beginPath();
                ctx.strokeStyle = particlesArray[i].color;
                ctx.lineWidth = this.size / 15;
                ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                ctx.stroke();
                ctx.closePath();
            }
        }
        if(particlesArray[i].size <= 0.2){
            particlesArray.splice(i, 1);
            i--;
        } 

    }
}

function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // ctx.fillStyle = 'rgba(0, 0, 0, 0.02)';
    // ctx.fillRect(0, 0, canvas.width, canvas.height);
    hue+=0.10;

    handleParticles();
    requestAnimationFrame(animate);
}   
animate();

