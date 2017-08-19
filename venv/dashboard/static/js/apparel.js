queue()
    .defer(d3.csv, "../static/apparel.csv")
    .await(makeGraphs);

function makeGraphs(error, region_data) {
	var data_series = region_data;
	var dateFormat = d3.time.format("%Y-%m-%d");
	var formatDate = d3.time.format("%y-%m");


	region_data.forEach(function (d) {
		d["year_month"] = dateFormat.parse(d["year_month"]);
		d["year_month"] = formatDate((d["year_month"]));
	});


	//Create a Crossfilter instance
	var ndx = crossfilter(data_series);

	//Define Dimensions
	var dateDim = ndx.dimension(function (d) {
		return d["year_month"];
	});
	var seasonDim = ndx.dimension(function (d) {
		return d["season"];
	});
	var colorsDim = ndx.dimension(function (d) {
		return d["colors"];
	});
	var materialDim = ndx.dimension(function (d) {
		return d["material"];
	});
	var trendyearDim = ndx.dimension(function (d) {
		return d["brand_year"];
	});
	var countryDim = ndx.dimension(function (d) {
		return d["country"];
	});
	var festivitiesDim = ndx.dimension(function (d) {
		return d["festivities"];
	});
	var themeDim = ndx.dimension(function (d) {
		return d["theme"];
	});


	//Calculate metrics
	var uploadDateGroup = dateDim.group().reduceCount();
	var seasonGroup = seasonDim.group().reduceCount();
	var colorsGroup = colorsDim.group().reduceCount();
	var materialGroup = materialDim.group().reduceCount();
	var trendyearGroup = trendyearDim.group().reduceCount();
	var countryGroup = countryDim.group().reduceCount();
	var festivitiesGroup = festivitiesDim.group().reduceCount();
	var themeGroup = themeDim.group().reduceCount();

	var all = ndx.groupAll();
	var freqCount = ndx.groupAll().reduceCount();




    //Charts
    //var yearChart = dc.pieChart("#year-chart");
    var uploadDateChart = dc.barChart("#date-chart");
	var seasonChart = dc.pieChart("#season-chart");
	var countChart = dc.numberDisplay("#count-chart");
	var colorsChart = dc.pieChart('#colors-chart');
	var materialChart = dc.rowChart('#material-chart');
	var trendyearChart = dc.rowChart('#trendyear-chart');
	var festivitiesChart = dc.pieChart('#festivities-chart');
	var themeChart = dc.pieChart('#theme-chart');

	countChart
		.formatNumber(d3.format("d"))
		.valueAccessor(function(d){return d; })
		.group(freqCount);


	uploadDateChart
		.width(950)
		.height(220)
		.margins({top: 10, right: 50, bottom: 40, left: 50})
		.dimension(dateDim)
		.group(uploadDateGroup)
		.x(d3.scale.ordinal())
		.xUnits(dc.units.ordinal)
		.elasticY(true)
		.colors("#FF8DA1")
		.yAxisLabel("photos uploaded")
		.xAxisLabel("Year-Month")
		.yAxis().ticks(6)

	;

	seasonChart
		.width(400)
		.height(200)
		//.slicesCap(4)
		.innerRadius(5)
		.dimension(seasonDim)
		.group(seasonGroup)
		.legend(dc.legend())
		.label(function(d) {
			return d.key + " (" + Math.floor(d.value / freqCount.value()*100)   + "%)";
		})
		.colors(d3.scale.ordinal().range(['#b3d9ff', '#3399ff', '#e6ac00', '#85e085', '#ffc34d', '#ff751a', '#adebeb']))
	;

	colorsChart
		.width(400)
		.height(200)
		//.slicesCap(4)
		.innerRadius(5)
		.dimension(colorsDim)
		.group(colorsGroup)
		.legend(dc.legend())
		.label(function(d) {
			return d.key + " (" + Math.floor(d.value / freqCount.value()*100)   + "%)";
		})
		.colors(d3.scale.ordinal().range(['#8c8c8c', '#80d4ff', '#b3b3ff', '#b3ffcc', '#ffc34d', '#ffcc99']))
	;



	materialChart
		.width(400)
        .height(250)
        .dimension(materialDim)
        .group(materialGroup)
		//.elasticX(true)
		.ordinalColors(['#a6a6a6', '#66a3ff', '#ffaa80', '#c6dbef', '#dadaeb'])

        .xAxis().ticks(6);

	trendyearChart
		.width(400)
        .height(250)
        .dimension(trendyearDim)
        .group(trendyearGroup)
		//.elasticX(true)
		.ordinalColors(['#4998d0', '#6baed6', '#9ecae1', '#c6dbef'])

        .xAxis().ticks(6);

	festivitiesChart
		.width(400)
		.height(200)
		//.slicesCap(4)
		.innerRadius(30)
		.dimension(festivitiesDim)
		.group(festivitiesGroup)
		.legend(dc.legend())
		.label(function(d) {
			return d.key + " (" + Math.floor(d.value / freqCount.value()*100)   + "%)";
		});

	themeChart
		.width(400)
		.height(200)
		//.slicesCap(4)
		.innerRadius(30)
		.dimension(themeDim)
		.group(themeGroup)
		.legend(dc.legend())
		.label(function(d) {
			return d.key + " (" + Math.floor(d.value / freqCount.value()*100)   + "%)";
		})
		.colors(d3.scale.ordinal().range(['#6699cc', '#00e673', '#cc99ff', '#ff9933', '#ffc34d']))
	;



	//countryGroup
	//	.width(400)
	//	.height(200)
	//	//.slicesCap(4)
	//	.innerRadius(5)
	//	.dimension(colorsDim)
	//	.group(colorsGroup)
	//	.legend(dc.legend())
	//	.label(function(d) {
	//		return d.key + " (" + Math.floor(d.value / freqCount.value()*100)   + "%)";
	//	});



    dc.renderAll();

}