function loadStats() {
  ake();
}

$(document).ready(function() {
  ake("Elgon");
});

function ake(regionName) {
  //let e = document.getElementById("sel");

  let value = regionName ? regionName : "Elgon";

  //called for district details
  axios
    .get(`/nationalDetails-stats/${value}`)
    .then(function(response) {
      // handle success

      let data = response.data;
      let region = data.region;
      let totalSchoolsData = data.school[0];
      let totalBoysData = data.Boys[0];
      let totalGrilsData = data.Grils[0];
      let totalInspectionData = data.Inspection[0];
      let max_inspectionData = data.Max_inspection[0];

      $("#regiondetails").html(
        "<table>" +
          "<tr><td>Region:</td><td>" +
          region +
          "</td><tr>" +
          "<tr><td>Number of Girls Enrolled:</td><td>" +
          totalBoysData +
          "</td><tr>" +
          "<tr><td>Number of Boys Enrolled:</td><td>" +
          totalGrilsData +
          "</td><tr>" +
          "<tr><td>Total Number of Schools:</td><td>" +
          totalSchoolsData +
          "</td><tr>" +
          "<tr><td>Total Number of Inspections:</td><td>" +
          totalInspectionData +
          "</td><tr>" +
          // "<tr><td>Latest Inspections:</td><td>" + max_inspectionData + "</td><tr>"
          "</table>"
      );
    })
    .catch(function(error) {
      // handle error
      //console.log(error);
    })
    .finally(function() {
      // always executed
    });

  // Called for chart_enrolment for each region
  axios
    .get(`/nationalEnrolAttend-Trend-stats/${value}`)
    .then(function(response) {
      // handle success

      let data = response.data;
      let region = data.region;
      let enrolPlot = data.enrol;
      let attendPlot = data.attend;
      let inspectionPlot = data.inspection;

      // call the chart function
      chart_enrol_attend_trend_region(
        region,
        enrolPlot,
        attendPlot,
        inspectionPlot
      );
      //    / dataCollection('enrollment', region, boysPlot, girlsPlot);
    })
    .catch(function(error) {
      // handle error
      //console.log(error);
    })
    .finally(function() {
      // always executed
    });

  // Called for chart_attendance for each region
  axios
    .get(`/nationalAttendance-stats/${value}`)
    .then(function(response) {
      // handle success

      let data = response.data;
      let region = data.region;
      let boysPlotAttend = data.boysAttend;
      let girlsPlotAttend = data.girlsAttend;
      let boysPlotEnrol = data.boysEnrol;
      let girlsPlotEnrol = data.girlsEnrol;

      // call the chart function
      chart_attendance_enrolment_region(
        region,
        boysPlotAttend,
        girlsPlotAttend,
        boysPlotEnrol,
        girlsPlotEnrol
      );

      // dataCollection('attendence', region, boysPlot, girlsPlot);
    })
    .catch(function(error) {
      // handle error
      //console.log(error);
    })
    .finally(function() {
      // always executed
    });

  // Called for teacher pupil ratio for each district
  axios
    .get(`/nationalTPR-stats/${value}`)
    .then(function(response) {
      // handle success

      let data = response.data;
      let region = data.region;
      let p1top3Plot = data.p1top3;
      let p4top7Plot = data.p4top7;

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
  axios
    .get(`/nationalSPR-stats/${value}`)
    .then(function(response) {
      // handle success

      let data = response.data;
      let region = data.region;
      let sprboysPlot = data.sprboys;
      let sprgirlsPlot = data.sprgirls;
      let sprovrallPlot = data.sproverall;

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
  axios
    .get(`/nationalCPR-stats/${value}`)
    .then(function(response) {
      // handle success

      let data = response.data;
      let region = data.region;
      let cp1top3Plot = data.cp1top3;
      let cp4top7Plot = data.cp4top7;

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

  //called for teacher stats for region
  axios
    .get(`/nationalTeacher-stats/${value}`)
    .then(function(response) {
      // handle success
      console.log(response.data);

      let data = response.data;
      let region = data.region;
      let enrol = data.enrol;
      let staff = data.staff;
      let attend = data.attend;
      let timetable = data.timetable;

      // call the chart function
      teacher_stats_national(region, enrol, staff, attend);
    })
    .catch(function(error) {
      // handle error
      console.log(error);
    })
    .finally(function() {
      // always executed
    });

  // Called for teaching according to timetable for each district
  axios
    .get(`/nationalteachAccordTT/${value}`)
    .then(function(response) {
      // handle success

      let data = response.data;
      let region = data.region;
      let timetable = data.timetable;
      let inspections = data.inspections;

      // call the chart function
      chart_teach_accordToTT_region(region, timetable, inspections);
    })
    .catch(function(error) {
      // handle error
      console.log(error);
    })
    .finally(function() {
      // always executed
    });

  //called for teacher stats Trends for national level
  axios
    .get(`/nationalTeacher-Trend-stats/${value}`)
    .then(function(response) {
      // handle success

      let data = response.data;
      let region = data.region;
      let enrol = data.enrol;
      let staff = data.staff;
      let attend = data.attend;
      let timetable = data.timetable;
      let inspections = data.inspections;

      // call the chart function
      teacher_stats_Trend_national(region, enrol, staff, attend, inspections);
    })
    .catch(function(error) {
      // handle error
      console.log(error);
    })
    .finally(function() {
      // always executed
    });

  //chartpillars for district
  axios
    .get(`/nationalPillars-stats/${value}`)
    .then(function(response) {
      // handle success

      let data = response.data;
      let region = data.region;

      let pillar1 = [
        data.pillar1D1Array[0],
        data.pillar1D2Array[0],
        data.pillar1D3Array[0],
        data.pillar1D4Array[0],
        data.pillar1D5Array[0],
        data.pillar1D6Array[0],
        data.pillar1D7Array[0],
        data.pillar1D8Array[0]
      ];
      let pillar2 = [
        data.pillar2D1Array[0],
        data.pillar2D2Array[0],
        data.pillar2D3Array[0],
        data.pillar2D4Array[0],
        data.pillar2D5Array[0],
        data.pillar2D6Array[0],
        data.pillar2D7Array[0]
      ];
      let pillar3 = [
        data.pillar3D1Array[0],
        data.pillar3D2Array[0],
        data.pillar3D3Array[0],
        data.pillar3D4Array[0],
        data.pillar3D5Array[0],
        data.pillar3D6Array[0],
        data.pillar3D7Array[0],
        data.pillar3D8Array[0]
      ];
      let pillar4 = [
        data.pillar4D1Array[0],
        data.pillar4D2Array[0],
        data.pillar4D3Array[0],
        data.pillar4D4Array[0]
      ];

      chartPillarRegion(region, pillar1, pillar2, pillar3, pillar4);
    })
    .catch(function(error) {
      // handle error
      console.log(error);
    })
    .finally(function() {
      // always executed
    });

  // Called for Pillar trends for each region
  axios
    .get(`/nationalPillars-Trends-stats/${value}`)
    .then(function(response) {
      // handle success

      let data = response.data;
      let region = data.region;
      let pillar1Score = data.pillar1Score;
      let pillar2Score = data.pillar2Score;
      let pillar3Score = data.pillar3Score;
      let pillar4Score = data.pillar4Score;
      let inspections = data.inspections;

      // call the chart function
      national_pillar_trends(
        region,
        pillar1Score,
        pillar2Score,
        pillar3Score,
        pillar4Score,
        inspections
      );

      // dataCollection('attendence', region, boysPlot, girlsPlot);
    })
    .catch(function(error) {
      // handle error
      //console.log(error);
    })
    .finally(function() {
      // always executed
    });
}

function myFunction(num) {
  return parseInt(num, 10);
}

var myEnrolChart,
  myAttendChart,
  teacherRatio,
  StanceRatio,
  ClassroomRatio,
  myPillarChart;

//all the chart for the region below
function chart_attendance_enrolment_region(
  region,
  boysPlotAttend,
  girlsPlotAttend,
  boysPlotEnrol,
  girlsPlotEnrol
) {
  if (myEnrolChart) {
    myEnrolChart.destroy();
  }
  var ctxx = document.getElementById("enroloment_region").getContext("2d");
  myEnrolChart = new Chart(ctxx, {
    type: "bar",
    data: {
      labels: ["Enrolment", "Attendence"],
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
          data: [girlsPlotEnrol, girlsPlotAttend]
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
        yAxes: [
          {
            ticks: {
              beginAtZero: true
            }
          }
        ]
      }
    }
  });
}

//line charts for enrol and attend trends at regional level

function chart_enrol_attend_trend_region(
  region,
  enrolPlot,
  attendPlot,
  inspectionPlot
) {
  new Chart(document.getElementById("line-chart-trend-region"), {
    type: "line",
    data: {
      labels: inspectionPlot,
      datasets: [
        {
          data: enrolPlot,
          label: "Enrolment",
          borderColor: "#006400",
          fill: false,
          lineTension: 0,
          pointStyle: "line"
        },
        {
          data: attendPlot,
          label: "Attendance",
          borderColor: "#8e5ea2",
          fill: false,
          lineTension: 0,
          pointStyle: "line"
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: region
      },
      legend: {
        labels: {
          usePointStyle: true
        }
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
    type: "bar",
    data: {
      datasets: [
        {
          data: [p1top3Plot, p4top7Plot, 53],
          backgroundColor: ["rgb(38,34,98)", "rgb(38,34,98)", "green"]
        }
      ],
      labels: ["P1-P3", "P4-P7", ["National", " Target"]]
    },
    options: {
      legend: {
        display: false
        // position: "bottom",
      },
      scales: {
        yAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: "TPR"
            },
            ticks: {
              beginAtZero: true
            }
          }
        ]
      }
    }
  };

  var ctx = document.getElementById("region_1").getContext("2d");
  teacherRatio = new Chart(ctx, config);
}

//stance to pupils ratio for region
function stance_ratio_region(region, sprboysPlot, sprgirlsPlot, sprovrallPlot) {
  if (StanceRatio) {
    StanceRatio.destroy();
  }

  var config = {
    type: "bar",
    data: {
      datasets: [
        {
          data: [sprboysPlot, sprgirlsPlot, sprovrallPlot, 40],
          backgroundColor: [
            "rgb(38,34,98)",
            "rgb(38,34,98)",
            "rgb(38,34,98)",
            "green"
          ]
        }
      ],
      labels: ["Boys", "Girls", "Overall", ["National", " Target"]]
    },
    options: {
      legend: {
        display: false
        // position: "bottom",
      },
      scales: {
        yAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: "SPR"
            },
            ticks: {
              beginAtZero: true
            }
          }
        ]
      }
    }
  };

  var ctx = document.getElementById("region_2").getContext("2d");
  StanceRatio = new Chart(ctx, config);
}

//classroom to pupils ratio chart for district
function class_ratio_region(region, cp1top3Plot, cp4top7Plot) {
  if (ClassroomRatio) {
    ClassroomRatio.destroy();
  }

  var config = {
    type: "bar",
    data: {
      datasets: [
        {
          data: [cp1top3Plot, cp4top7Plot, 53],
          backgroundColor: ["rgb(38,34,98)", "rgb(38,34,98)", "green"]
        }
      ],
      labels: ["P1-P3", "P4-P7", ["National", " Target"]]
    },
    title: {
      display: false
      // text: district
    },
    options: {
      legend: {
        display: false
        // position: "bottom",
      },
      scales: {
        yAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: "CPR"
            },
            ticks: {
              beginAtZero: true
            }
          }
        ]
      }
    }
  };

    var ctx = document.getElementById("region_3").getContext("2d");
    new Chart(ctx, config);
}

// Teacher stats at region level
function teacher_stats_national(region, enrol, staff, attend, timetable) {
  if (ClassroomRatio) {
    ClassroomRatio.destroy();
  }

  var ctxx = document.getElementById("TeacherChartNational").getContext("2d");
  var myChart = new Chart(ctxx, {
    type: "bar",
    data: {
      labels: [
        ["Established", " staffting", " as per", " enrolment"],
        ["Current", "staffting", " level"],
        ["Staff ", "attendance", " on visit day"]
      ],
      datasets: [
        {
          label: "",
          backgroundColor: "rgb(38,34,98)",
          borderColor: "rgb(38,34,98)",
          borderWidth: 1,
          data: [enrol, staff, attend]
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
        text: region
      },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true
            }
          }
        ]
      }
    }
  });
}

// Teacher stats trend at national level (teach according to timetable)
function chart_teach_accordToTT_region(region, timetable, inspections) {
  new Chart(document.getElementById("line-chart_timetable"), {
    type: "line",
    data: {
      labels: inspections,
      datasets: [
        {
          data: timetable,
          //   label: "Classes taught according to timetable",
          borderColor: "#901818",
          fill: false,
          lineTension: 0,
          pointStyle: "line"
        }
      ]
    },
    options: {
      title: {
        display: false,
        text: region
      },
      legend: {
        display: false
      }
    }
  });
}

// Teacher stats trend at national level
function teacher_stats_Trend_national(
  region,
  enrol,
  staff,
  attend,
  inspections
) {
  new Chart(document.getElementById("line-chart-National"), {
    type: "line",
    data: {
      labels: inspections,
      datasets: [
        {
          data: enrol,
          label: "Established staffting as per enrolment",
          borderColor: "#901818",
          fill: false,
          lineTension: 0,
          pointStyle: "line"
        },
        {
          data: staff,
          label: "Current staffting level",
          borderColor: "#8e5ea2",
          fill: false,
          lineTension: 0,
          pointStyle: "line"
        },
        {
          data: attend,
          label: "Staff attendance on visit day",
          borderColor: "#3cba9f",
          fill: false,
          lineTension: 0,
          pointStyle: "line"
        }
      ]
    },
    options: {
      title: {
        display: false,
        text: region
      },
      legend: {
        labels: {
          usePointStyle: true
        }
      }
    }
  });
}

function chartPillarRegion(region, pillar1, pillar2, pillar3, pillar4) {
  if (myPillarChart) {
    myPillarChart.destroy();
  }

  function sumArrays(...arrays) {
    const n = arrays.reduce((max, xs) => Math.max(max, xs.length), 0);
    const result = Array.from({ length: n });
    return result.map((_, i) =>
      arrays.map(xs => xs[i] || 0).reduce((sum, x) => sum + x, 0)
    );
  }

  let pillarSummary1 = sumArrays(
    pillar1[0],
    pillar1[1],
    pillar1[2],
    pillar1[3],
    pillar1[4],
    pillar1[5],
    pillar1[6],
    pillar1[7]
  );

  let pillarSummary2 = sumArrays(
    pillar2[0],
    pillar2[1],
    pillar2[2],
    pillar2[3],
    pillar2[4],
    pillar2[5],
    pillar2[6]
  );

  let pillarSummary3 = sumArrays(
    pillar3[0],
    pillar3[1],
    pillar3[2],
    pillar3[3],
    pillar3[4],
    pillar3[5],
    pillar3[6],
    pillar3[7]
  );

  let pillarSummary4 = sumArrays(
    pillar4[0],
    pillar4[1],
    pillar4[2],
    pillar4[3]
  );

  let pillarSummary = [
    pillarSummary1,
    pillarSummary2,
    pillarSummary3,
    pillarSummary4
  ];

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
      mode: "index",
      callbacks: {
        afterTitle: function(tooltipItem, data) {
          return data.tooltips[tooltipItem[0].index];
        },
        // Use the footer callback to display the sum of the items showing in the tooltip
        label: function(tooltipItem, data) {
          var label = data.datasets[tooltipItem.datasetIndex].label || "";

          if (label) {
            label += ": ";
          }
          label += Math.round(tooltipItem.yLabel * 100) / 100;
          return label;
        },
        footer: function(tooltipItems, data) {
          var sum = 0;

          tooltipItems.forEach(function(tooltipItem) {
            sum +=
              data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
          });
          return "Number of Schools: " + sum;
        }
      },
      footerFontStyle: "normal"
    },
    hover: {
      animationDuration: 10
    },
    scales: {
      xAxes: [
        {
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
        }
      ],
      yAxes: [
        {
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
        }
      ]
    },
    legend: {
      display: true,
      position: "bottom",
      labels: {
        // fontColor: '#FFA500'
        filter: function(item, chart) {
          // Logic to remove a particular legend item goes here
          return !item.text.includes("hide");
        }
      }
    }
  };

  var ctx = document.getElementById("region_pillars");
  myPillarChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Pillar 1", "Pillar 2", "Pillar 3", "Pillar 4"],
      tooltips: [
        "Learning Environment",
        "School Management and HT Performance",
        "Effectiveness of Teaching and Learning",
        "Involvement of Parents and Community"
      ],
      datasets: [
        {
            label: "A - (81% - 100%)",
            backgroundColor: "#008000"
          },
          {
            label: "B - (61% - 80%)",
            backgroundColor: "#FFFF00"
          },
          {
            label: "C - (41% - 60%)",
            backgroundColor: "#FFA500"
          },
          {
            label: "D - (25% - 40%)",
            backgroundColor: "#FF0000"
          }
      ]
    },
    options: barOptions_stacked
  });

  $(document).on("change", "#region", function() {
    if ($(this).val() === "0") {
      myPillarChart.data.labels = [
        "SP: 1",
        "SP: 2",
        "SP: 3",
        "SP: 4",
        "SP: 5",
        "SP: 6",
        "SP: 7",
        "SP: 8"
      ];
      myPillarChart.data.tooltips = [
        "Condition of school building",
        "Classroom infrastucture",
        "Sanitary facilities",
        "Timetabling",
        "Teacher deployment",
        "Disciplinary policy",
        "Inclusive school practice",
        "Gender Sensitive School"
      ];
      for (var i = 0; i < 4; i++) {
        myPillarChart.data.datasets[i].data = pillar1Transpose[i];
      }
    } else if ($(this).val() === "1") {
      myPillarChart.data.labels = [
        "SP: 1",
        "SP: 2",
        "SP: 3",
        "SP: 4",
        "SP: 5",
        "SP: 6",
        "SP: 7"
      ];
      myPillarChart.data.tooltips = [
        "Teacher and pupil attendance",
        "School Improvement plan",
        "SIP activities",
        "Financial management",
        "Systematic monitoring and evaluation of teacher performance",
        "Continuous professional development",
        "Systematic monitoring of pupil performance"
      ];
      for (var i = 0; i < 4; i++) {
        myPillarChart.data.datasets[i].data = pillar2Transpose[i];
      }
    } else if ($(this).val() === "2") {
      myPillarChart.data.labels = [
        "SP: 1",
        "SP: 2",
        "SP: 3",
        "SP: 4",
        "SP: 5",
        "SP: 6",
        "SP: 7",
        "SP: 8"
      ];
      myPillarChart.data.tooltips = [
        "Lesson planning",
        "Lesson delivery",
        "Teaching and learning materials",
        "Learner particiption",
        "Learning",
        "Teachers' rapport with learners",
        "Classroom environment",
        "Pupils' work"
      ];
      for (var i = 0; i < 4; i++) {
        myPillarChart.data.datasets[i].data = pillar3Transpose[i];
      }
    } else if ($(this).val() === "3") {
      myPillarChart.data.labels = ["SP: 1", "SP: 2", "SP: 3", "SP: 4"];
      for (var i = 0; i < 4; i++) {
        myPillarChart.data.datasets[i].data = pillar4Transpose[i];
      }
    } else if ($(this).val() === "4") {
      myPillarChart.data.labels = [
        "Pillar 1",
        "Pillar 2",
        "Pillar 3",
        "Pillar 4"
      ];
      myPillarChart.data.tooltips = [
        "Learning Environment",
        "School Management and HT Performance",
        "Effectiveness of Teaching and Learning",
        "Involvement of Parents and Community"
      ];
      for (var i = 0; i < 4; i++) {
        myPillarChart.data.datasets[i].data = pillarTranspose[i];
      }
    }

    myPillarChart.update();
  });

  // this part to make the tooltip only active on your real dataset
  var originalGetElementAtEvent = myPillarChart.getElementAtEvent;
  myPillarChart.getElementAtEvent = function(e) {
    return originalGetElementAtEvent.apply(this, arguments).filter(function(e) {
      return e._datasetIndex === 1;
    });
  };
}

//d3 charts with dimple.js
function national_pillar_trends(
  region,
  pillar1Score,
  pillar2Score,
  pillar3Score,
  pillar4Score,
  inspections
) {
  if (trendChart) {
    trendChart.destroy();
  }

  var trendChart = new Chart(document.getElementById("region_lineChart"), {
    type: "line",
    data: {
      labels: inspections,
      datasets: [
        {
          data: [8, 14, 22, 30, 32],
          label: "hide",
          borderColor: "#00000000",
          fill: false,
          lineTension: 0,
          pointStyle: "line"
        },
        {
          data: pillar1Score,
          label: "Pillar 1",
          borderColor: "#e41a1c",
          fill: false,
          lineTension: 0,
          pointStyle: "line"
        },
        {
          data: pillar2Score,
          label: "Pillar 2",
          borderColor: "#377eb8",
          fill: false,
          lineTension: 0,
          pointStyle: "line"
        },
        {
          data: pillar3Score,
          label: "Pillar 3",
          borderColor: "#4daf4a",
          fill: false,
          lineTension: 0,
          pointStyle: "line"
        },
        {
          data: pillar4Score,
          label: "Pillar 4",
          borderColor: "#984ea3",
          fill: false,
          lineTension: 0,
          pointStyle: "line"
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: region
      },
      scales: {
        xAxes: [
          {
            display: true,
            scaleLabel: {
              display: false,
              labelString: "Term"
            }
          }
        ],
        yAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
              labelString: "Grade"
            },
            ticks: {
              // min: 0,
              // max: 5,
              stepSize: 10,
              // suggestedMin: 0,
              // suggestedMax: 15,
              callback: function(label, index, labels) {
                if (label < 1) {
                  return "";
                } else if (label <= 16) {
                  return "D";
                } else if (label > 16 && label < 28) {
                  return "C";
                } else if (label > 28 && label < 32) {
                  return "B";
                } else if (label >= 32) {
                  return "A";
                } else if (label < 1) {
                  return "";
                }
              }
            },
            gridLines: {
              display: true
            }
          }
        ]
      },
      legend: {
        display: true,
        position: "bottom",
        labels: {
          // fontColor: '#FFA500'
          filter: function(item, chart) {
            // Logic to remove a particular legend item goes here
            return !item.text.includes("hide");
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
