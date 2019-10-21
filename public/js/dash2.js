function loadStats() {
    ake();
}

$(document).ready(function() {
    ake('Adjumani')
});

function ake(districtName) {
    //let e = document.getElementById("sel");

    let value = districtName ? districtName : 'Adjumani';


    //called for district details
    axios.get(`/districtdetails-stats/${value}`)
        .then(function(response) {
            // handle success
            //console.log(response.data);

            let data = response.data;
            let district = data.district;
            let totalSchoolsData = data.school[0];
            let totalBoysData = data.Boys[0];
            let totalGrilsData = data.Grils[0];
            let totalInspectionData = data.inspection[0];
            let max_inspectionData = data.max_inspection[0];

            $('#districtDetails').html("<table>" +
                "<tr><td>District:</td><td>" + district + "</td><tr>" +
                "<tr><td>Number of Boys:</td><td>" + totalBoysData + "</td><tr>" +
                "<tr><td>Number of Girls:</td><td>" + totalGrilsData + "</td><tr>" +
                "<tr><td>Total  Number of Schools:</td><td>" + totalSchoolsData + "</td><tr>" +
                "<tr><td>Total  Number of Inspections:</td><td>" + totalInspectionData + "</td><tr>" +
                "<tr><td>Latest Inspections:</td><td>" + max_inspectionData + "</td><tr>" + "</table>")

        })
        .catch(function(error) {
            // handle error
            console.log(error);
        })
        .finally(function() {
            // always executed
        });


    // Called for chart_attendance for each district 
    axios.get(`/districtattendance-stats/${value}`)
        .then(function(response) {
            // handle success
            // console.log(response.data);

            let data = response.data;
            let district = data.district;
            let boysPlot = JSON.parse(data.boys).map(myFunction);
            let girlsPlot = JSON.parse(data.girls).map(myFunction);


            // call the chart function
            chart_attendance_district(district, girlsPlot, boysPlot);
        })
        .catch(function(error) {
            // handle error
            console.log(error);
        })
        .finally(function() {
            // always executed
        });

    // Called for chart_enrolment for each district 
    axios.get(`/districtenrolment-stats/${value}`)
        .then(function(response) {
            // handle success
            //console.log(response.data);

            let data = response.data;
            let district = data.district;
            let boysPlot = JSON.parse(data.boys).map(myFunction);
            let girlsPlot = JSON.parse(data.girls).map(myFunction);

            // call the chart function
            chart_enrolment_district(district, boysPlot, girlsPlot);
        })
        .catch(function(error) {
            // handle error
            console.log(error);
        })
        .finally(function() {
            // always executed
        });

    // Called for teacher pupil ratio for each district 
    axios.get(`/districtTPR-stats/${value}`)
        .then(function(response) {
            // handle success
            // console.log(response.data);

            let data = response.data;
            let district = data.district;
            let p1top3Plot = JSON.parse(data.p1top3).map(myFunction);
            let p4top7Plot = JSON.parse(data.p4top7).map(myFunction);

            // call the chart function
            ratio_teach_district(district, p1top3Plot, p4top7Plot);
        })
        .catch(function(error) {
            // handle error
            console.log(error);
        })
        .finally(function() {
            // always executed
        });


    //called for stance pupil ratio for district 
    axios.get(`/districtSPR-stats/${value}`)
        .then(function(response) {
            // handle success
            // console.log(response.data);

            let data = response.data;
            let district = data.district;
            let sprboysPlot = JSON.parse(data.sprboys).map(myFunction);
            let sprgirlsPlot = JSON.parse(data.sprgirls).map(myFunction);
            let sprovrallPlot = JSON.parse(data.sproverall).map(myFunction);

            // call the chart function
            stance_ratio_district(district, sprboysPlot, sprgirlsPlot, sprovrallPlot);
        })
        .catch(function(error) {
            // handle error
            console.log(error);
        })
        .finally(function() {
            // always executed
        });


    //called for classroom pupil ratio for district
    axios.get(`/districtCPR-stats/${value}`)
        .then(function(response) {
            // handle success
            //console.log(response.data);

            let data = response.data;
            let district = data.district;
            let cp1top3Plot = JSON.parse(data.cp1top3).map(myFunction);
            let cp4top7Plot = JSON.parse(data.cp4top7).map(myFunction);

            // call the chart function
            class_ratio_district(district, cp1top3Plot, cp4top7Plot);
        })
        .catch(function(error) {
            // handle error
            console.log(error);
        })
        .finally(function() {
            // always executed
        });

    //chartpillars for district 
    axios.get(`/districtpillars-stats/${value}`)
        .then(function(response) {
            // handle success
            console.log(response.data);

            let data = response.data;
            let district = data.district;

            let districtConditionalPlot = data.districtConditionalPlot;
            // console.log(conditionalPlot);
            // let girlsPlot = JSON.parse(data.girls).map(myFunction);
            chartPillarDistrict(district, districtConditionalPlot);

        })
        .catch(function(error) {
            // handle error
            console.log(error);
        })
        .finally(function() {
            // always executed
        });


}

function myFunction(num) {
    return parseInt(num, 10);
}


var myEnrolChart, myAttendChart, teacherRatio, StanceRatio, ClassroomRatio, myPillarChart;


//bar chart but is not dymaic it is hard coded values for district
function chart_enrolment_district(district, girlsPlot, boysPlot) {
    if (myEnrolChart) {
        myEnrolChart.destroy();
    }
    var ctxx = document.getElementById("superChart").getContext("2d");
    myEnrolChart = new Chart(ctxx, {
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
            datasets: [{
                    label: "Girls",
                    backgroundColor: "pink",
                    borderColor: "red",
                    borderWidth: 1,
                    data: boysPlot
                },
                {
                    label: "Boys",
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
                text: district
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




//bar chart but is not dymaic it is hard coded values for district for the attendance 
function chart_attendance_district(district, girlsPlot, boysPlot) {

    if (myAttendChart) {
        myAttendChart.destroy();
    }

    var ctxx = document.getElementById("attendanChart").getContext("2d");
    myAttendChart = new Chart(ctxx, {
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
            datasets: [{
                    label: "Girls",
                    backgroundColor: "rgba(255,10,13,0.1)",
                    borderColor: "red",
                    borderWidth: 1,
                    data: boysPlot
                },
                {
                    label: "Boys",
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
                text: district
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



//teacher to pupils ratio for the district 
function ratio_teach_district(district, p1top3Plot, p4top7Plot) {
    if (teacherRatio) {
        teacherRatio.destroy();
    }
    var randomColorFactor = function() {
        return Math.round(Math.random() * 255);
    };

    var config = {
        type: 'bar',
        data: {
            datasets: [{
                data: [1/p1top3Plot,100/p4top7Plot,1/53 ],
                backgroundColor: [
                    "rgb(38,34,98)",
                    "rgb(38,34,98)",
                    "rgb(38,34,98)"
                ],
            }],
            labels: [
                "P1-P3",
                "P4-P7",
                "National"

            ]
        } , options: {
            legend: {
                display: false,
                // position: "bottom",
            }
            ,
                scales: {
                  yAxes: [{
                    scaleLabel: {
                      display: true,
                      labelString: 'TPR'
                    }
                  }]
                }     
              
        }
    };

    var ctx = document.getElementById("district_1").getContext("2d");
    teacherRatio = new Chart(ctx, config);

}




//stance to pupils ratio for district 
function stance_ratio_district(district, sprboysPlot, sprgirlsPlot, sprovrallPlot) {
    if (StanceRatio) {
        StanceRatio.destroy();
    }
    // var randomColorFactor = function () {
    //     return Math.round(Math.random() * 255);
    // };

    var config = {
        type: 'bar',
        data: {
            datasets: [{
                data: [1/sprboysPlot,100/sprgirlsPlot,1/40 ],
                backgroundColor: [
                    "rgb(38,34,98)",
                    "rgb(38,34,98)",
                    "rgb(38,34,98)"
                ],
            }],
            labels: [
                "P1-P3",
                "P4-P7",
                "National"

            ]
        },
        options: {
            legend: {
                display: false,
                // position: "bottom",
            }
            ,
                scales: {
                  yAxes: [{
                    scaleLabel: {
                      display: true,
                      labelString: 'SPR'
                    }
                  }]
                }     
              
        }
    };

    var ctx = document.getElementById("district_2").getContext("2d");
    StanceRatio = new Chart(ctx, config);

}


//classroom to pupils ratio chart for district 
function class_ratio_district(district, cp1top3Plot, cp4top7Plot) {
    if (ClassroomRatio) {
        ClassroomRatio.destroy();
    }
    // var randomColorFactor = function () {
    //     return Math.round(Math.random() * 255);
    // };

    var config = {
        type: 'bar',
        data: {
            datasets: [{
                data: [1/cp1top3Plot,1/cp4top7Plot,1/53 ],

                backgroundColor: [
                    "rgb(38,34,98)",
                    "rgb(38,34,98)",
                    "rgb(38,34,98)"
                ],
            }],
            labels: [
                "P1-P3",
                "P4-P7",
                "National"
            ]
        },
        title: {
            display: true,
            text: district
        },
        options: {
            legend: {
                display: false,
                // position: "bottom",
            }
            ,
                scales: {
                  yAxes: [{
                    scaleLabel: {
                      display: true,
                      labelString: 'CPR'
                    }
                  }]
                }     
              
        }
    };

    var ctx = document.getElementById("district_3").getContext("2d");
    ClassroomRatio = new Chart(ctx, config);
}

function chartPillarDistrict(district, districtConditionalPlot) {
    if (myPillarChart) {
        myPillarChart.destroy();
    }


    var barOptions_stacked = {
        tooltips: {
            enabled: false
        },
        hover: {
            animationDuration: 10,
        },
        scales: {
            xAxes: [{
                label: "Duration",
                ticks: {
                    beginAtZero: true,
                    fontFamily: "'Open Sans Bold', sans-serif",
                    fontSize: 0
                },
                scaleLabel: {
                    display: false
                },
                gridLines: {
                    display: false
                },
                stacked: true
            }],
            yAxes: [{
                gridLines: {
                    display: false,
                    color: "#fff",
                    zeroLineColor: "#fff",
                    zeroLineWidth: 0
                },
                ticks: {
                    fontFamily: "'Open Sans Bold', sans-serif",
                    fontSize: 11
                },
                stacked: true
            }]
        },
        legend: {
            display: true,
            position: "bottom",
            labels: {
                // fontColor: '#FFA500'
                filter: function(item, chart) {
                    // Logic to remove a particular legend item goes here
                    return !item.text.includes('hide');
                }
            }
        }
    };

    function colourPicker(d) {
        if (d === 1) {
            return "#edf8fb"
        } else if (d === 2) {
            return "#b3cde3"
        } else if (d === 3) {
            return "#8c96c6"
        } else if (d === 4) {
            return "#88419d"
        }
    }

    var chosenColours = [];
    districtConditionalPlot[0].forEach(function(d, i) {
        chosenColours.push(colourPicker(parseInt(d)));
    })

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    districtConditionalPlot[1] = [getRandomInt(2, 3), getRandomInt(2, 3), getRandomInt(2, 3), getRandomInt(2, 3), getRandomInt(2, 3), getRandomInt(2, 3), getRandomInt(2, 3)]

    districtConditionalPlot[2] = [getRandomInt(2, 3), getRandomInt(2, 3), getRandomInt(2, 3), getRandomInt(2, 3), getRandomInt(2, 3), getRandomInt(2, 3), getRandomInt(2, 3)]

    districtConditionalPlot[3] = [getRandomInt(2, 3), getRandomInt(2, 3), getRandomInt(2, 3), getRandomInt(2, 3), getRandomInt(2, 3), getRandomInt(2, 3), getRandomInt(2, 3)]


    var ctx = document.getElementById("district_pillars");
    myPillarChart = new Chart(ctx, {
        type: 'horizontalBar',
        data: {
            labels: ["1.Condition of school building", "2.Classroom infrastucture", "3.Sanitary facilities", "4.Timetabling", "5.Teacher deployment", "6.Disciplinary policy", "7.Inclusive school practice", "8.Gender Sensitive School"],

            datasets: [{
                label: 'hide',
                data: [1, 1, 1, 1, 1, 1, 1, 1],
                backgroundColor: chosenColours,
            }, {
                label: '25% - 40%',
                backgroundColor: "#edf8fb"
            }, {
                label: '41% - 60%',
                backgroundColor: "#b3cde3"
            }, {
                label: '61% - 80%',
                backgroundColor: "#8c96c6"
            }, {
                label: '81% - 100%',
                backgroundColor: "#88419d"
            }]
        },
        options: barOptions_stacked,
    });

    // console.log($('#pillars'));

    $(document).on('change', '#district', function() {
        // console.log($(this).val());
        // Does some stuff and logs the event to the console

        if ($(this).val() === "0") {
            myPillarChart.data.labels = ["1.Condition of school building", "2.Classroom infrastucture", "3.Sanitary facilities", "4.Timetabling", "5.Teacher deployment", "6.Disciplinary policy", "7.Inclusive school practice", "8.Gender Sensitive School"]
        } else if ($(this).val() === "1") {
            myPillarChart.data.labels = ["1.Teacher and pupil attendance", "2.School Improvement plan", "3.SIP activities", "4.Financial management", "5.Systematic monitoring and evaluation of teacher performance", "6.Continuous professional development", "7.Systematic monitoring of pupil performance"]
        } else if ($(this).val() === "2") {
            myPillarChart.data.labels = ["1.Lesson planning", "2,Lesson delivery", "3.Teaching and learning materials", "4.Learner particiption", "5,Learning", "6.Teachers' rapport with learners", "7.Classroom environment", "8.Pupils' work"]
        } else if ($(this).val() === "3") {
            myPillarChart.data.labels = ["1. School management committee", "2. School communication with parents/community", "3. Teacher communication with parents", "4. Involvement of parents"]
        }

        // console.log(districtConditionalPlot)


        var colourChanged = [];
        districtConditionalPlot[parseInt($(this).val())].forEach(function(d, i) {
            if (i < myPillarChart.data.labels.length) {
                colourChanged.push(colourPicker(parseInt(d)));

            }
        })

        myPillarChart.data.datasets[0].backgroundColor = colourChanged;
        myPillarChart.update();


    });

    // this part to make the tooltip only active on your real dataset
    var originalGetElementAtEvent = myPillarChart.getElementAtEvent;
    myPillarChart.getElementAtEvent = function(e) {
        return originalGetElementAtEvent.apply(this, arguments).filter(function(e) {
            return e._datasetIndex === 1;
        });
    }


}



//d3 charts with dimple.js
function trendPillar(school, trendPlot) {
    if (trendChart) {
        trendChart.destroy();
    }
    var trendChart = new Chart(document.getElementById("district_lineChart"), {
        type: 'line',
        data: {
            labels: ["First Term", "Second Term", "Third Term"],
            datasets: [{
                data: trendPlot[0][0],
                label: "Enrollment",
                borderColor: "#3e95cd",
                fill: false
            }, {
                data: trendPlot[0][1],
                label: "Attendance",
                borderColor: "#8e5ea2",
                fill: false
            }]
        },
        options: {
            title: {
                display: true,
                text: ''
            }
        }
    });

    $(document).on('change', '#trendSelector', function() {
        // console.log($(this).val());
        // Does some stuff and logs the event to the console



        if ($(this).val() === "0") {
            trendChart.data.datasets[0].data = trendPlot[0][0]
            trendChart.data.datasets[1].data = trendPlot[0][1]
        } else if ($(this).val() === "1") {
            trendChart.data.datasets[0].data = trendPlot[1][0]
            trendChart.data.datasets[1].data = trendPlot[1][1]
        } else if ($(this).val() === "2") {
            trendChart.data.datasets[0].data = trendPlot[2][0]
            trendChart.data.datasets[1].data = trendPlot[2][1]
        } else if ($(this).val() === "3") {
            trendChart.data.datasets[0].data = trendPlot[3][0]
            trendChart.data.datasets[1].data = trendPlot[3][1]
        }

        trendChart.update();


    });

}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var trendPlot = [
    [],
    [],
    [],
    []
];

trendPlot[0][0] = [getRandomInt(9000, 15000), getRandomInt(9000, 15000), getRandomInt(9000, 15000)]
trendPlot[1][0] = [getRandomInt(9000, 15000), getRandomInt(9000, 15000), getRandomInt(9000, 15000)]
trendPlot[2][0] = [getRandomInt(9000, 15000), getRandomInt(9000, 15000), getRandomInt(9000, 15000)]
trendPlot[3][0] = [getRandomInt(9000, 15000), getRandomInt(9000, 15000), getRandomInt(9000, 15000)]
trendPlot[0][1] = [getRandomInt(9000, 15000), getRandomInt(9000, 15000), getRandomInt(9000, 15000)]
trendPlot[1][1] = [getRandomInt(9000, 15000), getRandomInt(9000, 15000), getRandomInt(9000, 15000)]
trendPlot[2][1] = [getRandomInt(9000, 15000), getRandomInt(9000, 15000), getRandomInt(9000, 15000)]
trendPlot[3][1] = [getRandomInt(9000, 15000), getRandomInt(9000, 15000), getRandomInt(9000, 15000)]


trendPillar(null, trendPlot);