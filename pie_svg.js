const main = async () => {
    const colors = ["#FF5733", "#FFC300", "#3498DB", "#27AE60"];

    const pie_chart = document.querySelector(".pie_chart");

    const result = await fetch("/data.json");

    const data = await result.json();


    let previousAngle = 0;
    let index = 0;

    const centerX = 250;
    const centerY = 250;
    const radius = 250;    

    for(const element of data){
        const angle = previousAngle + element.value / 100.0 * 360;
        const [startX, startY] = calculatePointOnCircle(previousAngle, centerX, centerY, radius);
        const [endX, endY] = calculatePointOnCircle(angle, centerX, centerY, radius);
        const pathData = [
            `M${centerX} ${centerY}`,
            `L${startX} ${startY}`,
            `A${radius} ${radius} 0 ${Math.abs(angle - previousAngle) > 180 ? 1 : 0} 1 ${endX} ${endY}`,
        ]
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", pathData);
        path.setAttribute("fill", colors[index]);
        console.log(path)
        pie_chart.appendChild(path);
        index++;
        previousAngle = angle;
    }
}

const calculatePointOnCircle = (angle, centerX, centerY, radius) => {
    const angleInRadians = angle * Math.PI / 180;

    const x = centerX + radius * Math.cos(angleInRadians);
    const y = centerY + radius * Math.sin(angleInRadians);

    return [x, y];
}


main();