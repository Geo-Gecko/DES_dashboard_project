function loadStats() {
  ake();
}

$(document).ready(function() {
  ake("Adjumani", "2019");
});

function ake(districtName, year) {
  //let e = document.getElementById("sel");


  let value = districtName ? districtName : "Adjumani";

  let year_ = year ? year : "2019";

  //called for district details
  axios
    .get(`/districtdetails-stats/${value}/${year_}`)
    .then(function(response) {
      // handle success
      // console.log(response.data);

      let data = response.data;
      let district = data.district;
      let totalSchoolsData = data.school[0];
      let totalBoysData = data.Boys[0];
      let totalGrilsData = data.Grils[0];
      let inspectionData1 = data.inspection1[0];
      let inspectionData2 = data.inspection2[0];
      let inspectionData3 = data.inspection3[0];
      let region = data.region;

      $("#districtDetails").html(
        "<table>" +
          "<tr><td>District:</td><td>" +
          district +
          "</td><tr>" +
          "<tr><td>Region:</td><td>" +
          region +
          "</td><tr>" +
          "<tr><td>Number of Girls Enrolled:</td><td>" +
          totalBoysData +
          "</td><tr>" +
          "<tr><td>Number of Boys Enrolled:</td><td>" +
          totalGrilsData +
          "</td><tr>" +
          "<tr><td>Total  Number of Schools:</td><td>" +
          totalSchoolsData +
          "</td><tr>" +
          "<tr><td>No. of Inspections in Term1:</td><td>" +
          inspectionData1 +
          "</td><tr>" +
          "<tr><td>No. of Inspections in Term2:</td><td>" +
          inspectionData2 +
          "</td><tr>" +
          "<tr><td>No. of Inspections in Term3:</td><td>" +
          inspectionData3 +
          "</td><tr>" +
          // "<tr><td>Latest Inspections:</td><td>" + max_inspectionData + "</td><tr>"
          "</table>"
      );
    })
    .catch(function(error) {
      // handle error
      console.log(error);
    })
    .finally(function() {
      // always executed
    });

  // Called for chart_attendance for each district
  axios
    .get(`/districtattendance-stats/${value}/${year_}`)
    .then(function(response) {
      // handle success

      let data = response.data;
      let district = data.district;
      let boysPlotAttend = data.boysAttend;
      let girlsPlotAttend = data.girlsAttend;
      let boysPlotEnrol = data.boysEnrol;
      let girlsPlotEnrol = data.girlsEnrol;
      // console.log(girlsPlotEnrol);

      // call the chart function
      chart_attendance_enrolment_district(
        district,
        boysPlotAttend,
        girlsPlotAttend,
        boysPlotEnrol,
        girlsPlotEnrol
      );

      // dataCollection(district,boysPlotAttend, girlsPlotAttend, boysPlotEnrol, girlsPlotEnrol );
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
    .get(`/districtteachAccordTT/${value}/${year_}`)
    .then(function(response) {
      // handle success

      let data = response.data;
      let district = data.district;
      let timetable = data.timetable;
      let inspections = data.inspections;

      // call the chart function
      chart_teach_accordToTT_district(district, timetable, inspections);
    })
    .catch(function(error) {
      // handle error
      console.log(error);
    })
    .finally(function() {
      // always executed
    });

  // Called for district attendance and enrolment stats for each district
  axios
    .get(`/districttrend-stats/${value}/${year_}`)
    .then(function(response) {
      // handle success
      let data = response.data;
      let district = data.district;
      let enrolPlot = data.enrol;
      let attendPlot = data.attend;
      let inspectionPlot = data.inspection;

      // call the chart function
      chart_attendance_enrolment_Trend_district(
        district,
        enrolPlot,
        attendPlot,
        inspectionPlot
      );

      // dataCollection('enrollment', district, boysPlot, girlsPlot);
    })
    .catch(function(error) {
      // handle error
      console.log(error);
    })
    .finally(function() {
      // always executed
    });

  // Called for teacher pupil ratio for each district
  axios
    .get(`/districtTPR-stats/${value}/${year_}`)
    .then(function(response) {
      // handle success
      // console.log(response.data);

      let data = response.data;
      let district = data.district;
      let p1top3Plot = data.p1top3;
      let p4top7Plot = data.p4top7;

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
  axios
    .get(`/districtSPR-stats/${value}/${year_}`)
    .then(function(response) {
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
    .catch(function(error) {
      // handle error
      console.log(error);
    })
    .finally(function() {
      // always executed
    });

  //called for classroom pupil ratio for district
  axios
    .get(`/districtCPR-stats/${value}/${year_}`)
    .then(function(response) {
      // handle success
      //console.log(response.data);

      let data = response.data;
      let district = data.district;
      let cp1top3Plot = data.cp1top3;
      let cp4top7Plot = data.cp4top7;

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

  //called for teacher stats for district
  axios
    .get(`/districtteacher-stats/${value}/${year_}`)
    .then(function(response) {
      // handle success

      let data = response.data;
      let district = data.district;
      let enrol = data.enrol;
      let staff = data.staff;
      let attend = data.attend;
      let timetable = data.timetable;

      // call the chart function
      teacher_stats_district(district, enrol, staff, attend, timetable);
    })
    .catch(function(error) {
      // handle error
      console.log(error);
    })
    .finally(function() {
      // always executed
    });

  //called for teacher stats Trends for district
  axios
    .get(`/districtrteacher_stats-Trend/${value}/${year_}`)
    .then(function(response) {
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
      teacher_stats_Trend_district(
        district,
        enrol,
        staff,
        attend,
        timetable,
        inspections
      );
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
    .get(`/districtpillars-stats/${value}/${year_}`)
    .then(function(response) {
      // handle success

      let data = response.data;
      let district = data.district;
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

      chartPillarDistrict(district, pillar1, pillar2, pillar3, pillar4);
    })
    .catch(function(error) {
      // handle error
      console.log(error);
    })
    .finally(function() {
      // always executed
    });

  //called for teacher stats Trends for district
  axios
    .get(`/districtpillar-trend-stats/${value}/${year_}`)
    .then(function(response) {
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
      district_pillar_trends(
        district,
        pillar1Score,
        pillar2Score,
        pillar3Score,
        pillar4Score,
        inspections
      );
    })
    .catch(function(error) {
      // handle error
      console.log(error);
    })
    .finally(function() {
      // always executed
    });
}

var myEnrolChart,
  myAttendChart,
  teacherRatio,
  StanceRatio,
  ClassroomRatio,
  myPillarChart;

//bar chart but is not dymaic it is hard coded values for district
function chart_attendance_enrolment_district(
  district,
  boysPlotAttend,
  girlsPlotAttend,
  boysPlotEnrol,
  girlsPlotEnrol
) {
  if (myEnrolChart) {
    myEnrolChart.destroy();
  }

  var ctxx = document.getElementById("superChart").getContext("2d");
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
        display: false,
        text: district
      },
      scales: {
        yAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: "Percentage"
            },
            ticks: {
              beginAtZero: true
            }
          }
        ]
      },
      tooltips: {
        mode: "label",
        callbacks: {
          label: function(tooltipItems, data) {
            return tooltipItems.yLabel + "%";
          }
        }
      }
    }
  });
}

//bar chart but is not dymaic it is hard coded values for district for the attendance
function chart_attendance_enrolment_Trend_district(
  district,
  enrolPlot,
  attendPlot,
  inspectionPlot
) {
  new Chart(document.getElementById("line-chart-trend"), {
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
        display: false,
        text: district
      },
      legend: {
        labels: {
          usePointStyle: true
        }
      },
      scales: {
        yAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: "Percentage"
            },
            ticks: {
              beginAtZero: true
            }
          }
        ]
      },
      tooltips: {
        mode: "label",
        callbacks: {
          label: function(tooltipItems, data) {
            return tooltipItems.yLabel + "%";
          }
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
  var randomColorFactor = function() {
    return Math.round(Math.random() * 255);
  };

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

  var ctx = document.getElementById("district_1").getContext("2d");
  teacherRatio = new Chart(ctx, config);
}

// Teacher stats at district level
function teacher_stats_district(district, enrol, staff, attend, timetable) {
  var ctxx = document.getElementById("TeacherChartDistrict").getContext("2d");
  var myChart = new Chart(ctxx, {
    type: "bar",
    data: {
      labels: [
        ["Established", " staffting", " as per ", "enrolment"],
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
        text: district
      },
      scales: {
        yAxes: [
          {
            display: true,
            ticks: {
              suggestedMax: 100, // maximum will be 0, unless there is a lower value.
              beginAtZero: true
            },
            scaleLabel: {
              display: true,
              labelString: "Percentage"
            }
          }
        ]
      },
      tooltips: {
        mode: "label",
        callbacks: {
          label: function(tooltipItems, data) {
            return tooltipItems.yLabel + "%";
          }
        }
      }
    }
  });
}

// Teacher stats trend at district level (teach according to timetable)
function chart_teach_accordToTT_district(district, timetable, inspections) {
  new Chart(document.getElementById("line-chart_timetable"), {
    type: "line",
    data: {
      labels: inspections,
      datasets: [
        {
          data: timetable,
          //   label: "Classes taught according to timetable",
          borderColor: "yellow",
          fill: false,
          lineTension: 0,
          pointStyle: "line"
        }
      ]
    },
    options: {
      title: {
        display: false,
        text: district
      },
      legend: {
        display: false
      },
      scales: {
        yAxes: [
          {
            display: true,
            ticks: {
              suggestedMax: 100, // maximum will be 0, unless there is a lower value.
              beginAtZero: true
            },
            scaleLabel: {
              display: true,
              labelString: "Percentage"
            }
          }
        ]
      },
      tooltips: {
        mode: "label",
        callbacks: {
          label: function(tooltipItems, data) {
            return tooltipItems.yLabel + "%";
          }
        }
      }
    }
  });
}

// Teacher stats trend at district level
function teacher_stats_Trend_district(
  district,
  enrol,
  staff,
  attend,
  timetable,
  inspections
) {
  new Chart(document.getElementById("line-chart"), {
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
        text: district
      },
      legend: {
        labels: {
          usePointStyle: true
        }
      },
      scales: {
        yAxes: [
          {
            display: true,
            ticks: {
              suggestedMax: 100, // maximum will be 0, unless there is a lower value.
              beginAtZero: true
            },
            scaleLabel: {
              display: true,
              labelString: "Percentage"
            }
          }
        ]
      },
      tooltips: {
        mode: "label",
        callbacks: {
          label: function(tooltipItems, data) {
            return tooltipItems.yLabel + "%";
          }
        }
      }
    }
  });
}

//stance to pupils ratio for district
function stance_ratio_district(
  district,
  sprboysPlot,
  sprgirlsPlot,
  sprovrallPlot
) {
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
            },
            tooltips: {
              mode: "label",
              callbacks: {
                label: function(tooltipItems, data) {
                  return tooltipItems.yLabel + "%";
                }
              }
            }
          }
        ]
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
      display: true,
      text: district
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

  var ctx = document.getElementById("district_3").getContext("2d");
  ClassroomRatio = new Chart(ctx, config);
}

function chartPillarDistrict(district, pillar1, pillar2, pillar3, pillar4) {
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
    var count = 0;
    pillar1Transpose.forEach(element => {
      count = count + element[0];
    });

    pillarTranspose.forEach(element => {
      for (let index = 0; index < element.length; index++) {
        element[index] = (element[index] / count) * 10;
      }      
    });
  
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
          // footer: function(tooltipItems, data) {
          //   var sum = 0;
  
          //   tooltipItems.forEach(function(tooltipItem) {
          //     sum +=
          //       data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
          //   });
          //   return "Number of Schools: " + sum;
          // }
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
  
    var ctx = document.getElementById("district_pillars");
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
            backgroundColor: "#008000",
            data: pillarTranspose[0]
          },
          {
            label: "B - (61% - 80%)",
            backgroundColor: "#FFFF00",
            data: pillarTranspose[1]
          },
          {
            label: "C - (41% - 60%)",
            backgroundColor: "#FFA500",
            data: pillarTranspose[2]
          },
          {
            label: "D - (25% - 40%)",
            backgroundColor: "#FF0000",
            data: pillarTranspose[3]
          }
        ]
      },
      options: barOptions_stacked
    });
  
    $(document).on("change", "#district", function() {
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
function district_pillar_trends(
  district,
  pillar1Score,
  pillar2Score,
  pillar3Score,
  pillar4Score,
  inspections
) {
  if (trendChart) {
    trendChart.destroy();
  }

  var trendChart = new Chart(document.getElementById("district_lineChart"), {
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
        text: district
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
