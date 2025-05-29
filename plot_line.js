const plotLine = document.querySelector(".plotLine");

const data = [23, 50, 30, 33, 24, 27, 45, 10, 20];

const width = plotLine.viewBox.baseVal.width;
const height = plotLine.viewBox.baseVal.height;


const xOffset = width * 1.0 / data.length;
const maxHeight = Math.max(...data);

const points = data.map((data, i) => {
    const x = i * xOffset;
    const y = height - data * 1.0 / maxHeight * height

    return `${x},${y}`;
});


const polyline = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
polyline.setAttribute("points", points);
polyline.setAttribute("fill", "none");
polyline.setAttribute("stroke", "steelblue");
polyline.setAttribute("stroke-width", 2);

plotLine.appendChild(polyline); 