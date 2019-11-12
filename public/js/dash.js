// Called when page is first loaded
function loadStats() {
    ake();
}

function ake(nameOfSchool) {
    //let e = document.getElementById("sel");


    let value = nameOfSchool ? nameOfSchool : 'Adranga P.S';


    // Called to get enrollment for each school
    axios.get(`/attend-enrol-trend/${value}`)
        .then(function (response) {
            // handle success
            console.log(response);
            let data = response.data;
            let school = data.school;
            let boysPlotEnrol = data.boysEnrol;
            let girlsPlotEnrol = data.girlsEnrol;
            let boysPlotAttend = data.boysAttend;
            let girlsPlotAttend = data.girlsAttend;
            let inspectionPlot = data.inspectPlot;
    
        
            attend_enrol_trend(school, boysPlotEnrol, girlsPlotEnrol, boysPlotAttend, girlsPlotAttend, inspectionPlot);
           
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
    
            let data = response.data;
            let school = data.School;
            let boysPlotEnrol = data.boysEnrol;
            let girlsPlotEnrol = data.girlsEnrol;
            let boysPlotAttend = data.boysAttend;
            let girlsPlotAttend = data.girlsAttend;

            console.log(girlsPlotAttend, boysPlotEnrol);


            // call the chart function
          //  chart_attendance(Emis, boysPlot, girlsPlot);

            char_enrollment(school, boysPlotEnrol,  girlsPlotEnrol, boysPlotAttend, boysPlotAttend);
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
            //console.log(response.data);

            let data = response.data;
            let school = data.school;
            let p1top3Plot = JSON.parse(data.p1top3).map(myFunction);
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
            //console.log(response.data);

            let data = response.data;
            let school = data.school;
            let cp1top3Plot = JSON.parse(data.cp1top3).map(myFunction);
            let cp4top7Plot = JSON.parse(data.cp4top7).map(myFunction);

            // call the chart function
            class_ratio(school, cp1top3Plot, cp4top7Plot);
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
            //console.log(response.data);

            let data = response.data;
            let school = data.school;
            let sprboysPlot = JSON.parse(data.sprboys).map(myFunction);
            let sprgirlsPlot = JSON.parse(data.sprgirls).map(myFunction);
            let sprovrallPlot = JSON.parse(data.sproverall).map(myFunction);

            // call the chart function
            stance_ratio(school, sprboysPlot, sprgirlsPlot, sprovrallPlot);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            // always executed
        });

    //chartpillars Paul 
    axios.get(`/chartPiller-stats/${value}`)
        .then(function (response) {
            // handle success
            //    console.log(response.data);

            let data = response.data;
            let school = data.school;
            let pillarOne = data.pillar1;
            let pillarTwo = data.pillar2;
            let pillarThree = data.pillar3;
            let pillarFour = data.pillar4;

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
            let pillarSummary = [generateAverage(pillarOne), generateAverage(pillarTwo), generateAverage(pillarThree), generateAverage(pillarFour)]

            chartPillar(school, pillarOne, pillarTwo, pillarThree, pillarFour, pillarSummary);

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
            //console.log(response.data);

            let data = response.data;
            let school = data.school;
            let distinctData = data.district[0];
            let countyData = data.county[0];
            let subcountyData = data.subcounty[0];
            let parishData = data.parish[0];
            let emisData = data.emisNumber[0];
            let regionData = data.region[0];
            let inspectionData = data.inspection[0];
            let max_inspectionData = data.max_inspection[0];

            $('#schooldetails').html("<table>" +
                "<tr><td>School:</td><td>" + school + "</td><tr>" +
                "<tr><td>District:</td><td>" + distinctData + "</td><tr>" +
                "<tr><td>County/Municipality:</td><td>" + countyData + "</td><tr>" +
                "<tr><td>Sub-County/Division:</td><td>" + subcountyData + "</td><tr>" +
                "<tr><td>Parish/Ward:</td><td>" + parishData + "</td><tr>" +
                "<tr><td>EMIS CODE:</td><td>" + emisData + "</td><tr>" +
                "<tr><td>Region:</td><td>" + regionData + "</td><tr>" +
                "<tr><td>No. of Inspections:</td><td>" + inspectionData + "</td><tr>" +
                "<tr><td>Latest Inspections:</td><td>" + max_inspectionData + "</td><tr>" + "</table>")

        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            // always executed
        });


         // Called to get teacher stats for each school
    axios.get(`/teacher-stats/${value}`)
    .then(function (response) {
        // handle success
        console.log(response);
        let data = response.data;
        let school = data.school[0];
        let enrol = data.enrol[0];
        let staff = data.staff[0];
        let attend = data.attend[0];
        let timetable = data.timetable[0];

        // call the chart function
        // char_enrollment(school, boysPlot, girlsPlot);

        teacherStats(school, enrol, staff, attend, timetable );

        // chart_attendance(school);
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

var data = {
    "attendance": { values: [] },
    "enrollment": { values: [] }
};


//charts
var myEnrolChart, myAttendChart, teacherRatio, StanceRatio, ClassroomRatio, myPillarChart;

function char_enrollment(school, boysPlotEnrol,  girlsPlotEnrol, boysPlotAttend, girlsPlotAttend) {
    if (myEnrolChart) {
        myEnrolChart.destroy();
    }

    var ctxx = document.getElementById("mySuperChart").getContext("2d");
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
                    data: [boysPlotEnrol, boysPlotAttend]
                },
                {
                    label: "Girls",
                    backgroundColor: "pink",
                    borderColor: "red",
                    borderWidth: 1,
                    data: [girlsPlotAttend, girlsPlotAttend]
                }
            ]
        },
        options: {
            responsive: true,
            legend: {
                position: "top"
            },
            title: {
                display: false,
                text: school
            },
            scales: {
                xAxes: [{ stacked: false }],
                yAxes: [{
                    stacked: false,
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}


function attend_enrol_trend(school, boysPlotEnrol, girlsPlotEnrol, boysPlotAttend, girlsPlotAttend, inspectionPlot) {
    if (myAttendChart) {
        myAttendChart.destroy();
    }
    var ctxx = document.getElementById("chart_attendance").getContext("2d");
    myAttendChart = new Chart(ctxx, {
        type: 'line',
        data: {
            labels: [["First Term", ['2017']], ["Second Term", ['2017']], ["Third Term", ['2017']], ["First Term", ['2018']], ["Second Term", ['2018']], ["Third Term", ['2018']]],
            datasets: [
                {
                    label: "Enrolment",
                    backgroundColor: "rgba(255,10,13,0.1)",
                    borderColor: "red",
                    fillOpacity: .3,
                    fill: true,
                    borderWidth: 1,
                    data: [boysPlotEnrol, girlsPlotEnrol]
                },
                {
                    label: "Attendence",
                    backgroundColor: "lightblue",
                    borderColor: "blue",
                    borderWidth: 1,
                    lineTension: 0,
                    data: boysPlotAttend
                }

            ],
            datasets: [
                {
                    label: "Enrolment",
                    backgroundColor: "rgba(255,10,13,0.1)",
                    borderColor: "red",
                    fillOpacity: .3,
                    fill: true,
                    borderWidth: 1,
                    data: girlsPlotEnrol
                },
                {
                    label: "Attendence",
                    backgroundColor: "lightblue",
                    borderColor: "blue",
                    borderWidth: 1,
                    lineTension: 0,
                    data: girlsPlotAttend
                }

            ]
        },
        options: {
            responsive: true,
            legend: {
                position: "top"
            },
            title: {
                display: false,
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
function ratio_teach(school, p1top3Plot, p4top7Plot) {
    if (teacherRatio) {
        teacherRatio.destroy();
    }
    // var randomColorFactor = function () {
    //     return Math.round(Math.random() * 255);
    // };

    var config = {
        type: 'bar',
        data: {
            datasets: [{
                data: [p1top3Plot,  p4top7Plot, 53],
                backgroundColor: [
                    "rgb(38,34,98)",
                    "rgb(38,34,98)",
                    "rgb(38,34,98)"
                ],
                // borderColor:[
                //     "red",
                //     "blue"
                // ],
            }],
            labels: [
                "P1-P3",
                "P4-P7 ",
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
                        labelString: 'TPR'
                    },
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }

        }

    };

    var ctx = document.getElementById("chart-area").getContext("2d");
    teacherRatio = new Chart(ctx, config);

}

//stance to pupils ratio
function stance_ratio(school, sprboysPlot, sprgirlsPlot, sprovrallPlot) {
    if (StanceRatio) {
        StanceRatio.destroy();
    }

    var config = {
        type: 'bar',
        data: {
            datasets: [{
                data: [sprboysPlot,  sprgirlsPlot, 40],
                backgroundColor: [
                    "rgb(38,34,98)",
                    "rgb(38,34,98)",
                    "rgb(38,34,98)"
                ],
            }],
            labels: [
                "P1-P3",
                "P4-P7 ",
                "National"
            ]
        },
        options: {
            responsive: true,
            legend: {
                display: false,
            }
            ,
            scales: {
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'SPR'
                    },
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }

        }
    };

    var ctx = document.getElementById("nasted2").getContext("2d");
    StanceRatio = new Chart(ctx, config);

}




//classroom to pupils ratio chart 
function class_ratio(school, cp1top3Plot, cp4top7Plot) {
    if (ClassroomRatio) {
        ClassroomRatio.destroy();
    }

    var config = {
        type: 'bar',
        data: {
            datasets: [{
                data: [ cp1top3Plot, cp4top7Plot,  53],

                backgroundColor: [
                    "rgb(38,34,98)",
                    "rgb(38,34,98)",
                    "rgb(38,34,98)"
                ],
            }],
            labels: [
                "P1-P3",
                "P4-P7 ",
                "National"
            ]
        },
        title: {
            display: true,
            text: school
        },
        options: {
            responsive: true,
            legend: {
                display: false,
            },
            scales: {
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'CPR'
                    },
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }

        }
    };

    var ctx = document.getElementById("nasted3").getContext("2d");
    ClassroomRatio = new Chart(ctx, config);
}


function chartPillar(school, pillarOne, pillarTwo, pillarThree, pillarFour, pillarSummary) {
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
                filter: function (item, chart) {
                    // Logic to remove a particular legend item goes here
                    return !item.text.includes('hide');
                }
            }
        }
    };

    function colourPicker(d) {
        if (d === 4) {
            return "#008000"
        } else if (d === 3) {
            return "#FFFF00"
        } else if (d === 2) {
            return "#FFA500"
        } else if (d === 1) {
            return "#FF0000"
        }
    }

    var chosenColours = [];
    pillarSummary.forEach(function (d, i) {
        chosenColours.push(colourPicker(parseInt(d)));
    })


    var ctx = document.getElementById("mypillars");
    myPillarChart = new Chart(ctx, {
        type: 'horizontalBar',
        data: {
            labels: [["Pillar 1:", "Learning Environment"], ["Pillar 2:", "School Management and HT Performance"], ["Pillar 3:", "Effectiveness of Teaching and Learning"], ["Pillar 4:", "Involvement of Parents and Community"]],

            datasets: [{
                label: 'hide',
                data: [1, 1, 1, 1, 1, 1, 1, 1],
                backgroundColor: chosenColours,
            }, {
                label: '25% - 40%',
                backgroundColor: "#FF0000"
            }, {
                label: '41% - 60%',
                backgroundColor: "#FFA500"
            }, {
                label: '61% - 80%',
                backgroundColor: "#FFFF00"
            }, {
                label: '81% - 100%',
                backgroundColor: "#008000"
            }]
        },
        options: barOptions_stacked,
    });

    // console.log($('#pillars'));

    $(document).on('change', '#pillars', function () {
        // console.log($(this).val());
        // Does some stuff and logs the event to the console


        var colourChanged = [];

        if ($(this).val() === "1") {
            myPillarChart.data.labels = ["1.Condition of school building", "2.Classroom infrastucture", "3.Sanitary facilities", "4.Timetabling", "5.Teacher deployment", "6.Disciplinary policy", "7.Inclusive school practice", "8.Gender Sensitive School"]
            pillarOne.forEach(function (d, i) {
                colourChanged.push(colourPicker(parseInt(d)));
            })
        } else if ($(this).val() === "2") {
            myPillarChart.data.labels = ["1.Teacher and pupil attendance", "2.School Improvement plan", "3.SIP activities", "4.Financial management", ["5.Systematic monitoring and", "evaluation of teacher performance"], "6.Continuous professional development", "7.Systematic monitoring of pupil performance"]
            pillarTwo.forEach(function (d, i) {
                colourChanged.push(colourPicker(parseInt(d)));
            })
        } else if ($(this).val() === "3") {
            myPillarChart.data.labels = ["1.Lesson planning", "2,Lesson delivery", "3.Teaching and learning materials", "4.Learner particiption", "5,Learning", "6.Teachers' rapport with learners", "7.Classroom environment", "8.Pupils' work"]
            pillarThree.forEach(function (d, i) {
                colourChanged.push(colourPicker(parseInt(d)));
            })
        } else if ($(this).val() === "4") {
            myPillarChart.data.labels = ["1. School management committee", ["2. School communication", "ith parents/community"], "3. Teacher communication with parents", "4. Involvement of parents"]
            pillarFour.forEach(function (d, i) {
                colourChanged.push(colourPicker(parseInt(d)));
            })
        } else if ($(this).val() === "5") {
            myPillarChart.data.labels = [["Pillar 1:", "Learning Environment"], ["Pillar 2:", "School Management and HT Performance"], ["Pillar 3:", "Effectiveness of Teaching and Learning"], ["Pillar 4:", "Involvement of Parents and Community"]]
            pillarSummary.forEach(function (d, i) {
                colourChanged.push(colourPicker(parseInt(d)));
            })
        }

        myPillarChart.data.datasets[0].backgroundColor = colourChanged;
        myPillarChart.update();


    });

    // this part to make the tooltip only active on your real dataset
    var originalGetElementAtEvent = myPillarChart.getElementAtEvent;
    myPillarChart.getElementAtEvent = function (e) {
        return originalGetElementAtEvent.apply(this, arguments).filter(function (e) {
            return e._datasetIndex === 1;
        });
    }


}


//d3 charts with dimple.js
function trendPillar(school, trendPlot) {
    if (trendChart) {
        trendChart.destroy();
    }
    var trendChart = new Chart(document.getElementById("line-chart"), {
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

// Teacher stats plot
function teacherStats(school, enrol, staff, attend, timetable ) {

var ctxx = document.getElementById("TeacherChart").getContext("2d");
    var myChart = new Chart(ctxx, {
        type: 'bar',
        data: {
            labels: [
                ["Established staffting"," as per enrolment"],
                [ "Current","staffting"," level"],
                [ "Staff attendance"," on visit day"],
                ["Number of classes"," taught according"," to timetable"],
            ],
            datasets: [
                {
                    label: "",
                    backgroundColor:  "rgb(38,34,98)",
                    borderColor:  "rgb(38,34,98)",
                    borderWidth: 1,
                    data: [enrol, staff, attend, timetable]
                }
            ]
        },
        options: {
            responsive: true,
            legend: {
                position: "top",
                display: false
            },
            title: {
                display: false,
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