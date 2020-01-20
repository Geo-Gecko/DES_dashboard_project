
let downloadChart = function (element) {

    let currentHeight = window.scrollY
    window.scrollTo(0,0);
    let chartDiv = element.parentNode.children[1]
    let chart_title = chartDiv.children[0].innerText.replace(" ", "")
    html2canvas(chartDiv, { height: chartDiv.scrollHeight, width: chartDiv.scrollWidth })
        .then(canvas => {
            let theCanvas = canvas;
            theCanvas.toBlob(blob => {
                saveAs(blob, chart_title);
            });
        })
    window.scrollTo(0, currentHeight);
};
