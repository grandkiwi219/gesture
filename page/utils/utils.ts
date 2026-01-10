import std from '../std';

function getIsValidEnumValue(enumObject: any, value: number | string) {
   return Object.keys(enumObject)
      .filter((key) => isNaN(Number(key)))
      .some((key) => enumObject[key] === value);
}

function drawBoard(ctx: CanvasRenderingContext2D) {
    const p = -2;
    for (var x = 1; x <= std.size.display; x += 40) {
        ctx.moveTo(0.5 + x + p, p);
        ctx.lineTo(0.5 + x + p, std.size.display + p);
    }

    for (var x = 1; x <= std.size.display; x += 40) {
        ctx.moveTo(p, 0.5 + x + p);
        ctx.lineTo(std.size.display + p, 0.5 + x + p);
    }
    ctx.strokeStyle = "gray";
    ctx.stroke();
}

async function setDelay(time: number) {
    return await new Promise(r => setTimeout(r, time));
}

async function showAlert({ type, msg = undefined }: Alert) {
    const alert = document.createElement('div');
    alert.classList.add('show-alert');
    if (type) alert.classList.add(type);
    alert.textContent = msg ?? '메세지가 할당되지 않았습니다.';

    document.body.appendChild(alert);

    await setDelay(100);
    alert.classList.add('show');
    alert.classList.add('down');
    await setDelay(400);
    alert.classList.add('up');
    await setDelay(2 * 1000);
    alert.classList.remove('show');
    await setDelay(200);
    alert.remove();

    return true;
}

function getPosY(element: HTMLElement){ 
    let posY = element.offsetTop; 
    if(element.parentElement){ 
        posY -= element.parentElement.offsetTop; 
    } 
    return posY; 
}

export default {
    getIsValidEnumValue,
    drawBoard,
    setDelay,
    showAlert,
    getPosY,
}
