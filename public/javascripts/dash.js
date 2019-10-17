// Called when page is first loaded
function loadStats(){
    ake();
}

function ake() {
    let e = document.getElementById("sel");
    let value = e.options[e.selectedIndex].value;


    function onload(){
        school_details()
    }

    function school_details() {
      let e = document.getElementById('car');
      let value = e.options[e.school_details].value;
    }

    // Called to get enrollment for each school
    axios.get(`/enrollment-stats/${value}`)
        .then(function (response) {
            // handle success
            console.log(response.data);

            let data = response.data;
            let school = data.school;
            let boysPlot = JSON.parse(data.boys).map(myFunction);
            let girlsPlot = JSON.parse(data.girls).map(myFunction);

            // call the chart function
            char_enrollment(school, boysPlot, girlsPlot);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            // always executed
        });

    // Called for chart_attendance for each school
    axios.get(`/chart_attendance/${value}`)
        .then(function (response) {
            // handle success
           console.log(response.data);

            let data = response.data;
            let school = data.school;
            let boysPlot = JSON.parse(data.boys).map(myFunction);
            let girlsPlot = JSON.parse(data.girls).map(myFunction);

            // call the chart function
            chart_attendance(school, boysPlot, girlsPlot);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            // always executed
        });

    // Called for teacher pupil ratio
     axios.get(`/teacher-to-pupil-ratio/stats/${value}`)
        .then(function (response) {
            // handle success
           console.log(response.data);

            let data = response.data;
            let school = data.school;
            let p1top3Plot = JSON.parse(data. p1top3).map(myFunction);
            let p4top7Plot = JSON.parse(data.p4top7).map(myFunction);

            // call the chart function
           ratio_teach(school, p1top3Plot, p4top7Plot);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            // always executed
        });

        //called for classroom pupil ratio
        axios.get(`/classroomPupil-stats/${value}`)
        .then(function (response) {
            // handle success
           console.log(response.data);

            let data = response.data;
            let school = data.school;
            let cp1top3Plot = JSON.parse(data. cp1top3).map(myFunction);
            let cp4top7Plot = JSON.parse(data.cp4top7).map(myFunction);

            // call the chart function
           class_ratio(school,cp1top3Plot, cp4top7Plot);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            // always executed
        });

        //called for stance pupil ratio
        axios.get(`/stancePupil-stats/${value}`)
        .then(function (response) {
            // handle success
           console.log(response.data);

            let data = response.data;
            let school = data.school;
            let sprboysPlot = JSON.parse(data. sprboys).map(myFunction);
            let sprgirlsPlot = JSON.parse(data.sprgirls).map(myFunction);
            let sprovrallPlot = JSON.parse(data.sproverall).map(myFunction);

            // call the chart function
           stance_ratio(school,sprboysPlot , sprgirlsPlot, sprovrallPlot);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            // always executed
        });

//called for school details 
        axios.get(`/schooldetails-stats/${value}`)
        .then(function (response) {
            // handle success
           console.log(response.data);

            let data = response.data;
            let school = data.school;
            let distinctData = JSON.parse(data. district).map(myFunction);
            let countyData = JSON.parse(data.county).map(myFunction);
            let subcountyData = JSON.parse(data.subcounty).map(myFunction);
            let parishData = JSON.parse(data.parish).map(myFunction);
           
            // call the chart function
           //school_details(school, distinctData , countyData , subcountyData, parishData );

           let school_details = [school, distinctData, countyData, subcountyData, parishData];

        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            // always executed
        });


}


function myFunction(num) {
    return parseInt(num, 10);
}

function char_enrollment(school, boysPlot, girlsPlot) {
    var ctxx = document.getElementById("mySuperChart").getContext("2d");
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
                    data: boysPlot
                },
                {
                    label: "Girls",
                    backgroundColor: "lightblue",
                    borderColor: "blue",
                    borderWidth: 1,
                    data: girlsPlot
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
                text: school
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
}

function chart_attendance(school, boysPlot, girlsPlot) {
    var ctxx = document.getElementById("chart_attendance").getContext("2d");
    var myChart = new Chart(ctxx, {
        type: 'line',
        data: {
            labels: [
                "P1",
                "P2",
                "P3",
                "P4",
                "P5",
                "P6",
                "P7"
            ],
            datasets: [
                {
                    label: "Boys Attendence",
                    backgroundColor: "rgba(255,10,13,0.1)",
                    borderColor: "red",
                    fillOpacity:.3,
                    fill:true,
                    borderWidth: 1,
                    data: boysPlot
                },
                {
                    label: "Girls Attendence",
                    backgroundColor: "lightblue",
                    borderColor: "blue",
                    borderWidth: 1,
                    data: girlsPlot
                },

            ]
        },
        options: {
            responsive: true,
            legend: {
                position: "top"
            },
            title: {
                display: true,
                text: school
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
}





//teacher to pupils ratio 
function ratio_teach(school, p1top3Plot, p4top7Plot){
    // var randomColorFactor = function () {
    //     return Math.round(Math.random() * 255);
    // };
    
    var config = {
        type: 'doughnut',
        data: {
            datasets: [{
                data: [1, p1top3Plot],
                backgroundColor: [
                    "rgb(150,93,162)",
                    "rgb(38,34,98)"
                ],
                // borderColor:[
                //     "red",
                //     "blue"
                // ],
            }, {
                data: [1, p4top7Plot],
                backgroundColor: [
                    "rgb(150,93,162)",
                    "rgb(38,34,98)"
                ]
            }],
            // labels: [
            //     "Teacher",
            //     "Pupil"
            // ]
        },
        options: {
            responsive: true
        }
    };
    
    // var ctx = document.getElementById("chart-area").getContext("2d");
    // var myDoughnut = new Chart(ctx, config);
    
}

//stance to pupils ratio
function stance_ratio(school,sprboysPlot , sprgirlsPlot, sprovrallPlot){
    // var randomColorFactor = function () {
    //     return Math.round(Math.random() * 255);
    // };
    
    var config = {
        type: 'doughnut',
        data: {
            datasets: [{
                data: [1, sprboysPlot],
                backgroundColor: [
                    "rgb(150,93,162)",
                    "rgb(38,34,98)"
                ],
            }, {
                data: [1, sprgirlsPlot],
                backgroundColor: [
                    "rgb(150,93,162)",
                    "rgb(38,34,98)"
                ],
            }, {
                data: [1, sprovrallPlot ],
                backgroundColor: [
                    "rgb(150,93,162)",
                    "rgb(38,34,98)"
                ],
            }],
            labels: [
                "Stance",
                "Pupil"
                
            ]
        },
        options: {
            responsive: true
        }
    };
    
    var ctx = document.getElementById("nasted2").getContext("2d");
    var myDoughnut = new Chart(ctx, config);
    
}




//classroom to pupils ratio chart 
function class_ratio(school,cp1top3Plot, cp4top7Plot){
    // var randomColorFactor = function () {
    //     return Math.round(Math.random() * 255);
    // };
    
    var config = {
        type: 'doughnut',
        data: {
            datasets: [{
                data: [1, cp1top3Plot],

                backgroundColor: [
                    "rgb(150,93,162)",
                    "rgb(38,34,98)" ],
            }, {
                data: [1,cp4top7Plot],
                
                backgroundColor: [
                    "rgb(150,93,162)",
                    "rgb(38,34,98)"
                ],
            }, {
                data: cp4top7Plot,
                backgroundColor: [
                    "rgb(150,93,162)",
                    "rgb(38,34,98)"
                ],
            }],
            labels: [
                "Classroom",
                "Pupil"
            ]
        },
        title: {
            display: true,
            text: school
        },
        options: {
            responsive: true
        }
    };
    
    var ctx = document.getElementById("nasted3").getContext("2d");
    var myDoughnut = new Chart(ctx, config);
}




//d3 charts with dimple.js

var ctx = document.getElementById('trends').getContext('2d');
var chart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});




