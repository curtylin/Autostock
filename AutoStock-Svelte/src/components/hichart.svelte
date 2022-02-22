<script lang="ts">
	import Highcharts from 'highcharts/highstock';
	import indicatorsAll from 'highcharts/indicators/indicators-all';
	import annotationsAdvanced from 'highcharts/modules/annotations-advanced';
	import priceIndicator from 'highcharts/modules/price-indicator';
	import fullScreen from 'highcharts/modules/full-screen';
	import stockTools from 'highcharts/modules/stock-tools';

	indicatorsAll(Highcharts);
	annotationsAdvanced(Highcharts);
	priceIndicator(Highcharts);
	fullScreen(Highcharts);
	stockTools(Highcharts);
</script>
