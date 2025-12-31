import { fetchStatsData, fetchDescriptionData, fetchChartData } from './apis.js'


let currentStock = 'AAPL';
let currentSpan = '1y'

async function showList() {
    const listContainEle = document.querySelector('#list')
    const statsData = await fetchStatsData();
    if (statsData) {
        for (const comp in statsData) {
            if (comp === '_id') continue
            const profit = statsData[comp]['profit'].toFixed(2)
            const stockInfoDiv = document.createElement('div');
            const span1 = document.createElement('span')
            const span2 = document.createElement('span')
            const span3 = document.createElement('span')
            span1.addEventListener('click', function () {
                currentStock = comp;
                showSumamry();
                populateChart();
            })
            span1.textContent = comp;
            span2.textContent = `$${statsData[comp]['bookValue']}`
            span3.textContent = `${profit}%`
            if (profit > 0) {
                span3.style.color = 'limegreen'
            } else {
                span3.style.color = 'red'
            }
            stockInfoDiv.append(span1, span2, span3);
            listContainEle.appendChild(stockInfoDiv)
        }
    }
}

async function showSumamry() {
    const summaryTextEl = document.getElementById('summary-text')
    const descriptionData = await fetchDescriptionData();
    const descriptionDataText = descriptionData[currentStock]?.summary
    summaryTextEl.textContent = descriptionDataText
}

async function populateChart() {
    const chartData = await fetchChartData();
    const currentChartData = chartData[currentStock];
    const currentStockValue = currentChartData[currentSpan].value
    const year1TimeStamp = currentChartData[currentSpan].timeStamp
    const year1TimeValue = currentStockValue.map(value => `$${value.toFixed(2)}`)
    const dates = year1TimeStamp.map(ts => new Date(ts * 1000));

    const maxValue = Math.max(...currentStockValue);
    const minValue = Math.min(...currentStockValue);
    const maxValueText = `$${maxValue.toFixed(2)}`;
    const minValueText = `$${minValue.toFixed(2)}`;
    const maxIndex = currentStockValue.indexOf(maxValue);
    const minIndex = currentStockValue.indexOf(minValue);

    const traceLine = {
        x: dates,
        y: year1TimeValue,
        type: 'scatter',
        mode: 'lines+markers',
        line: { color: 'limegreen', width: 2 },
        name: '',
        marker: { color: 'limegreen', size: 4 },
    }

    const tracePoints = {
        x: [dates[maxIndex], dates[minIndex]],
        y: [maxValue, minValue],
        mode: 'markers+text',
        text: ['Peak', 'Low'],
        textposition: ['top center', 'bottom center'],
        textfont: { color: 'white', size: 14 },
        marker: { color: ['red', 'cyan'], size: 10, symbol: 'circle' },
        hoverinfo: 'none'
    };

    const layout = {
        plot_bgcolor: '#1a1a47',
        paper_bgcolor: '#1a1a47',
        margin: { l: 0, r: 0, t: 0, b: 0 },
        xaxis: {
            visible: false
        },
        yaxis: {
            visible: false
        },
        showlegend: false
    };

    const config = {
        displayModeBar: false,
        displaylogo: false,
        responsive: true
    }
    Plotly.newPlot('chart', [traceLine, tracePoints], layout, config);
}

function changeSpan(span) {
    currentSpan = span;
    populateChart();
}

window.changeSpan = changeSpan;

showList().then(() => {
    showSumamry();
    populateChart();
})