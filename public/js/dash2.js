function loadStats() {
    ake();
}

$(document).ready(function () {
    ake('Adjumani')
});

function ake(districtName) {
    //let e = document.getElementById("sel");

    console.log(districtName)

    let value = districtName ? districtName : 'Adjumani';


    //called for district details
    axios.get(`/districtdetails-stats/${value}`)
        .then(function (response) {
            // handle success
            // console.log(response.data);

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
              // "<tr><td>Latest Inspections:</td><td>" + max_inspectionData + "</td><tr>" 
               "</table>")

        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            // always executed
        });


    // Called for chart_attendance for each district 
    axios.get(`/districtattendance-stats/${value}`)
        .then(function (response) {
            // handle success
            

            let data = response.data;
            let district = data.district;
            let boysPlotAttend =data.boysAttend;
            let girlsPlotAttend = data.girlsAttend;
            let boysPlotEnrol = data.boysEnrol;
            let girlsPlotEnrol = data.girlsEnrol;
           // console.log(girlsPlotEnrol);
                 

            // call the chart function
            chart_attendance_enrolment_district(district,boysPlotAttend, girlsPlotAttend, boysPlotEnrol, girlsPlotEnrol);
          

            // dataCollection(district,boysPlotAttend, girlsPlotAttend, boysPlotEnrol, girlsPlotEnrol );
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            // always executed
        });

    // // Called for chart_enrolment for each district 
    // axios.get(`/districtenrolment-stats/${value}`)
    //     .then(function (response) {
    //         // handle success
    //         //console.log(response.data);

    //         let data = response.data;
    //         let district = data.district;
    //         let boysPlot = data.boys;
    //         let girlsPlot = data.girls;

    //         // call the chart function
    //         chart_attendance_district(district, boysPlot, girlsPlot);

    //         // dataCollection('enrollment', district, boysPlot, girlsPlot);
    //     })
    //     .catch(function (error) {
    //         // handle error
    //         console.log(error);
    //     })
    //     .finally(function () {
    //         // always executed
    //     });

           // Called for district attendance and enrolment stats for each district 
    axios.get(`/districttrend-stats/${value}`)
    .then(function (response) {
        // handle success
     

        let data = response.data;
        let district = data.district;
        let enrolPlot = data.enrol;
        let attendPlot = data.attend;
        let inspectionPlot = data.inspection;
        console.log( 'inspectionPlot', inspectionPlot);

        // call the chart function
        chart_attendance_enrolment_Trend_district(district,enrolPlot, attendPlot,inspectionPlot);

        // dataCollection('enrollment', district, boysPlot, girlsPlot);
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    })
    .finally(function () {
        // always executed
    });

    // Called for teacher pupil ratio for each district 
    axios.get(`/districtTPR-stats/${value}`)
        .then(function (response) {
            // handle success
            // console.log(response.data);

            let data = response.data;
            let district = data.district;
            let p1top3Plot = data.p1top3;
            let p4top7Plot = data.p4top7;

            // call the chart function
            ratio_teach_district(district, p1top3Plot, p4top7Plot);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            // always executed
        });


    //called for stance pupil ratio for district 
    axios.get(`/districtSPR-stats/${value}`)
        .then(function (response) {
            // handle success
            // console.log(response.data);

            let data = response.data;
            let district = data.district;
            let sprboysPlot = data.sprboys;
            let sprgirlsPlot = data.sprgirls;
            let sprovrallPlot = data.sproverall;

            // call the chart function
            stance_ratio_district(district, sprboysPlot, sprgirlsPlot, sprovrallPlot);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            // always executed
        });


    //called for classroom pupil ratio for district
    axios.get(`/districtCPR-stats/${value}`)
        .then(function (response) {
            // handle success
            //console.log(response.data);

            let data = response.data;
            let district = data.district;
            let cp1top3Plot = data.cp1top3;
            let cp4top7Plot = data.cp4top7;

            // call the chart function
            class_ratio_district(district, cp1top3Plot, cp4top7Plot);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            // always executed
        });

          //called for teacher stats for district
    axios.get(`/districtteacher-stats/${value}`)
    .then(function (response) {
        // handle success
        // console.log(response.data);

        let data = response.data;
        let district = data.district;
        let enrol = data.enrol;
        let staff = data.staff;
        let attend = data.attend;
        let timetable = data.timetable;

        // call the chart function
        teacher_stats_district(district, enrol, staff, attend, timetable);
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    })
    .finally(function () {
        // always executed
    });


         //called for teacher stats Trends for district
         axios.get(`/districtrteacher_stats-Trend/${value}`)
         .then(function (response) {
             // handle success
            //  console.log(response.data);
                
             let data = response.data;
             let district = data.district;
             let enrol = data.enrol;
             let staff = data.staff;
             let attend = data.attend;
             let timetable = data.timetable;
             let inspections = data.inspections;
     
             // call the chart function
             teacher_stats_Trend_district(district, enrol, staff, attend, timetable, inspections);
         })
         .catch(function (error) {
             // handle error
             console.log(error);
         })
         .finally(function () {
             // always executed
         });

    //chartpillars for district 
    axios.get(`/districtpillars-stats/${value}`)
        .then(function (response) {
            // handle success

            let data = response.data;
            let district = data.district;
            let pillarOne = data.pillar1Array;
            let pillarTwo = data.pillar2Array;
            let pillarThree = data.pillar3Array;
            let pillarFour = data.pillar4Array;

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


            // let districtConditionalPlot = data.districtConditionalPlot;
            // console.log(conditionalPlot);
            // let girlsPlot = JSON.parse(data.girls).map(myFunction);
            chartPillarDistrict(district, pillarOne, pillarTwo, pillarThree, pillarFour, pillarSummary);

        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            // always executed
        });


}



var myEnrolChart, myAttendChart, teacherRatio, StanceRatio, ClassroomRatio, myPillarChart;


//bar chart but is not dymaic it is hard coded values for district
function  chart_attendance_enrolment_district(district,boysPlotAttend, girlsPlotAttend, boysPlotEnrol, girlsPlotEnrol) {
    if (myEnrolChart) {
        myEnrolChart.destroy();
    }
    
    var ctxx = document.getElementById("superChart").getContext("2d");
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
                    data: [girlsPlotEnrol,  girlsPlotAttend]
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
function chart_attendance_enrolment_Trend_district(district,enrolPlot, attendPlot,inspectionPlot) {

    new Chart(document.getElementById("line-chart-trend"), {
        type: 'line',
        data: {
          labels: inspectionPlot,
          datasets: [{ 
              data: enrolPlot,
              label: "Enrolment",
              borderColor: "#006400",
              fill: false,
              lineTension: 0,
              pointStyle: 'line'
            }, { 
              data: attendPlot,
              label: "Attendance",
              borderColor: "#8e5ea2",
              fill: false,
              lineTension: 0,
              pointStyle: 'line'
            }
          ]
        },
        options: {
          title: {
            display: true,
            text:district
            },
            legend: {
                labels : {
                    usePointStyle: true
                }
                }
        }
      });
    }



//teacher to pupils ratio for the district 
function ratio_teach_district(district, p1top3Plot, p4top7Plot) {
    if (teacherRatio) {
        teacherRatio.destroy();
    }
    var randomColorFactor = function () {
        return Math.round(Math.random() * 255);
    };

    var config = {
        type: 'bar',
        data: {
            datasets: [{
                data: [p1top3Plot,p4top7Plot, 53],
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
                    },
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }

        }
    };

    var ctx = document.getElementById("district_1").getContext("2d");
    teacherRatio = new Chart(ctx, config);

}

// Teacher stats at district level
function   teacher_stats_district(district, enrol, staff, attend, timetable) {

    var ctxx = document.getElementById("TeacherChartDistrict").getContext("2d");
        var myChart = new Chart(ctxx, {
            type: 'bar',
            data: {
                labels: [
                    ["Established"," staffting"," as per enrolment"],
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


    // Teacher stats trend at district level
function teacher_stats_Trend_district(district, enrol, staff, attend, timetable, inspections) {

    new Chart(document.getElementById("line-chart"), {
        type: 'line',
        data: {
          labels: inspections,
          datasets: [{ 
              data: enrol,
              label: "Established staffting as per enrolment",
              borderColor: "#901818",
              fill: false,
              lineTension: 0,
              pointStyle: 'line'
            }, { 
              data: staff,
              label: "Current staffting level",
              borderColor: "#8e5ea2",
              fill: false,
              lineTension: 0,
              pointStyle: 'line'
            }, { 
              data:attend,
              label: "Staff attendance on visit day",
              borderColor: "#3cba9f",
              fill: false,
              lineTension: 0,
              pointStyle: 'line'
            }, { 
              data:timetable,
              label: "Number of classes taught according to timetable",
              borderColor: "#e8c3b9",
              fill: false,
              lineTension: 0,
              pointStyle: 'line'
            }
          ]
        },
        options: {
          title: {
            display: false,
            text:district
            },
            legend: {
            labels : {
                usePointStyle: true
            }
            }
        }
      });
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
                data: [sprboysPlot, sprgirlsPlot, 40],
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
                    },
                    ticks: {
                        beginAtZero: true
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
                data: [cp1top3Plot, cp4top7Plot, 53],

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
                    },
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }

        }
    };

    var ctx = document.getElementById("district_3").getContext("2d");
    ClassroomRatio = new Chart(ctx, config);
}

function chartPillarDistrict(district, pillarOne, pillarTwo, pillarThree, pillarFour, pillarSummary) {
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

    var ctx = document.getElementById("district_pillars");
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

    // console.log($('#pillars'));

    $(document).on('change', '#district', function () {
        // console.log($(this).val());
        // Does some stuff and logs the event to the console

        var colourChanged = [];

        if ($(this).val() === "0") {
            myPillarChart.data.labels = [["1.Condition of", "school building"], ["2.Classroom", "infrastucture"], ["3.Sanitary", "facilities"], "4.Timetabling", ["5.Teacher", "deployment"], ["6.Disciplinary", "policy"], ["7.Inclusive school", "practice"], ["8.Gender", "Sensitive School"]]
            myPillarChart.data.labels.forEach(function (d, i) {
                colourChanged.push(getRandomInt(10, 25));
                // myPillarChart.data.datasets[i].data
            })
        } else if ($(this).val() === "1") {
            myPillarChart.data.labels = ["1.Teacher and pupil attendance", "2.School Improvement plan", "3.SIP activities", "4.Financial management", ["5.Systematic monitoring and", "evaluation of teacher performance"], "6.Continuous professional development", "7.Systematic monitoring of pupil performance"]
            myPillarChart.data.labels.forEach(function (d, i) {
                colourChanged.push(getRandomInt(10, 25));
            })
        } else if ($(this).val() === "2") {
            myPillarChart.data.labels = ["1.Lesson planning", "2,Lesson delivery", "3.Teaching and learning materials", "4.Learner particiption", "5,Learning", "6.Teachers' rapport with learners", "7.Classroom environment", "8.Pupils' work"]
            myPillarChart.data.labels.forEach(function (d, i) {
                colourChanged.push(getRandomInt(10, 25));
            })
        } else if ($(this).val() === "3") {
            myPillarChart.data.labels = ["1. School management committee", ["2. School communication", "ith parents/community"], "3. Teacher communication with parents", "4. Involvement of parents"]
            myPillarChart.data.labels.forEach(function (d, i) {
                colourChanged.push(getRandomInt(10, 25));
            })
        } else if ($(this).val() === "4") {
            myPillarChart.data.labels = [["Pillar 1:", "Learning Environment"], ["Pillar 2:", "School Management", "and HT Performance"], ["Pillar 3:", "Effectiveness of", "Teaching and Learning"], ["Pillar 4:", "Involvement of", "Parents and", "Community"]]
            myPillarChart.data.labels.forEach(function (d, i) {
                colourChanged.push(getRandomInt(10, 25));
            })
        }

        // console.log(districtConditionalPlot)

        // myPillarChart.data.datasets[0].backgroundColor = colourChanged;
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
    var trendChart = new Chart(document.getElementById("district_lineChart"), {
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