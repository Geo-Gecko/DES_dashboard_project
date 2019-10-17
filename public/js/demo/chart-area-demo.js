//bar chart but is not dymaic it is hard coded values for national enrolment 

var ctxx = document.getElementById("enrloChart").getContext("2d");
var myChart = new Chart(ctxx, {
    type: 'bar',
    data: {
        labels: [
            "p1",
            "p2",
            "p3",
            "p4",
            "p5",
            "p6",
            "p7"
        ],
        datasets: [
            {
                label: "Boys",
                backgroundColor: "pink",
                borderColor: "red",
                borderWidth: 1,
                data: [200,45,500,80,45,250,750]
            },
            {
                label: "Girls",
                backgroundColor: "lightblue",
                borderColor: "blue",
                borderWidth: 1,
                data: [456,100,89,105,50,67,59]
            }
        ]
    },
    options: {
        responsive: true,
        legend: {
            position: "top"
        },
        title: {
            display: true,
            text: 'District'
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});



//bar chart but is not dymaic it is hard coded values for national for the attendance 

var ctxx = document.getElementById("attendanChart").getContext("2d");
var myChart = new Chart(ctxx, {
    type: 'line',
    data: {
        labels: [
            "p1",
            "p2",
            "p3",
            "p4",
            "p5",
            "p6",
            "p7"
        ],
        datasets: [
            {
                label: "Boys",
                backgroundColor: "pink",
                borderColor: "red",
                borderWidth: 1,
                data: [200,45,800,90,85,25,750]
            },
            {
                label: "Girls",
                backgroundColor: "lightblue",
                borderColor: "blue",
                borderWidth: 1,
                data: [456,100,89,105,50,67,59]
            }
        ]
    },
    options: {
        responsive: true,
        legend: {
            position: "top"
        },
        title: {
            display: true,
            text: 'District Attendence'
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});