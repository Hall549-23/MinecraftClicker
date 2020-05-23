function Game(){
    blocks = [[]]
    camera = {
        x: 0,
        y: -300
    }
    now_block = {x:0,y:0}
    show_inventory = true;
    inventory = [
        
    ]

    function draw() {
        let width_block = 48;
        let height_block = 48;
        for (var i = 0; i < this.blocks.length; i++){
            for (var k = 0; k < this.blocks[i].length; k++){
                ctx.drawImage(textures_blocks, this.blocks[i][k].x*width_block,
                                            this.blocks[i][k].y*height_block,
                                            width_block,
                                            height_block,
                                            k*width_block - this.camera.x,
                                            i*height_block - this.camera.y,
                                            width_block,
                                            height_block);
                
                ctx.drawImage(textures_blocks, Math.floor(blocks[i][k].proc / (blocks[i][k].procFull  / 8))*width_block,
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
            blocks[blocks.length - 1].push(AllObjects.getObjectByName('grass'));
        }
        for (var i = 0; i < 7; i++){
            blocks.push([])
            for (var k = 0; k < 20; k++){
                blocks[blocks.length-1].push(AllObjects.getObjectByName('dirt'));
            }
        }
        for (var i = 0; i < 50; i++){
            blocks.push([])
            for (var k = 0; k < 20; k++){
                blocks[blocks.length-1].push(AllObjects.getObjectByName('stone'));
            }
        }
        console.log(blocks)
    }

    function settings() {
        button.style = 'top: ' + (canvas.height - 150) + 'px;'+
                       'left: ' + (canvas.width/2 - 50) + 'px;';
        chest.style = 'left: ' + (canvas.width - 100) + 'px';
        $('#gameDiv #shop').css({
            'top':120+'px',
            'left':(canvas.width-100)+'px'
        });
        $('#gameDiv #inventory').css({
            'width':canvas.width-(canvas.width/100*4),
            'height':canvas.width/2,
            'left':canvas.width/100 * 2,
            'top':canvas.height-canvas.width/2-50,
        });
        $('#inventory .slots .row').css({
            
        });
    }

    button.onclick = function(e) {
        if (blocks[now_block.y][now_block.x].proc <= blocks[now_block.y][now_block.x].procFull)
            blocks[now_block.y][now_block.x].proc += 20;
        else{
            blocks[now_block.y][now_block.x] = AllObjects.getObjectByName('empty');
            now_block.x+=1;
        }
        //console.log(blocks[now_block.y][now_block.x+2])
    }
    $('#gameDiv #chest').click(function(){
        if (show_inventory){
            $('#gameDiv #inventory').fadeIn(500);
            show_inventory = false;
        }
        else{
            $('#gameDiv #inventory').fadeOut(500);
            show_inventory = true;
        }
        console.log('Test')
    });
    $('#gameDiv #canvas').click(function(){
        $('#gameDiv #inventory').fadeOut(500);
    });

    function createInventrory(){
        for (var i = 0; i < 3; i++){
            inventory.push([]);
            for (var k = 0; k < 9; k++){
                inventory[i].push({
                    item:AllObjects.getObjectByName('grass'),
                    num:0,
                });
            }
        }
    }
    function drawInventory(){
        for (var i = 0; i < inventory.length; i++){
            $('#inventory .slots').append('<div class="row" id='+'row_'+i+'></div>');
            for (var k = 0; k < inventory[i].length; k++){
                if (inventory[i][k].item != null)
                    $('#inventory .slots #row_'+i).append('<div><img x=0 width=100% src="'+inventory[i][k].item.img.src+'"></div>');
                else
                    $('#inventory .slots #row_'+i).append('<div></div>');
                    
                $('#inventory .slots .row div').css({
                    'width':'',
                    'height':''
                })
            }
        }
        
    }

    createInventrory();
    drawInventory();
    SpawnArray();
    update();
}



textures_blocks.onload = function() {
    Game();       
}
