(function ($) {
  "use strict";

  /*-------------------------------------
      Sidebar Toggle Menu
    -------------------------------------*/
  $('.sidebar-toggle-view').on('click', '.sidebar-nav-item .nav-link', function (e) {
    if (!$(this).parents('#wrapper').hasClass('sidebar-collapsed')) {
      var animationSpeed = 300,
        subMenuSelector = '.sub-group-menu',
        $this = $(this),
        checkElement = $this.next();
      if (checkElement.is(subMenuSelector) && checkElement.is(':visible')) {
        checkElement.slideUp(animationSpeed, function () {
          checkElement.removeClass('menu-open');
        });
        checkElement.parent(".sidebar-nav-item").removeClass("active");
      } else if ((checkElement.is(subMenuSelector)) && (!checkElement.is(':visible'))) {
        var parent = $this.parents('ul').first();
        var ul = parent.find('ul:visible').slideUp(animationSpeed);
        ul.removeClass('menu-open');
        var parent_li = $this.parent("li");
        checkElement.slideDown(animationSpeed, function () {
          checkElement.addClass('menu-open');
          parent.find('.sidebar-nav-item.active').removeClass('active');
          parent_li.addClass('active');
        });
      }
      if (checkElement.is(subMenuSelector)) {
        e.preventDefault();
      }
    } else {
      if ($(this).attr('href') === "#") {
        e.preventDefault();
      }
    }
  });

  /*-------------------------------------
      Sidebar Menu Control
    -------------------------------------*/
  $(".sidebar-toggle").on("click", function () {
    window.setTimeout(function () {
      $("#wrapper").toggleClass("sidebar-collapsed");
    }, 500);
  });

  /*-------------------------------------
      Sidebar Menu Control Mobile
    -------------------------------------*/
  $(".sidebar-toggle-mobile").on("click", function () {
    $("#wrapper").toggleClass("sidebar-collapsed-mobile");
    if ($("#wrapper").hasClass("sidebar-collapsed")) {
      $("#wrapper").removeClass("sidebar-collapsed");
    }
  });

  /*-------------------------------------
      jquery Scollup activation code
   -------------------------------------*/
  $.scrollUp({
    scrollText: '<i class="ri-arrow-up-s-line"></i>',
    easingType: "linear",
    scrollSpeed: 900,
    animation: "fade"
  });

  /*-------------------------------------
      jquery Scollup activation code
    -------------------------------------*/
  $("#preloader").fadeOut("slow", function () {
    $(this).remove();
  });

  $(function () {
    /*-------------------------------------
          Data Table init
      -------------------------------------*/
    if ($.fn.DataTable !== undefined) {
      $('.data-table').DataTable({
        paging: true,
        searching: false,
        info: false,
        lengthChange: false,
        lengthMenu: [20, 50, 75, 100],
        columnDefs: [{
          targets: [0, -1], // column or columns numbers
          orderable: false // set orderable for selected columns
        }],
      });
    }

    /*-------------------------------------
          All Checkbox Checked
      -------------------------------------*/
    $(".checkAll").on("click", function () {
      $(this).parents('.table').find('input:checkbox').prop('checked', this.checked);
    });

    /*-------------------------------------
          Tooltip init
      -------------------------------------*/
    $('[data-toggle="tooltip"]').tooltip();

    /*-------------------------------------
          Select 2 Init
      -------------------------------------*/
    if ($.fn.select2 !== undefined) {
      $('.select2').select2({
        width: '100%'
      });
    }

    /*-------------------------------------
          Date Picker
      -------------------------------------*/
    if ($.fn.datepicker !== undefined) {
      $('.air-datepicker').datepicker({
        language: {
          days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          daysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
          daysMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
          months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
          monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          today: 'Today',
          clear: 'Clear',
          dateFormat: 'dd/mm/yyyy',
          firstDay: 0
        }
      });
    }

    /*-------------------------------------
          Counter
      -------------------------------------*/
    var counterContainer = $(".counter");
    if (counterContainer.length) {
      counterContainer.counterUp({
        delay: 50,
        time: 1000
      });
    }

    /*-------------------------------------
          Vector Map 
      -------------------------------------*/
    if ($.fn.vectorMap !== undefined) {
      $('#world-map').vectorMap({
        map: 'world_mill',
        zoomButtons: false,
        backgroundColor: 'transparent',

        regionStyle: {
          initial: {
            fill: '#0070ba'
          }
        },
        focusOn: {
          x: 0,
          y: 0,
          scale: 1
        },
        series: {
          regions: [{
            values: {
              CA: '#41dfce',
              RU: '#f50056',
              US: '#f50056',
              IT: '#f50056',
              AU: '#fbd348'
            }
          }]
        }
      });
    }

    /*-------------------------------------
          Line Chart 
      -------------------------------------*/
    if ($("#earning-line-chart").length) {

      var lineChartData = {
        labels: ["", "Travel", "Stationary", "Book", "Food", "Equipment", "Living", "Buddy", ""],
        datasets: [{
            data: [0, 5e4, 1e4, 5e4, 14e3, 7e4, 5e4, 75e3, 5e4],
            backgroundColor: '#ff0000',
            borderColor: '#ff0000',
            borderWidth: 1,
            pointRadius: 0,
            pointBackgroundColor: '#ff0000',
            pointBorderColor: '#ffffff',
            pointHoverRadius: 6,
            pointHoverBorderWidth: 3,
            fill: 'origin',
            label: "Actual Allowance Disbursed"
          },
          {
            data: [0, 2e4, 1e4, 6e4, 5e4, 10e4, 7e4, 7e4, 8e4],
            backgroundColor: 'yellow',
            borderColor: 'yellow',
            borderWidth: 1,
            pointRadius: 0,
            pointBackgroundColor: 'yellow',
            pointBorderColor: 'yellow',
            pointHoverRadius: 6,
            pointHoverBorderWidth: 3,
            fill: 'origin',
            label: "Discrepancy"
          },
          {
            data: [0, 3e4, 2e4, 7e4, 7e4, 5e4, 5e4, 9e4, 8e4],
            backgroundColor: '#417dfc',
            borderColor: '#417dfc',
            borderWidth: 1,
            pointRadius: 0,
            pointBackgroundColor: '#304ffe',
            pointBorderColor: '#ffffff',
            pointHoverRadius: 6,
            pointHoverBorderWidth: 3,
            fill: 'origin',
            label: "Allowance Calculated"
          }
        ]
      };
      var lineChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          duration: 2000
        },
        scales: {

          xAxes: [{
            display: true,
            ticks: {
              display: true,
              fontColor: "#222222",
              fontSize: 16,
              padding: 20
            },
            gridLines: {
              display: true,
              drawBorder: true,
              color: '#cccccc',
              borderDash: [5, 5]
            }
          }],
          yAxes: [{
            display: true,
            ticks: {
              display: true,
              autoSkip: true,
              maxRotation: 0,
              fontColor: "#646464",
              fontSize: 16,
              stepSize: 25000,
              padding: 20,
              callback: function (value) {
                var ranges = [{
                    divider: 1e6,
                    suffix: 'M'
                  },
                  {
                    divider: 1e3,
                    suffix: 'k'
                  }
                ];

                function formatNumber(n) {
                  for (var i = 0; i < ranges.length; i++) {
                    if (n >= ranges[i].divider) {
                      return (n / ranges[i].divider).toString() + ranges[i].suffix;
                    }
                  }
                  return n;
                }
                return formatNumber(value);
              }
            },
            gridLines: {
              display: true,
              drawBorder: false,
              color: '#cccccc',
              borderDash: [5, 5],
              zeroLineBorderDash: [5, 5],
            }
          }]
        },
        legend: {
          display: false
        },
        tooltips: {
          mode: 'index',
          intersect: false,
          enabled: true
        },
        elements: {
          line: {
            tension: .35
          },
          point: {
            pointStyle: 'circle'
          }
        }
      };
      var earningCanvas = $("#earning-line-chart").get(0).getContext("2d");
      var earningChart = new Chart(earningCanvas, {
        type: 'line',
        data: lineChartData,
        options: lineChartOptions
      });
    }

    /*-------------------------------------
          Bar Chart 
      -------------------------------------*/
    if ($("#expense-bar-chart").length) {

      var barChartData = {
        labels: ["Jan", "Feb", "Mar"],
        datasets: [{
          backgroundColor: ["#40dfcd", "#417dfc", "#ffaa01"],
          data: [125000, 100000, 75000, 50000, 150000],
          label: "Expenses (millions)"
        }, ]
      };
      var barChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          duration: 2000
        },
        scales: {

          xAxes: [{
            display: false,
            maxBarThickness: 100,
            ticks: {
              display: false,
              padding: 0,
              fontColor: "#646464",
              fontSize: 14,
            },
            gridLines: {
              display: true,
              color: '#e1e1e1',
            }
          }],
          yAxes: [{
            display: true,
            ticks: {
              display: true,
              autoSkip: false,
              fontColor: "#646464",
              fontSize: 14,
              stepSize: 25000,
              padding: 20,
              beginAtZero: true,
              callback: function (value) {
                var ranges = [{
                    divider: 1e6,
                    suffix: 'M'
                  },
                  {
                    divider: 1e3,
                    suffix: 'k'
                  }
                ];

                function formatNumber(n) {
                  for (var i = 0; i < ranges.length; i++) {
                    if (n >= ranges[i].divider) {
                      return (n / ranges[i].divider).toString() + ranges[i].suffix;
                    }
                  }
                  return n;
                }
                return formatNumber(value);
              }
            },
            gridLines: {
              display: true,
              drawBorder: true,
              color: '#e1e1e1',
              zeroLineColor: '#e1e1e1'

            }
          }]
        },
        legend: {
          display: false
        },
        tooltips: {
          enabled: true
        },
        elements: {}
      };
      var expenseCanvas = $("#expense-bar-chart").get(0).getContext("2d");
      var expenseChart = new Chart(expenseCanvas, {
        type: 'bar',
        data: barChartData,
        options: barChartOptions
      });
    }

    /*-------------------------------------
          Stacked Chart 
      -------------------------------------*/
      if ($("#expense-bar-chart1").length) {
        var barChartData = {
            labels: ["Jan", "Feb", "Mar"],
            datasets: [{
                backgroundColor: "#40dfcd", // Color for the first segment
                data: [125000, 100000, 75000], // Data for the first segment
                label: "Expenses (Category 1)"
            }, {
                backgroundColor: "#417dfc", // Color for the second segment
                data: [50000, 150000, 100000], // Data for the second segment
                label: "Expenses (Category 2)"
            }, {
                backgroundColor: "#ffaa01", // Color for the third segment
                data: [0, 0, 0], // Data for the third segment, if needed
                label: "Expenses (Category 3)"
            }]
        };
    
        var barChartOptions = {
            responsive: true,
            indexAxis: 'y', // Ensure the chart is horizontal
            maintainAspectRatio: false,
            animation: {
                duration: 2000
            },
            scales: {
                x: {
                    stacked: true, // Enable stacking on x-axis (now horizontal)
                    display: true,
                    ticks: {
                        display: true,
                        padding: 0,
                        color: "#646464",
                        font: {
                            size: 14
                        },
                        beginAtZero: true
                    },
                    grid: {
                        display: true,
                        color: '#e1e1e1'
                    }
                },
                y: {
                    stacked: true, // Enable stacking on y-axis (now vertical)
                    display: true,
                    ticks: {
                        display: true,
                        color: "#646464",
                        font: {
                            size: 14
                        },
                        padding: 20
                    },
                    grid: {
                        display: true,
                        borderColor: '#e1e1e1',
                        color: '#e1e1e1',
                        zeroLineColor: '#e1e1e1'
                    }
                }
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                },
                tooltip: {
                    enabled: true
                }
            }
        };
    
        var expenseCanvas = $("#expense-bar-chart1").get(0).getContext("2d");
        var expenseChart = new Chart(expenseCanvas, {
            type: 'bar', // Use 'bar' for horizontal bars
            data: barChartData,
            options: barChartOptions
        });
    }
    

    /*-------------------------------------
          Treemap Chart 
      -------------------------------------*/
    

    /*-------------------------------------
          Doughnut Chart 
      -------------------------------------*/
    if ($("#student-doughnut-chart").length) {

      var doughnutChartData = {
        labels: ["Female Students", "Male Students"],
        datasets: [{
          backgroundColor: ["#304ffe", "#ffa601"],
          data: [300, 304],
          label: "Total Students"
        }, ]
      };
      var doughnutChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        cutoutPercentage: 65,
        rotation: -9.4,
        animation: {
          duration: 2000
        },
        legend: {
          display: false
        },
        tooltips: {
          enabled: true
        },
      };
      var studentCanvas = $("#student-doughnut-chart").get(0).getContext("2d");
      var studentChart = new Chart(studentCanvas, {
        type: 'doughnut',
        data: doughnutChartData,
        options: doughnutChartOptions
      });
    }
    if ($("#query-doughnut-chart").length) {

      var doughnutChartData = {
        labels: ["Resolved Queries", "Pending Queries"],
        datasets: [{
          backgroundColor: ["#4caf50", "#f44336"], // Green for resolved, Red for pending
          data: [30, 60], // Replace these numbers with your actual counts
          label: "Query Status"
        }]
      };
    
      var doughnutChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        cutoutPercentage: 65,
        rotation: -9.4,
        animation: {
          duration: 2000
        },
        legend: {
          display: true, // Display the legend
          position: 'top' // Position the legend at the top
        },
        tooltips: {
          enabled: true,
          callbacks: {
            label: function(tooltipItem, data) {
              var dataset = data.datasets[tooltipItem.datasetIndex];
              var currentValue = dataset.data[tooltipItem.index];
              return data.labels[tooltipItem.index] + ': ' + currentValue;
            }
          }
        },
      };
    
      var studentCanvas = $("#query-doughnut-chart").get(0).getContext("2d");
      var studentChart = new Chart(studentCanvas, {
        type: 'doughnut',
        data: doughnutChartData,
        options: doughnutChartOptions
      });
    }
    
    if ($("#degree-doughnut-chart").length) {

      var doughnutChartData = {
        labels: ["BCom", "BSc","Engineering","Accounting","Medicine","Pharmacy", "LLB"],
        datasets: [{
          backgroundColor: ["#304ffe", "#ffa601", "#40dfcd", "#00c853","#546ca9" , "#f939a1" , "#1cbbb4"],
          data: [230, 105,98,120,59,70,80],
          label: "Degree"
        }, ]
      };
      var doughnutChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        cutoutPercentage: 65,
        rotation: -9.4,
        animation: {
          duration: 2000
        },
        legend: {
          display: false
        },
        tooltips: {
          enabled: true
        },
      };
      var studentCanvas = $("#degree-doughnut-chart").get(0).getContext("2d");
      var studentChart = new Chart(studentCanvas, {
        type: 'doughnut',
        data: doughnutChartData,
        options: doughnutChartOptions
      });
    }
    if ($("#allowance-category-doughnut-chart").length) {
      // Define all data values
      var foodAllowance = 2300;
      var livingAllowance = 10500;
      var booksAllowance = 980;
      var travelAllowance = 1500; // Example value for Travel
  
      var doughnutChartData = {
          labels: ["Food", "Living", "Books", "Travel"], // Updated label for Travel
          datasets: [{
              backgroundColor: ["#304ffe", "#ffa601", "#40dfcd", "#00c853"],
              data: [foodAllowance, livingAllowance, booksAllowance, travelAllowance], // Use defined variables
              label: "Allowance Categories"
          }]
      };
  
      var doughnutChartOptions = {
          responsive: true,
          maintainAspectRatio: false,
          cutoutPercentage: 65,
          rotation: -9.4,
          animation: {
              duration: 2000
          },
          legend: {
              display: true // Show legend for better understanding
          },
          tooltips: {
              enabled: true
          }
      };
  
      var studentCanvas = $("#allowance-category-doughnut-chart").get(0).getContext("2d");
      var studentChart = new Chart(studentCanvas, {
          type: 'doughnut',
          data: doughnutChartData,
          options: doughnutChartOptions
      });
  }
   if ($("#uni-doughnut-chart").length) {
      var doughnutChartData = {
        labels: ["WITS", "UCT", "UJ", "SUN", "UP", "UFS", "UKZN", "NMU", "UWC", "RHODES"],
        datasets: [{
          backgroundColor: ["#304ffe", "#ffa601", "#40dfcd", "#00c853", "#546ca9", "#f939a1", "#1cbbb4", "#ff0000", "#ff8c00", "#8b00ff"],
          data: [230, 105, 98, 120, 59, 70, 45, 35, 25, 17],
          label: "University"
        }]
      };
    
      var doughnutChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        cutoutPercentage: 65,
        rotation: -9.4,
        animation: {
          duration: 2000
        },
        legend: {
          display: false
        },
        tooltips: {
          enabled: true
        },
      };
    
      var studentCanvas = $("#uni-doughnut-chart").get(0).getContext("2d");
      var studentChart = new Chart(studentCanvas, {
        type: 'doughnut',
        data: doughnutChartData,
        options: doughnutChartOptions
      });
    }
    
    if ($("#fund-doughnut-chart").length) {
      var doughnutChartData = {
        labels: ["NSFAS Funded", "Partially Funded - External Funding", "Fully Funded"],
        datasets: [{
          backgroundColor: ["#ffa601", "#00c853", "#304ffe"],
          data: [300, 200, 104], // Adjust the numbers based on your actual data
          label: "Funding Status"
        }]
      };
    
      var doughnutChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        cutoutPercentage: 65,
        rotation: -9.4,
        animation: {
          duration: 2000
        },
        legend: {
          display: false
        },
        tooltips: {
          enabled: true
        },
      };
    
      var studentCanvas = $("#fund-doughnut-chart").get(0).getContext("2d");
      var studentChart = new Chart(studentCanvas, {
        type: 'doughnut',
        data: doughnutChartData,
        options: doughnutChartOptions
      });
    }
    
    /*-------------------------------------
          Calender initiate 
      -------------------------------------*/
    if ($.fn.fullCalendar !== undefined) {
      $('#fc-calender').fullCalendar({
        header: {
          center: 'basicDay,basicWeek,month',
          left: 'title',
          right: 'prev,next',
        },
        fixedWeekCount: false,
        navLinks: true, // can click day/week names to navigate views
        editable: true,
        eventLimit: true, // allow "more" link when too many events
        aspectRatio: 1.8,
        events: [{
            title: 'All Day Event',
            start: '2019-04-01'
          },

          {
            title: 'Meeting',
            start: '2019-04-12T14:30:00'
          },
          {
            title: 'Happy Hour',
            start: '2019-04-15T17:30:00'
          },
          {
            title: 'Birthday Party',
            start: '2019-04-20T07:00:00'
          }
        ]
      });
    }
  });

})(jQuery);