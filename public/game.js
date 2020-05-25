function Game(){
    blocks = [[]]
    camera = {
        x: 0,
        y: -300
    }
    now_block = {x:0,y:0}
    show_inventory = true;
    inventory_array = [
        
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
        drawInventory();
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
        
        inventory_canvas.width = $('#inventory').width()-$('#inventory').width()/100*8.50;
        inventory_canvas.height = $('#inventory').height() - $('#inventory').height()/100*19;
        //inventory_canvas.width = $('#inventory').width();
        //inventory_canvas.height = $('#inventory').height();
    }

    button.onclick = function(e) {
        if (blocks[now_block.y][now_block.x].proc <= blocks[now_block.y][now_block.x].procFull)
            blocks[now_block.y][now_block.x].proc += 20;
        else{
            InventoryAdd(blocks[now_block.y][now_block.x], 1);
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
    });
    $('#gameDiv #canvas').click(function(){
        $('#gameDiv #inventory').fadeOut(500);
    });

    function createInventrory(){
        for (var i = 0; i < 3; i++){
            inventory_array.push([]);
            for (var k = 0; k < 9; k++){
                inventory_array[i].push({
                    item:null,
                    num:0,
                });
            }
        }
    }
    function drawInventory(){

        //console.log( $('#inventory').width())
        for (var k = 0; k < 3; k++){
            for (var i = 0; i < 9; i++){
                if (inventory_array[k][i].num != 0){
                    inventory_context.drawImage(
                        inventory_array[k][i].item.img,
                        inventory_array[k][i].item.x*48,
                        inventory_array[k][i].item.y*48,
                        48,
                        48,
                        (i*inventory_canvas.width/100*11.2)+inventory_canvas.width/100*1.4,
                        (k*inventory_canvas.width/100*11.2)+inventory_canvas.width/100*1.4,
                        (inventory_canvas.width/100*10.2)/1.3,
                        (inventory_canvas.width/100*10)/1.3);
                    inventory_context.font = inventory_canvas.width/100*4.5 + 'px Arial';
                    inventory_context.fillText(
                        inventory_array[k][i].num, 
                        (i*inventory_canvas.width/100*11.2)+inventory_canvas.width/100*8,
                        ((k*inventory_canvas.width/100*11.2)+inventory_canvas.width/100*1.4) + (inventory_canvas.width/100*10)/1.2);
                }
            }
        }
    }

    function InventoryAdd(item, num){
        stop = false;
        for (var i = 0; i < inventory_array.length; i++){
            for (var k = 0; k < inventory_array[i].length; k++){
                element = inventory_array[i][k];
                if (element.num == 0){
                    element.item = item;
                    element.num = num;
                    stop = true;
                }else if (element.item.name == item.name && element.num+num <= item.full){
                    element.num++;
                    stop = true;
                    //console.log(item.full)
                }
                if (stop)
                    break;
            }
            if (stop)
                break;
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
