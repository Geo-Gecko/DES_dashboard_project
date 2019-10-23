function loadStats() {
    ake();
}

$(document).ready(function() {
    ake('central')
});

function ake(regionName) {
    //let e = document.getElementById("sel");

    let value = regionName ? regionName : 'central';

    //called for district details
    axios.get(`/nationalDetails-stats/${value}`)
        .then(function(response) {
            // handle success
            //console.log(response.data);

            let data = response.data;
            let region = data.region;
            let totalSchoolsData = data.school[0];
            let totalBoysData = data.Boys[0];
            let totalGrilsData = data.Grils[0];
            let totalInspectionData = data.Inspection[0];
            let max_inspectionData = data.Max_inspection[0];



            $('#regiondetails').html("<table>" +
                "<tr><td>Region:</td><td>" + region + "</td><tr>" +
                "<tr><td>Number of Boys:</td><td>" + totalBoysData + "</td><tr>" +
                "<tr><td>Number of Girls:</td><td>" + totalGrilsData + "</td><tr>" +
                "<tr><td>Total Number of Schools:</td><td>" + totalSchoolsData + "</td><tr>" +
                "<tr><td>Total Number of Inspections:</td><td>" + totalInspectionData + "</td><tr>" +
                "<tr><td>Latest Inspections:</td><td>" + max_inspectionData + "</td><tr>" + "</table>")

        })
        .catch(function(error) {
            // handle error
            //console.log(error);
        })
        .finally(function() {
            // always executed
        });

    // Called for chart_enrolment for each region
    axios.get(`/nationalEnrolment-stats/${value}`)
        .then(function(response) {
            // handle success
            /// console.log(response.data);

            let data = response.data;
            let region = data.region;
            let boysPlot = JSON.parse(data.boys).map(myFunction);
            let girlsPlot = JSON.parse(data.girls).map(myFunction);

            // call the chart function
            // chart_enrolment_region(region, girlsPlot, boysPlot);
            dataCollection('enrollment', region, boysPlot, girlsPlot);
        })
        .catch(function(error) {
            // handle error
            //console.log(error);
        })
        .finally(function() {
            // always executed
        });


    // Called for chart_attendance for each region 
    axios.get(`/nationalAttendance-stats/${value}`)
        .then(function(response) {
            // handle success
            //console.log(response.data);

            let data = response.data;
            let region = data.region;
            let boysPlot = JSON.parse(data.boys).map(myFunction);
            let girlsPlot = JSON.parse(data.girls).map(myFunction);


            // call the chart function
            chart_attendance_region(region, boysPlot, girlsPlot);

            dataCollection('attendence', region, boysPlot, girlsPlot);
        })
        .catch(function(error) {
            // handle error
            //console.log(error);
        })
        .finally(function() {
            // always executed
        });

    // Called for teacher pupil ratio for each district 
    axios.get(`/nationalTPR-stats/${value}`)
        .then(function(response) {
            // handle success
            //console.log(response.data);

            let data = response.data;
            let region = data.region;
            let p1top3Plot = JSON.parse(data.p1top3).map(myFunction);
            let p4top7Plot = JSON.parse(data.p4top7).map(myFunction);

            // call the chart function
            ratio_teach_region(region, p1top3Plot, p4top7Plot);
        })
        .catch(function(error) {
            // handle error
            //console.log(error);
        })
        .finally(function() {
            // always executed
        });

    //called for stance pupil ratio for region
    axios.get(`/nationalSPR-stats/${value}`)
        .then(function(response) {
            // handle success
            // console.log(response.data);

            let data = response.data;
            let region = data.region;
            let sprboysPlot = JSON.parse(data.sprboys).map(myFunction);
            let sprgirlsPlot = JSON.parse(data.sprgirls).map(myFunction);
            let sprovrallPlot = JSON.parse(data.sproverall).map(myFunction);

            // call the chart function
            stance_ratio_region(region, sprboysPlot, sprgirlsPlot, sprovrallPlot);
        })
        .catch(function(error) {
            // handle error
            console.log(error);
        })
        .finally(function() {
            // always executed
        });

    //called for classroom pupil ratio for region
    axios.get(`/nationalCPR-stats/${value}`)
        .then(function(response) {
            // handle success
            // console.log(response.data);

            let data = response.data;
            let region = data.region;
            let cp1top3Plot = JSON.parse(data.cp1top3).map(myFunction);
            let cp4top7Plot = JSON.parse(data.cp4top7).map(myFunction);

            // call the chart function
            class_ratio_region(region, cp1top3Plot, cp4top7Plot);
        })
        .catch(function(error) {
            // handle error
            console.log(error);
        })
        .finally(function() {
            // always executed
        });


    //chartpillars for district 
    axios.get(`/nationalPillars-stats/${value}`)
        .then(function(response) {
            // handle success

            let data = response.data;
            let region = data.region;
            // let pillarOne = data.regionConditionalPlot[0];
            // let pillarTwo = data.regionConditionalPlot[1];
            // let pillarThree = data.regionConditionalPlot[2];
            // let pillarFour = data.regionConditionalPlot[3];

            
            function generateAverage(array) {
                var sum = 0;
                for (var i = 0; i < array.length; i++) {
                    if (array[i]) {
                        sum += parseInt(array[i], 10); //don't forget to add the base
                    }
                }

                var avg = sum / array.length;
                return avg;
            }
            // let pillarSummary = [generateAverage(pillarOne), generateAverage(pillarTwo), generateAverage(pillarThree), generateAverage(pillarFour)]


            // console.log(data)

            // let regionConditionalPlot = data.regionConditionalPlot;
            // console.log(conditionalPlot);
            // let girlsPlot = JSON.parse(data.girls).map(myFunction);
            chartPillarRegion(region)//, pillarOne, pillarTwo, pillarThree, pillarFour, pillarSummary);

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


function generateSum(array) {
    var sum = 0;
    for (var i = 0; i < array.length; i++) {
        if (array[i]) {
            sum += parseInt(array[i], 10); //don't forget to add the base
        }
    }
    return sum;
}

var data = {
    "attendance": { values: [] },
    "enrollment": { values: [] }
};

function dataCollection(type, region, boysPlot, girlsPlot) {

    if (type === 'attendence') {
        data.attendance.values = [generateSum(boysPlot), generateSum(girlsPlot)]
    }
    else {
        data.enrollment.values = [generateSum(boysPlot), generateSum(girlsPlot)]
    }
    if (data.attendance.values.length === 2 && data.enrollment.values.length === 2) {
        chart_enrolment_region(region, data);
    }
}

var myEnrolChart, myAttendChart, teacherRatio, StanceRatio, ClassroomRatio, myPillarChart;

//all the chart for the region below 
function chart_enrolment_region(region, data) {
    if (myEnrolChart) {
        myEnrolChart.destroy();
    }
    var ctxx = document.getElementById("enroloment_region").getContext("2d");
    myEnrolChart = new Chart(ctxx, {
        type: 'bar',
        data: {
            labels: [
                "Enrolment",
                "Attendence"
            ],
            datasets: [
                {
                    label: "Boys",
                    backgroundColor: "lightblue",
                    borderColor: "blue",
                    borderWidth: 1,
                    data: [data.enrollment.values[0], data.attendance.values[0]]
                },
                {
                    label: "Girls",
                    backgroundColor: "pink",
                    borderColor: "red",
                    borderWidth: 1,
                    data: [data.enrollment.values[1], data.attendance.values[1]]
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
                text: region
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
function chart_attendance_region(region, girlsPlot, boysPlot) {
    if (myAttendChart) {
        myAttendChart.destroy();
    }
    var ctxx = document.getElementById("attendence_region").getContext("2d");
    myAttendChart = new Chart(ctxx, {
        type: 'line',
        data: {
            labels: [["First Term", ['2017']], ["Second Term", ['2017']], ["Third Term", ['2017']], ["First Term", ['2018']], ["Second Term", ['2018']], ["Third Term", ['2018']]],
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
                text: region
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



//teacher to pupils ratio for the region
function ratio_teach_region(region, p1top3Plot, p4top7Plot) {
    if (teacherRatio) {
        teacherRatio.destroy();
    }

    var config = {
        type: 'bar',
        data: {
            datasets: [{
                data: [1 / p1top3Plot, 100 / p4top7Plot, 1 / 53],
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
        }, options: {
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

    var ctx = document.getElementById("region_1").getContext("2d");
    teacherRatio = new Chart(ctx, config);

}




//stance to pupils ratio for region
function stance_ratio_region(region, sprboysPlot, sprgirlsPlot, sprovrallPlot) {
    // var randomColorFactor = function () {
    //     return Math.round(Math.random() * 255);
    // };
    if (StanceRatio) {
        StanceRatio.destroy();
    }

    var config = {
        type: 'bar',
        data: {
            datasets: [{
                data: [1 / sprboysPlot, 100 / sprgirlsPlot, 1 / 40],
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


    var ctx = document.getElementById("region_2").getContext("2d");
    StanceRatio = new Chart(ctx, config);

}


//classroom to pupils ratio chart for district 
function class_ratio_region(region, cp1top3Plot, cp4top7Plot) {
    // var randomColorFactor = function () {
    //     return Math.round(Math.random() * 255);
    // };
    if (ClassroomRatio) {
        ClassroomRatio.destroy();
    }

    var config = {
        type: 'bar',
        data: {
            datasets: [{
                data: [1 / cp1top3Plot, 1 / cp4top7Plot, 1 / 53],
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
            display: false,
            // text: district
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

    var ctx = document.getElementById("region_3").getContext("2d");
    ClassroomRatio = new Chart(ctx, config);
}



function chartPillarRegion(region, regionConditionalPlot) {
    if (myPillarChart) {
        myPillarChart.destroy();
    }

    var trendPlot = [[], [], [], []];

    trendPlot[0][0] = [getRandomInt(1, 4), getRandomInt(1, 4), getRandomInt(1, 4), getRandomInt(1, 4), getRandomInt(1, 4), getRandomInt(1, 4)]
    trendPlot[0][1] = [getRandomInt(1, 4), getRandomInt(1, 4), getRandomInt(1, 4), getRandomInt(1, 4), getRandomInt(1, 4), getRandomInt(1, 4)]
    trendPlot[0][2] = [getRandomInt(1, 4), getRandomInt(1, 4), getRandomInt(1, 4), getRandomInt(1, 4), getRandomInt(1, 4), getRandomInt(1, 4)]
    trendPlot[0][3] = [getRandomInt(1, 4), getRandomInt(1, 4), getRandomInt(1, 4), getRandomInt(1, 4), getRandomInt(1, 4), getRandomInt(1, 4)]
    trendPlot[0][4] = [getRandomInt(1, 4), getRandomInt(1, 4), getRandomInt(1, 4), getRandomInt(1, 4), getRandomInt(1, 4), getRandomInt(1, 4)]


    trendPillar(null, trendPlot);


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
                    fontSize: 11,
                    autoSkip: false,
                    maxRotation: 0,
                    minRotation: 0
                },
                scaleLabel: {
                    display: true
                },
                gridLines: {
                    display: true
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
                    fontSize: 0
                },
                stacked: true
            }]
        },
        legend: {
            display: true,
            position: "bottom",
            labels: {
                // fontColor: '#FFA500'
                filter: function (item, chart) {
                    // Logic to remove a particular legend item goes here
                    return !item.text.includes('hide');
                }
            }
        }
    };

    var ctx = document.getElementById("region_pillars");
    myPillarChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [["Pillar 1:", "Learning Environment"], ["Pillar 2:", "School Management", "and HT Performance"], ["Pillar 3:", "Effectiveness of", "Teaching and Learning"], ["Pillar 4:", "Involvement of", "Parents and", "Community"]],

            datasets: [
                {
                    label: '25% - 40%',
                    data: [getRandomInt(10, 25), getRandomInt(10, 25), getRandomInt(10, 25), getRandomInt(10, 25)],
                    backgroundColor: "#FF0000"
                }, {
                    label: '41% - 60%',
                    data: [getRandomInt(10, 25), getRandomInt(10, 25), getRandomInt(10, 25), getRandomInt(10, 25)],
                    backgroundColor: "#FFA500"
                }, {
                    label: '61% - 80%',
                    data: [getRandomInt(10, 25), getRandomInt(10, 25), getRandomInt(10, 25), getRandomInt(10, 25)],
                    backgroundColor: "#FFFF00"
                }, {
                    label: '81% - 100%',
                    data: [getRandomInt(10, 25), getRandomInt(10, 25), getRandomInt(10, 25), getRandomInt(10, 25)],
                    backgroundColor: "#008000"
                }]
        },
        options: barOptions_stacked,
    });

    $(document).on('change', '#region', function() {

        var colourChanged = [];

        if ($(this).val() === "0") {
            myPillarChart.data.labels = [["1.Condition of", "school building"], ["2.Classroom", "infrastucture"], ["3.Sanitary", "facilities"], "4.Timetabling", ["5.Teacher", "deployment"], ["6.Disciplinary", "policy"], ["7.Inclusive school", "practice"], ["8.Gender", "Sensitive School"]]
            myPillarChart.data.labels.forEach(function (d, i) {
                myPillarChart.data.datasets[0].data = [getRandomInt(10, 25),getRandomInt(10, 25),getRandomInt(10, 25),getRandomInt(10, 25),getRandomInt(10, 25),getRandomInt(10, 25),getRandomInt(10, 25),getRandomInt(10, 25)]
                myPillarChart.data.datasets[1].data = [getRandomInt(10, 25),getRandomInt(10, 25),getRandomInt(10, 25),getRandomInt(10, 25),getRandomInt(10, 25),getRandomInt(10, 25),getRandomInt(10, 25),getRandomInt(10, 25)]
                myPillarChart.data.datasets[2].data = [getRandomInt(10, 25),getRandomInt(10, 25),getRandomInt(10, 25),getRandomInt(10, 25),getRandomInt(10, 25),getRandomInt(10, 25),getRandomInt(10, 25),getRandomInt(10, 25)]
                myPillarChart.data.datasets[3].data = [getRandomInt(10, 25),getRandomInt(10, 25),getRandomInt(10, 25),getRandomInt(10, 25),getRandomInt(10, 25),getRandomInt(10, 25),getRandomInt(10, 25),getRandomInt(10, 25)]
                // myPillarChart.data.datasets[i].data
            })
        } else if ($(this).val() === "1") {
            myPillarChart.data.labels = ["1.Teacher and pupil attendance", "2.School Improvement plan", "3.SIP activities", "4.Financial management", ["5.Systematic monitoring and", "evaluation of teacher performance"], "6.Continuous professional development", "7.Systematic monitoring of pupil performance"]
            myPillarChart.data.labels.forEach(function (d, i) {
                myPillarChart.data.datasets[0].data = [getRandomInt(10, 25),getRandomInt(10, 25),getRandomInt(10, 25),getRandomInt(10, 25),getRandomInt(10, 25),getRandomInt(10, 25),getRandomInt(10, 25)]
                myPillarChart.data.datasets[1].data = [getRandomInt(10, 25),getRandomInt(10, 25),getRandomInt(10, 25),getRandomInt(10, 25),getRandomInt(10, 25),getRandomInt(10, 25),getRandomInt(10, 25)]
                myPillarChart.data.datasets[2].data = [getRandomInt(10, 25),getRandomInt(10, 25),getRandomInt(10, 25),getRandomInt(10, 25),getRandomInt(10, 25),getRandomInt(10, 25),getRandomInt(10, 25)]
                myPillarChart.data.datasets[3].data = [getRandomInt(10, 25),getRandomInt(10, 25),getRandomInt(10, 25),getRandomInt(10, 25),getRandomInt(10, 25),getRandomInt(10, 25),getRandomInt(10, 25)]
            })
        } else if ($(this).val() === "2") {
            myPillarChart.data.labels = ["1.Lesson planning", "2,Lesson delivery", "3.Teaching and learning materials", "4.Learner particiption", "5,Learning", "6.Teachers' rapport with learners", "7.Classroom environment", "8.Pupils' work"]
            myPillarChart.data.labels.forEach(function (d, i) {
                myPillarChart.data.datasets[0].data = [getRandomInt(10, 25),getRandomInt(10, 25),getRandomInt(10, 25),getRandomInt(10, 25),getRandomInt(10, 25),getRandomInt(10, 25),getRandomInt(10, 25),getRandomInt(10, 25)]
                myPillarChart.data.datasets[1].data = [getRandomInt(10, 25),getRandomInt(10, 25),getRandomInt(10, 25),getRandomInt(10, 25),getRandomInt(10, 25),getRandomInt(10, 25),getRandomInt(10, 25),getRandomInt(10, 25)]
                myPillarChart.data.datasets[2].data = [getRandomInt(10, 25),getRandomInt(10, 25),getRandomInt(10, 25),getRandomInt(10, 25),getRandomInt(10, 25),getRandomInt(10, 25),getRandomInt(10, 25),getRandomInt(10, 25)]
                myPillarChart.data.datasets[3].data = [getRandomInt(10, 25),getRandomInt(10, 25),getRandomInt(10, 25),getRandomInt(10, 25),getRandomInt(10, 25),getRandomInt(10, 25),getRandomInt(10, 25),getRandomInt(10, 25)]
            })
        } else if ($(this).val() === "3") {
            myPillarChart.data.labels = ["1. School management committee", ["2. School communication", "ith parents/community"], "3. Teacher communication with parents", "4. Involvement of parents"]
            myPillarChart.data.labels.forEach(function (d, i) {
                myPillarChart.data.datasets[0].data = [getRandomInt(10, 25),getRandomInt(10, 25),getRandomInt(10, 25),getRandomInt(10, 25)]
                myPillarChart.data.datasets[1].data = [getRandomInt(10, 25),getRandomInt(10, 25),getRandomInt(10, 25),getRandomInt(10, 25)]
                myPillarChart.data.datasets[2].data = [getRandomInt(10, 25),getRandomInt(10, 25),getRandomInt(10, 25),getRandomInt(10, 25)]
                myPillarChart.data.datasets[3].data = [getRandomInt(10, 25),getRandomInt(10, 25),getRandomInt(10, 25),getRandomInt(10, 25)]
            })
        } else if ($(this).val() === "4") {
            myPillarChart.data.labels = [["Pillar 1:", "Learning Environment"], ["Pillar 2:", "School Management", "and HT Performance"], ["Pillar 3:", "Effectiveness of", "Teaching and Learning"], ["Pillar 4:", "Involvement of", "Parents and", "Community"]]
            myPillarChart.data.labels.forEach(function (d, i) {
                myPillarChart.data.datasets[0].data = [getRandomInt(10, 25),getRandomInt(10, 25),getRandomInt(10, 25),getRandomInt(10, 25)]
                myPillarChart.data.datasets[1].data = [getRandomInt(10, 25),getRandomInt(10, 25),getRandomInt(10, 25),getRandomInt(10, 25)]
                myPillarChart.data.datasets[2].data = [getRandomInt(10, 25),getRandomInt(10, 25),getRandomInt(10, 25),getRandomInt(10, 25)]
                myPillarChart.data.datasets[3].data = [getRandomInt(10, 25),getRandomInt(10, 25),getRandomInt(10, 25),getRandomInt(10, 25)]
            })
        }

        // console.log(districtConditionalPlot)

        // myPillarChart.data.datasets[0].backgroundColor = colourChanged;
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
    var trendChart = new Chart(document.getElementById("region_lineChart"), {
        type: 'line',
        data: {
            labels: [["First Term", ['2017']], ["Second Term", ['2017']], ["Third Term", ['2017']], ["First Term", ['2018']], ["Second Term", ['2018']], ["Third Term", ['2018']]],
            datasets: [{
                data: trendPlot[0][4],
                lineTension: 0,
                label: "Pillar Summary",
                borderColor: "rgb(242,101,34)",
                fill: false
            }
                , {
                data: [1, 4],
                label: "hide",
                borderColor: "rgb(255,255,255)",
                fill: false
            }
            ]
        },
        options: {
            title: {
                display: true,
                text: ''
            },
            scales: {
                xAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Period'
                    }
                }],
                yAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Grade'
                    },
                    ticks: {
                        min: 0,
                        max: 5,
                        stepSize: 1,
                        suggestedMin: 0.5,
                        suggestedMax: 5.5,
                        callback: function (label, index, labels) {
                            switch (label) {
                                case 0:
                                    return '';
                                case 1:
                                    return 'D';
                                case 2:
                                    return 'C';
                                case 3:
                                    return 'B';
                                case 4:
                                    return 'A';
                                case 5:
                                    return '';
                            }
                        }
                    },
                    gridLines: {
                        display: true
                    }
                }]
            },
            legend: {
                display: true,
                position: "bottom",
                labels: {
                    // fontColor: '#FFA500'
                    filter: function (item, chart) {
                        // Logic to remove a particular legend item goes here
                        return !item.text.includes('hide');
                    }
                }
            }
        }
    });

    $(document).on('change', '#pillarsTrend', function () {
        // console.log($(this).val());
        // Does some stuff and logs the event to the console



        if ($(this).val() === "0") {
            trendChart.data.datasets[0].data = trendPlot[0][0]
            trendChart.data.datasets[0].label = "Pillar 1"
        } else if ($(this).val() === "1") {
            trendChart.data.datasets[0].data = trendPlot[0][1]
            trendChart.data.datasets[0].label = "Pillar 2"

        } else if ($(this).val() === "2") {
            trendChart.data.datasets[0].data = trendPlot[0][2]
            trendChart.data.datasets[0].label = "Pillar 3"

        } else if ($(this).val() === "3") {
            trendChart.data.datasets[0].data = trendPlot[0][3]
            trendChart.data.datasets[0].label = "Pillar 4"

        } else if ($(this).val() === "4") {
            trendChart.data.datasets[0].data = trendPlot[0][4]
            trendChart.data.datasets[0].label = "Pillar Summary"

        }

        trendChart.update();


    });

}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
