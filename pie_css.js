const main = async () => {
    const colors = ["#FF5733", "#FFC300", "#3498DB", "#27AE60"];

    const pie_chart = document.querySelector(".pie_chart");

    const result = await fetch("/data.json");

    const data = await result.json();


    let style = "background: conic-gradient(";
    let previousAngle = 0;
    let index = 0;
    for(const element of data){
        const angle = previousAngle + element.value / 100.0 * 360;
        style += `${colors[index]} ${previousAngle}deg ${angle}deg, `
        index++;
        previousAngle = angle;
    }

    style = style.slice(0, -2) + ");";
    console.log(style)
    pie_chart.style = style;    
}


main();