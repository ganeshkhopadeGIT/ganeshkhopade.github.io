//Canvas Setup
const canvas = document.getElementById('canvas1');
canvas.width = 1500;
canvas.height = 800;

const ctx = canvas.getContext('2d');
//bring the canvose coordinate to cnter
var transX = canvas.width/2;
var transY = canvas.height/2;
ctx.translate(transX, transY);
// let score = 0;
// let gameFrame = 0;
ctx.font = '25px Georgia';

//Mouse Interactivity
// let canvasPosition = canvas.getBoundingClientRect();
//Sun
class Sun {
    constructor() {
        this.x = canvas.width / 2;
        this.y = canvas.height / 10;
        this.radius = 50;
        
        /// external input values
        this.u = 50;
        //this.theta= Math.PI / 4 ;
        this.theta = Math.PI / 2;
        this.g = -9.8;
        this.X1 = 100;
        this.Y1 = 100;

        this.t = 0;
        this.gt = Math.PI / 2;
        this.gx = 0.0;
        this.gy = 0.0;
        this.cu = 0;

        this.x = this.X1;
        this.y = this.Y1;

        this.tx = this.X1;
        this.ty = this.Y1;

    }


    draw() {

        //drawing the cords
        ctx.strokeStyle = 'blue';
        ctx.lineWidth = .1;
        ctx.beginPath();
        ctx.moveTo(0, -canvas.height / 2);
        ctx.lineTo(0, canvas.height / 2);
        ctx.stroke();
        ctx.moveTo(-canvas.width / 2, 0);
        ctx.lineTo(canvas.width / 2, 0);
        ctx.stroke();


        //drawing the sun
        ctx.beginPath();
        ctx.fillStyle = "red";
        ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
        ctx.fill();

        //drawing the earth
        ctx.beginPath();
        ctx.fillStyle = "blue";
        ctx.arc(this.x, this.y, this.radius / 5, 0, Math.PI * 2);
        ctx.fill();



        //phyiscs ... projectile motion    
        //from old code
        if (this.x == 0) {
            if (this.y < 0) {
                this.gt = Math / 2;
            }
            else {
                this.gt = 1.5 * Math.PI;
            }


        }
        else {
            //this.gt = Math.atan(this.y / this.x);
            this.gt = Math.atan((Math.round(this.y * 100) / 100) / (Math.round(this.x * 100) / 100));
            this.gt = Math.round(this.gt * 100) / 100;

            if (this.y == 0) {
                if (this.x < 0) {
                    this.gt = 0;
                }
                else {
                    this.gt = -Math.PI / 2;
                }
            }

        }

        if (this.x < 0) { this.gt = this.gt + Math.PI; }


        this.gx = this.g * ((Math.cos(this.gt)));
        this.gy = this.g * ((Math.sin(this.gt)));

        this.x = this.X1 + (this.u * this.t * Math.cos(this.theta)) + (this.t * this.t * this.gx / 2);
        this.y = this.Y1 + (this.u * this.t * Math.sin(this.theta)) + (this.t * this.t * this.gy) / 2;

        //if crashed on earth
        if ((Math.abs(this.x) < this.radius - 5) && (Math.abs(this.y) < this.radius - 5))
            return;

        else
            this.t = this.t + 0.1;



        if (Math.abs(this.t) > .5) {
            this.X1 = this.x;
            this.Y1 = this.y;

            this.cu = Math.atan((this.y - this.ty) / (this.x - this.tx));
            if (this.x < this.tx) {
                this.cu = this.cu + Math.PI;
            }

            this.theta = this.cu;
            this.t = 0; //eureka : Reset the projectile calculation loop everytime
        }

        this.tx = this.x;
        this.ty = this.y;




        ctx.beginPath();
        ctx.fillStyle = "red";
        ctx.fillText('x: ' + Math.round(this.x * 100) / 100 , -canvas.width / 2 + 10, -canvas.height / 2 + 15);
        ctx.fillText('y: ' + Math.round(this.y * 100) / 100 , -canvas.width / 2 + 10, -canvas.height / 2 + 40);
        
        // console.log("x =" + this.x, "y = " + this.y);
        // console.log('gt in PI ' + Math.round(this.gt / Math.PI * 100) / 100 + ' gx: ' + Math.round(this.gx * 100) / 100 + ' gy: ' + Math.round(this.gy * 100) / 100);

    }
}


const sun = new Sun();
//Animation Loop
function animate(){
   ctx.clearRect(-canvas.width/2, -canvas.height/2, canvas.width, canvas.height);
    sun.draw();
    requestAnimationFrame(animate);
}
animate();

