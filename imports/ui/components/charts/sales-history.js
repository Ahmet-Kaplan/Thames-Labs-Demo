import Chart from 'chart.js';
import { colours } from '/imports/api/lookup/colours.js';
import './sales-history.css';
import './sales-history.html';

/* Expects oppStats ReactiveObject with {oppsWon, oppsLost, oppsPending} arguments*/
Template.salesHistory.onRendered(function() {
  const currentInstance = Template.instance();
  this.autorun(function() {
    Chart.defaults.global.defaultFontFamily = 'Source Sans Pro';
    const data = currentInstance.data.oppStats;

    var ctx = document.getElementById("shContainer").getContext("2d");
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ["Won", "Lost", "Pending"],
        datasets: [{
          // label: '# of Opportunities',
          data: [data.oppsWon, data.oppsLost, data.oppsPending],
          backgroundColor: [
            colours.hex.green,
            colours.hex.redPink,
            colours.hex.yellow
          ],
          borderColor: [
            colours.hex.green,
            colours.hex.redPink,
            colours.hex.yellow
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