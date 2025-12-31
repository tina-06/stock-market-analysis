async function fetchStatsData() {
    try {
        const statsDataResponse = await fetch(`https://stock-market-api-k9vl.onrender.com/api/stocksstatsdata`);
        const statsData = await statsDataResponse.json();
        return statsData?.stocksStatsData?.[0];
    } catch (error) {
        console.log('Cannot Fetch Stock List')
    }


}

async function fetchDescriptionData() {
    try {
        const desDataResponse = await fetch('https://stock-market-api-k9vl.onrender.com/api/profiledata')
        const desData = await desDataResponse.json();
        return desData?.stocksProfileData?.[0];
    } catch (error) {
        console.log('Cannot fetch description')
    }
}

async function fetchChartData(params) {
    try {
        const chartDataResponse = await fetch('https://stock-market-api-k9vl.onrender.com/api/stocksdata');
        const chartDataJson = await chartDataResponse.json();
        const chartData = chartDataJson.stocksData[0];
        return chartData
    } catch (error) {
        console.log('Cannot fetch chart data', error)
    }
}

export { fetchStatsData, fetchDescriptionData, fetchChartData };