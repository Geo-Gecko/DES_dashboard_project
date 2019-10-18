// Called when page is first loaded
function loadStats() {
    ake();
}

function ake(schoolName) {
    //let e = document.getElementById("sel");

    let value = schoolName ? schoolName : 'Bugana P.s.';

    // Called to get enrollment for each school
    axios.get(`/enrollment-stats/${value}`)
        .then(function (response) {
            // handle success
            //console.log(response.data);

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
            //console.log(response.data);

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

            // console.log(data)

            let conditionalPlot = data.conditionalPlot;
            // console.log(conditionalPlot);
            // let girlsPlot = JSON.parse(data.girls).map(myFunction);
            chartPillar(school, conditionalPlot);

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



            //        $('#schooldetails').html(' <ul id="car">'+    
            //        '<li>School:'+   school + 
            //       ' <li>District:    '+     distinctData+ 
            //       '<li>County   :  '+     countyData+ 
            //        '<li>Sub-county:   '+  subcountyData+ 
            //        '<li>Parish      :  '+  parishData+ 
            //        '<li>School Status:  '+  statusData+ 
            //        ' <li>School Level :  '+ levelData + 
            //    '</ul>')

            $('#schooldetails').html("<table>" +
                "<tr><td>School:</td><td>" + school + "</td><tr>" +
                "<tr><td>District:</td><td>" + distinctData + "</td><tr>" +
                "<tr><td>County:</td><td>" + countyData + "</td><tr>" +
                "<tr><td>Sub-County:</td><td>" + subcountyData + "</td><tr>" +
                "<tr><td>Parish:</td><td>" + parishData + "</td><tr>" +
                "<tr><td>School Status:</td><td>" + emisData + "</td><tr>" +
                "<tr><td>School Level:</td><td>" + regionData + "</td><tr>" +
                "<tr><td>Number of Inspections:</td><td>" + inspectionData + "</td><tr>" + 
                "<tr><td>Latest Inspections:</td><td>" + max_inspectionData + "</td><tr>" +"</table>")

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

//charts
var myEnrolChart, myAttendChart, teacherRatio, StanceRatio, ClassroomRatio, myPillarChart;

function char_enrollment(school, boysPlot, girlsPlot) {
    if (myEnrolChart) {
        myEnrolChart.destroy();
    }
    var ctxx = document.getElementById("mySuperChart").getContext("2d");
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
    if (myAttendChart) {
        myAttendChart.destroy();
    }
    var ctxx = document.getElementById("chart_attendance").getContext("2d");
    myAttendChart = new Chart(ctxx, {
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
                    fillOpacity: .3,
                    fill: true,
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
function ratio_teach(school, p1top3Plot, p4top7Plot) {
    if (teacherRatio) {
        teacherRatio.destroy();
    }
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
            }, {
                data: [1, 53],
                backgroundColor: [
                    "rgb(150,93,162)",
                    "rgb(38,34,98)"
                ],
            }],
            labels: [
                "Teacher",
                "Pupils "
            ]
        },
        options: {
            legend: {
                position: "bottom",
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
                data: [1, 400],
                backgroundColor: [
                    "rgb(150,93,162)",
                    "rgb(38,34,98)"
                ],
            }],
            labels: [
                "Stance",
                "Pupils "
            ]
        },
        options: {
            responsive: true,
            legend: {
                position: "bottom",
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
        type: 'doughnut',
        data: {
            datasets: [{
                data: [1, cp1top3Plot],

                backgroundColor: [
                    "rgb(150,93,162)",
                    "rgb(38,34,98)"],
            }, {
                data: [1, cp4top7Plot],

                backgroundColor: [
                    "rgb(150,93,162)",
                    "rgb(38,34,98)"
                ],
            }, {
                data: [1, 53],
                backgroundColor: [
                    "rgb(150,93,162)",
                    "rgb(38,34,98)"
                ],
            }],
            labels: [
                "Classroom",
                "Pupils "
            ]
        },
        title: {
            display: true,
            text: school
        },
        options: {
            responsive: true,
            legend: {
                position: "bottom",
            }
        }
    };

    var ctx = document.getElementById("nasted3").getContext("2d");
    ClassroomRatio = new Chart(ctx, config);
}


function chartPillar(school, conditionalPlot) {
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
                filter: function (item, chart) {
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
    conditionalPlot[0].forEach(function (d, i) {
        chosenColours.push(colourPicker(parseInt(d)));
    })


    var ctx = document.getElementById("mypillars");
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

    $(document).on('change', '#pillars', function () {
        // console.log($(this).val());
        // Does some stuff and logs the event to the console

        

        if ($(this).val() === "1") {
            myPillarChart.data.labels = ["1.Condition of school building", "2.Classroom infrastucture", "3.Sanitary facilities", "4.Timetabling", "5.Teacher deployment", "6.Disciplinary policy", "7.Inclusive school practice", "8.Gender Sensitive School"]
        } else if ($(this).val() === "2") {
            myPillarChart.data.labels = ["1.Teacher and pupil attendance", "2.School Improvement plan", "3.SIP activities", "4.Financial management", "5.Systematic monitoring and evaluation of teacher performance", "6.Continuous professional development", "7.Systematic monitoring of pupil performance"]
        } else if ($(this).val() === "3") {
            myPillarChart.data.labels = ["1.Lesson planning", "2,Lesson delivery", "3.Teaching and learning materials", "4.Learner particiption", "5,Learning", "6.Teachers' rapport with learners", "7.Classroom environment", "8.Pupils' work"]
        } else if ($(this).val() === "4") {
            myPillarChart.data.labels = ["1. School management committee", "2. School communication with parents/community", "3. Teacher communication with parents", "4. Involvement of parents"]
        }

        
        var colourChanged = [];
        conditionalPlot[parseInt($(this).val())].forEach(function (d, i) {
            if (i < myPillarChart.data.labels.length) {
                colourChanged.push(colourPicker(parseInt(d)));

            }
        })

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
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: ''
      }
    }
  });

  $(document).on('change', '#trendSelector', function () {
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

var trendPlot = [[],[],[],[]];

trendPlot[0][0] = [getRandomInt(900,1500),getRandomInt(900,1500),getRandomInt(900,1500)]
trendPlot[1][0] = [getRandomInt(900,1500),getRandomInt(900,1500),getRandomInt(900,1500)]
trendPlot[2][0] = [getRandomInt(900,1500),getRandomInt(900,1500),getRandomInt(900,1500)]
trendPlot[3][0] = [getRandomInt(900,1500),getRandomInt(900,1500),getRandomInt(900,1500)]
trendPlot[0][1] = [getRandomInt(900,1500),getRandomInt(900,1500),getRandomInt(900,1500)]
trendPlot[1][1] = [getRandomInt(900,1500),getRandomInt(900,1500),getRandomInt(900,1500)]
trendPlot[2][1] = [getRandomInt(900,1500),getRandomInt(900,1500),getRandomInt(900,1500)]
trendPlot[3][1] = [getRandomInt(900,1500),getRandomInt(900,1500),getRandomInt(900,1500)]


trendPillar(null, trendPlot);



