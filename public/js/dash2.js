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
                "<tr><td>Number of Girls Enrolled:</td><td>" + totalBoysData + "</td><tr>" +
                "<tr><td>Number of Boys Enrolled:</td><td>" + totalGrilsData + "</td><tr>" +
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
            let pillar1 = [data.pillar1D1Array[0],data.pillar1D2Array[0],data.pillar1D3Array[0],data.pillar1D4Array[0],data.pillar1D5Array[0],data.pillar1D6Array[0],data.pillar1D7Array[0],data.pillar1D8Array[0]];
            let pillar2 = [data.pillar2D1Array[0],data.pillar2D2Array[0],data.pillar2D3Array[0],data.pillar2D4Array[0],data.pillar2D5Array[0],data.pillar2D6Array[0],data.pillar2D7Array[0]];
            let pillar3 = [data.pillar3D1Array[0],data.pillar3D2Array[0],data.pillar3D3Array[0],data.pillar3D4Array[0],data.pillar3D5Array[0],data.pillar3D6Array[0],data.pillar3D7Array[0],data.pillar3D8Array[0]];
            let pillar4 = [data.pillar4D1Array[0],data.pillar4D2Array[0],data.pillar4D3Array[0],data.pillar4D4Array[0]]

            chartPillarDistrict(district,pillar1,pillar2,pillar3,pillar4);

        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            // always executed
        });

           //called for teacher stats Trends for district
           axios.get(`/districtpillar-trend-stats/${value}`)
           .then(function (response) {
               // handle success
            //    console.log(response.data);
                  
               let data = response.data;
               let district = data.district;
               let pillar1Score = data.pillar1Score;
               let pillar2Score = data.pillar2Score;
               let pillar3Score = data.pillar3Score;
               let pillar4Score = data.pillar4Score;
               let inspections = data.inspections;
       
               // call the chart function
               district_pillar_trends(district, pillar1Score,pillar2Score,pillar3Score,pillar4Score, inspections);
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
                    "green"
                ],
            }],
            labels: [
                "P1-P3",
                "P4-P7",
                "National"," Target"

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
                    "green"
                ],
            }],
            labels: [
                "P1-P3",
                "P4-P7",
                "National"," Target"

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
                    "green"
                ],
            }],
            labels: [
                "P1-P3",
                "P4-P7",
                "National"," Target"
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

function chartPillarDistrict(district,pillar1,pillar2,pillar3,pillar4) {
    if (myPillarChart) {
        myPillarChart.destroy();
    }

    function sumArrays(...arrays) {
        const n = arrays.reduce((max, xs) => Math.max(max, xs.length), 0);
        const result = Array.from({ length: n });
        return result.map((_, i) => arrays.map(xs => xs[i] || 0).reduce((sum, x) => sum + x, 0));
      }
      
    let pillarSummary1 = sumArrays(pillar1[0],pillar1[1],pillar1[2],pillar1[3],pillar1[4],pillar1[5],pillar1[6],pillar1[7]);
    
    let pillarSummary2 = sumArrays(pillar2[0],pillar2[1],pillar2[2],pillar2[3],pillar2[4],pillar2[5],pillar2[6]);
    
    let pillarSummary3 = sumArrays(pillar3[0],pillar3[1],pillar3[2],pillar3[3],pillar3[4],pillar3[5],pillar3[6],pillar3[7]);
    
    let pillarSummary4 = sumArrays(pillar4[0],pillar4[1],pillar4[2],pillar4[3]);

    let pillarSummary = [pillarSummary1, pillarSummary2, pillarSummary3, pillarSummary4];

    function transpose(matrix) {
        return matrix[0].map((col, c) => matrix.map((row, r) => matrix[r][c]));
      }

    let pillarTranspose = transpose(pillarSummary);
    let pillar1Transpose = transpose(pillar1);
    let pillar2Transpose = transpose(pillar2);
    let pillar3Transpose = transpose(pillar3);
    let pillar4Transpose = transpose(pillar4);

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
                    data: pillarTranspose[0],
                    backgroundColor: "#FF0000"
                }, {
                    label: '41% - 60%',
                    data: pillarTranspose[1],
                    backgroundColor: "#FFA500"
                }, {
                    label: '61% - 80%',
                    data: pillarTranspose[2],
                    backgroundColor: "#FFFF00"
                }, {
                    label: '81% - 100%',
                    data: pillarTranspose[3],
                    backgroundColor: "#008000"
                }]
        },
        options: barOptions_stacked,
    });

    // console.log($('#pillars'));

    $(document).on('change', '#district', function () {
        // console.log($(this).val());
        // Does some stuff and logs the event to the console

        if ($(this).val() === "0") {
            myPillarChart.data.labels = [["1.Condition of", "school building"], ["2.Classroom", "infrastucture"], ["3.Sanitary", "facilities"], "4.Timetabling", ["5.Teacher", "deployment"], ["6.Disciplinary", "policy"], ["7.Inclusive school", "practice"], ["8.Gender", "Sensitive School"]]
            for(var i = 0; i < 4; i++) {
                myPillarChart.data.datasets[i].data = pillar1Transpose[i];
            }
        } else if ($(this).val() === "1") {
            myPillarChart.data.labels = ["1.Teacher and pupil attendance", "2.School Improvement plan", "3.SIP activities", "4.Financial management", ["5.Systematic monitoring and", "evaluation of teacher performance"], "6.Continuous professional development", "7.Systematic monitoring of pupil performance"]
            for(var i = 0; i < 4; i++) {
                myPillarChart.data.datasets[i].data = pillar2Transpose[i];
            }
        } else if ($(this).val() === "2") {
            myPillarChart.data.labels = ["1.Lesson planning", "2,Lesson delivery", "3.Teaching and learning materials", "4.Learner particiption", "5,Learning", "6.Teachers' rapport with learners", "7.Classroom environment", "8.Pupils' work"]
            for(var i = 0; i < 4; i++) {
                myPillarChart.data.datasets[i].data = pillar3Transpose[i];
            }
        } else if ($(this).val() === "3") {
            myPillarChart.data.labels = ["1. School management committee", ["2. School communication", "ith parents/community"], "3. Teacher communication with parents", "4. Involvement of parents"]
            for(var i = 0; i < 4; i++) {
                myPillarChart.data.datasets[i].data = pillar4Transpose[i];
            }
        } else if ($(this).val() === "4") {
            myPillarChart.data.labels = [["Pillar 1:", "Learning Environment"], ["Pillar 2:", "School Management", "and HT Performance"], ["Pillar 3:", "Effectiveness of", "Teaching and Learning"], ["Pillar 4:", "Involvement of", "Parents and", "Community"]]
            for(var i = 0; i < 4; i++) {
                myPillarChart.data.datasets[i].data = pillarTranspose[i];
            }
        }

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
function  district_pillar_trends(district, pillar1Score,pillar2Score,pillar3Score,pillar4Score, inspections) {
    if (trendChart) {
        trendChart.destroy();
    }

    var trendChart = new Chart(document.getElementById("district_lineChart"), {
        type: 'line',
        data: {
            labels: inspections,
            datasets: [
                {
                    data: [8, 14, 22, 30, 32],
                    label: "hide",
                    borderColor: "#00000000",
                    fill: false,
                    lineTension: 0,
                    pointStyle: 'line'
                }, {
                    data: pillar1Score,
                    label: "Pillar 1",
                    borderColor: "#e41a1c",
                    fill: false,
                    lineTension: 0,
                    pointStyle: 'line'
                }, {
                    data: pillar2Score,
                    label: "Pillar 2",
                    borderColor: "#377eb8",
                    fill: false,
                    lineTension: 0,
                    pointStyle: 'line'
                }, {
                    data: pillar3Score,
                    label: "Pillar 3",
                    borderColor: "#4daf4a",
                    fill: false,
                    lineTension: 0,
                    pointStyle: 'line'
                }, {
                    data: pillar4Score,
                    label: "Pillar 4",
                    borderColor: "#984ea3",
                    fill: false,
                    lineTension: 0,
                    pointStyle: 'line'
                }
            ]
        },
        options: {
            title: {
                display: true,
                text: district
            },
            scales: {
                xAxes: [{
                    display: true,
                    scaleLabel: {
                        display: false,
                        labelString: 'Inspection Date'
                    }
                }],
                yAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Grade'
                    },
                    ticks: {
                        // min: 0,
                        // max: 5,
                        stepSize: 10,
                        // suggestedMin: 0,
                        // suggestedMax: 15,
                        callback: function (label, index, labels) {

                            if (label < 1) { 
                                return ""; 
                            } else if (label <= 16) {
                                return 'D';
                            } else if (label > 16 && label < 28) {
                                return 'C';
                            } else if (label > 28 && label < 32) {
                                return 'B';
                            } else if (label >= 32) {
                                return 'A';
                            } else if (label < 1) { return ""; }
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

}


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}