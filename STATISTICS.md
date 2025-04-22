---
title: STATISTICS
layout: plain
sitemap: false
permalink: /statistics/
---

<div class="statistics-container">
  <p>Total Page Views: <span id="totalPageViews">-</span></p>
  <div id="cityStats"></div>
</div>

<!-- Load the Google Analytics API library -->
<script src="https://apis.google.com/js/api.js"></script>
<script>
// GA4 configuration
const GA_PROPERTY_ID = 'G-G3P4GRGGCC'; // 替换为你的 GA4 属性 ID
const API_KEY = 'AIzaSyC3P4GRGGCC'; // 替换为你的 API Key

// Initialize the Analytics Data API client
function initializeGaApi() {
  gapi.client.init({
    apiKey: API_KEY,
    discoveryDocs: ['https://analyticsdata.googleapis.com/$discovery/rest?version=v1beta']
  }).then(() => {
    runReport();
  }).catch(error => {
    console.error('初始化 GA API 失败:', error);
  });
}

// Fetch analytics data by city
async function runReport() {
  try {
    const response = await gapi.client.analyticsdata.properties.runReport({
      property: `properties/${GA_PROPERTY_ID}`,
      resource: {
        dateRanges: [{
          startDate: '2020-03-31',
          endDate: 'today'
        }],
        dimensions: [{
          name: 'city'
        }],
        metrics: [{
          name: 'activeUsers'
        }]
      }
    });

    // Display total users
    const totalUsers = response.result.rows.reduce((sum, row) => 
      sum + parseInt(row.metricValues[0].value), 0);
    document.getElementById('totalPageViews').textContent = totalUsers;

    // Display city-wise statistics
    const cityStatsHtml = response.result.rows
      .map(row => `<p>${row.dimensionValues[0].value}: ${row.metricValues[0].value} 访问</p>`)
      .join('');
    document.getElementById('cityStats').innerHTML = cityStatsHtml;

  } catch (error) {
    console.error('获取数据失败:', error);
    document.getElementById('totalPageViews').textContent = 'Error';
  }
}

// Load and initialize the API client
gapi.load('client', initializeGaApi);
</script>

<style>
.statistics-container {
  padding: 20px;
  text-align: center;
  font-size: 1.2em;
}

#cityStats {
  margin-top: 20px;
  font-size: 0.9em;
}

#cityStats p {
  margin: 5px 0;
}
</style>



