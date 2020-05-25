var ctx = canvas.getContext('2d');
var inventory_context = inventory_canvas.getContext('2d');
//LOAD TEXTURES
var textures_blocks = new Image();
var textures_tools = new Image();
textures_blocks.src = 'img/textures.png';
textures_tools.src = 'img/textures_tools.png';

if (window.innerWidth < 700){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}else{
    canvas.width = 700;
    canvas.height = 500;
}

window.onload = function() {
	Gifffer();
}



class all_objects {
    objects = [
        {
            img:textures_blocks,
            x:0,
            y:15,
            proc:0,
            procFull:0,
            name:'Empty',
            random_key:null,
            full: 64
        },
        {
            img:textures_blocks,
            x: 3,
            y: 0,
            proc: 0,
            procFull: 100,
            name:'Grass',
            random_key:null,
            full: 5
        },
        {
            img:textures_blocks,
            x: 2,
            y: 0,
            proc: 0,
            procFull: 50,
            name:'Dirt',
            random_key:null,
            full: 64
        },
        {
            img:textures_blocks,
            x: 1,
            y: 0,
            proc: 0,
            procFull: 500,
            name: 'Stone',
            random_key:null,
            full: 64
        }
    ];

    getObjectByName (name){
        let output = {}
        this.objects.forEach(element => {
            if (name.toLowerCase() == element.name.toLowerCase()){
                output = clone(element);
            }
        });
        
        let key = this.generateRandomKey();
        output.random_key = key;
        return output
    }
    generateRandomKey (){
        return Math.floor(Math.random()*10000000000000)
    }
}
function clone(obj) {
    if (null == obj || "object" != typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
}

var AllObjects = new all_objects();