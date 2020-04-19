const canvas = document.querySelector('canvas');
const generateButton = document.querySelector('.generate-tree-button');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');
let curve = 10

function drawTree(startX, startY, len, angle, branchWidth, color1, color2) {
    ctx.beginPath();
    ctx.save();
    ctx.strokeStyle = color1;
    ctx.fillStyle = color2;
    ctx.shadowBlur = 5;
    ctx.shadowColor = 'black';
    ctx.lineWidth = branchWidth;
    ctx.translate(startX, startY);
    ctx.rotate(angle * Math.PI/180);
    ctx.moveTo(0, 0);
    // ctx.lineTo(curve, -len);
    ctx.bezierCurveTo(10, -len/2, -10, -len/2, 0, -len)
    ctx.stroke();

    if (len < 15) {
        // leafs
        ctx.beginPath();
        ctx.arc(0, -len, 10, 0, Math.PI/2)
        ctx.fill()
        ctx.restore();
        return;
    }

    drawTree(0, -len, len*0.8, angle + curve, branchWidth * 0.6);
    drawTree(0, -len, len*0.8, angle - curve, branchWidth * 0.7);
    ctx.restore();
}
// startX, startY, len, angle, branchWidth, color1, color2
drawTree(canvas.width/2, canvas.height - 60,110,0, 20, 'brown', 'green');

function generateRandomTree(){
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  const centerPointX = canvas.width/2
  const len = Math.floor((Math.random() * 20) + 100)
  const angle = 0
  const branchWidth = (Math.random() * 70 + 1)
  const color1 = 'rgb(' + Math.random() * 255 + ',' 
    + Math.random() * 255 + ',' + Math.random() * 255 + ')' 
  const color2 = 'rgb(' + Math.random() * 255 + ',' 
    + Math.random() * 255 + ',' + Math.random() * 255 + ')'
  generateButton.style.background = color1
  curve = Math.random() * 20 + 2;
  drawTree(centerPointX, canvas.height - 60, len, angle, branchWidth, color1, color2);
}

generateButton.addEventListener('click', () => {
  generateRandomTree()
})

window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    drawTree(canvas.width/2, canvas.height - 80,100,0, 15, 'brown', 'green');
});