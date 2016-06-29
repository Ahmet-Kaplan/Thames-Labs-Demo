import Chart from 'chart.js';
import { Tracker } from 'meteor/tracker';
import './sales-history.css';
import './sales-history.html';

/* Expects oppStats ReactiveObject with {oppsWon, oppsLost, oppsPending} arguments*/
Template.salesHistory.onRendered(function() {
  const currentInstance = Template.instance();
  Tracker.autorun(function() {
    Chart.defaults.global.defaultFontFamily = 'Source Sans Pro';
    const data = currentInstance.data.oppStats.get();

    var ctx = document.getElementById("shContainer").getContext("2d");
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ["Won", "Lost", "Pending"],
        datasets: [{
          // label: '# of Opportunities',
          data: [data.oppsWon, data.oppsLost, data.oppsPending],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        title: {
          display: false
        },
        legend: {
          display: false
        },
        scales: {
          yAxes: [{
            ticks: {
              stepSize: 1,
              beginAtZero: true
            }
          }]
        }
      }
    });
  });
});