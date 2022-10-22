document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('mousedown', (ev) => {
        ev.preventDefault();
        handle(ev.clientX, ev.clientY);
    }, { passive: false });
    document.addEventListener('touchstart', (ev) => {
        ev.preventDefault();
        const touch = ev.touches[0];
        handle(touch.clientX, touch.clientY);
    }, { passive: false });
    dispBPM();
});

const now0 = Date.now();
let counter = 0;
const tList = [];
function handle(mx, my) {
    const now = Date.now();
    tList.push([now - now0, counter++]);
    dispBPM();
    drawAnimation(mx, my);
}

function dispBPM() {
    const div = document.getElementById('disp-bpm');
    let bpm = 0;
    if (tList.length > 1) {
        const { m, b } = ss.linearRegression(tList);
        bpm = m * 1000 * 60;
    }

    div.innerText = `BPM ${bpm}`
}
function drawAnimation(mx, my) {
    const div = document.createElement('div');
    document.body.appendChild(div);

    const size = 10;
    const dur = 300;
    div.style = `
            position: fixed;
            width: ${size * 2}px;
            height: ${size * 2}px;
            top: ${my - size}px;
            left: ${mx - size}px;
            border: 1px solid blue;
            border-radius: 50%;
        `
    anime({
        targets: div,
        opacity: 0,
        duration: dur,
        easing: 'easeOutQuad',
        scale: 20,
    });
    setTimeout(() => div.remove(), dur + 10);
}