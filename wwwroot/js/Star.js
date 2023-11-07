
export default class Star {
    constructor(number) {
        this.element = document.createElement('div');
        this.element.classList.add('star');
        this.element.innerHTML = number;
        //this.element.style.left = x + 'px;'
        //this.element.style.top =  y + 'px;'
        //this.element.style.left = 'scale({'+scale+'})'
        document.body.append(this.element);
    }
}

let scale;
let numberofstars = 200;
let star;
let x, y, z;
let zModifier = window.innerHeight;
let keyframes, options;
let pointFrom, pointTo
let effects = [];
let x2D, y2D;
let canvasWidth = window.innerWidth;
let canvasHeight = window.innerHeight;

export function firstsetstar() {
    for (let i = 0; i < numberofstars; i++) {
        x = Math.random() * canvasWidth - canvasWidth * 0.5;
        y = Math.random() * canvasHeight - canvasHeight * 0.5;
        z = Math.random() * zModifier;
        star = new Star(i);
        pointFrom = set3Dpoint(x, y, z);
        pointTo = set3Dpoint(x, y, z - zModifier);
        console.log(pointFrom + "/" + pointTo);
        keyframes = [
            {
                transform: `
						translate(${pointFrom[0]}px, ${pointFrom[1]}px)
						scale(${pointFrom[2]})
					`
            },
            {
                transform: `
						translate(${pointTo[0]}px, ${pointTo[1]}px)
						scale(${pointTo[2]})
					`
            }
        ];

        options = {
            duration: 1000 / scale,
            iterations: Infinity,
            fill: 'both',
            easing: 'linear'
        };

        effects.push(new KeyframeEffect(star.element, keyframes, options));
    }
    let groupEffect = new GroupEffect(effects);
    let animation = document.timeline.play(groupEffect);


    window.addEventListener('click', () => {
        if (animation.playState === 'paused') {
            animation.play();
        } else {
            animation.pause();
        }
    });
}

function set3Dpoint(x, y, z) {
    scale = zModifier / (zModifier + z);
    x2D = x * scale + canvasWidth * 0.5;
    y2D = y * scale + canvasHeight * 0.5;

    return [x2D, y2D, scale];
}