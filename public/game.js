function Game(){
    blocks = [[]]
    camera = {
        x: 0,
        y: -300
    }
    now_block = {x:0,y:0}

    function draw() {
        let width_block = 48;
        let height_block = 48;
        for (var i = 0; i < this.blocks.length; i++){
            for (var k = 0; k < this.blocks[i].length; k++){
                ctx.drawImage(textures_img, this.blocks[i][k].x*width_block,
                                            this.blocks[i][k].y*height_block,
                                            width_block,
                                            height_block,
                                            k*width_block - this.camera.x,
                                            i*height_block - this.camera.y,
                                            width_block,
                                            height_block);
                
                ctx.drawImage(textures_img, Math.floor(blocks[i][k].proc / (blocks[i][k].procFull  / 9))*width_block,
                                            15*height_block,
                                            width_block,
                                            height_block,
                                            k*width_block - this.camera.x,
                                            i*height_block - this.camera.y,
                                            width_block,
                                            height_block);
            }
        }
    }

    function update() {
        ctx.clearRect(0,0,canvas.width,canvas.height);
        draw();
        settings();
        //camera.y += 1;
        requestAnimationFrame(update)
    }

    function SpawnArray() {
        for (var i = 0; i < 20; i++){
            obj = {
                x: blocks_ids.grass.x,
                y: blocks_ids.grass.y,
                proc: 0,
                procFull: blocks_ids.grass.procFull
            }
            blocks[blocks.length - 1].push(obj);
        }
        for (var i = 0; i < 7; i++){
            blocks.push([])
            for (var k = 0; k < 20; k++){
                blocks[blocks.length-1].push(blocks_ids.dirt);
            }
        }
        for (var i = 0; i < 50; i++){
            blocks.push([])
            for (var k = 0; k < 20; k++){
                blocks[blocks.length-1].push(blocks_ids.stone);
            }
        }
    }

    function settings() {
        button.style = 'top: ' + (canvas.height - 120) + 'px;'+
                       'left: ' + (canvas.width/2 - 50) + 'px;';
        chest.style = 'left: ' + (canvas.width - 120) + 'px';
        }

    button.onclick = function(e) {
        if (blocks[now_block.y][now_block.x].proc <= blocks[now_block.y][now_block.x].procFull)
            blocks[now_block.y][now_block.x].proc += 5;
        else{
            blocks[now_block.y][now_block.x] = blocks_ids.empty;
            now_block.x+=1;
        }
        //console.log(blocks[now_block.y][now_block.x+2])
    }



    SpawnArray();
    update();
}

var textures_img = new Image();
textures_img.src = 'img/textures.png';
textures_img.onload = function() {
    Game();       
}
