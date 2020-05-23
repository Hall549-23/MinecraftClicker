var ctx = canvas.getContext('2d');

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

var blocks_ids = {
    empty: {
        x:0,
        y:15,
        proc:0,
        procFull:0
    },
    grass: {
        x: 3,
        y: 0,
        proc: 0,
        procFull: 100
    },
    dirt: {
        x: 2,
        y: 0,
        proc: 0,
        procFull: 50
    },
    stone: {
        x: 1,
        y: 0,
        proc: 0,
        procFull: 500
    }
}