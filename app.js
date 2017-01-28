
var state = {
	liquors: ['Gin','Vodka','Bourbon','Scotch','Tequila','Rum','Brandy/Cognac','White Wine','Red Wine','Beer'],
	mixers: ['Club Soda','Tonic','Cola','Sprite','Ginger Ale','Orange Juice','Cranberry Juice','Tomato Juice','Pineapple Juice','Agnostura Bitters'],
	results: [],
	selectedliquors: [],
	selectedmixers: [],
	settings: {
		url: 'http://www.recipepuppy.com/api/',
		method: 'get',
		dataType: 'jsonp',
		jsonpCallback: 'logResults',
		data: {
			i: ''
		}
	}
}

function logResults(data) {
	console.log('logResults', data);
	state.results = data.results;
}

function main() {

	function renderLiquorList() {
		var liquorListHTML = state.liquors.map(function(liquor){
			return('<li class="ingredient">'+ liquor +'</li>')
		})
		$('.liquors ul').html(liquorListHTML);
	}

	function renderMixerList() {
		var mixerListHTML = state.mixers.map(function(mixer){
			return('<li class="ingredient">'+ mixer +'</li>')
		})
		$('.mixers ul').html(mixerListHTML);
	}

	function renderResultsList() {
		var resultsListHTML = state.results.map(function(result){
			return('<li class="result" style="background-image: url('+(result.thumbnail ? result.thumbnail : "http://placehold.it/100x100")+
				')">'+ '<a href="' + result.href + '"> </a> <span class="title">' + result.title + '</span>' +
			 '</li>')
		})
		$('.results ul').html(resultsListHTML);
	}

	function generateResults() {
		/*
			create new array of liquors and mixers by joining. 
			make API call to recipe puppy
			pass response to render results list.
		*/
		state.settings.data.i = state.selectedliquors.concat(state.selectedmixers).toString().toLowerCase().replace(/\//g, ' ');
		$.ajax(state.settings).done(function() {
  			renderResultsList();
		});

	}

	function bindLiquorClick() {
		/* 
			on click add 'highlight' class
			push name or index into state.selectedliquors 
			toggle class and remove from state.selected liquors if clicked again.
		*/
		$('.liquors ul').on('click', 'li',  function(event){
			$(this).toggleClass('highlight');
			if ($(this).hasClass('highlight')) {
				state.selectedliquors.push($(this).text());
			} else {
				var index = state.selectedliquors.indexOf($(this).text())
				state.selectedliquors.splice(index, 1);
			}
		})
	}

	function bindLiquorListNextButton() {
		/* 
			hide liquors list
			render mixer list and show.
		*/
		$('.liquors button').on('click', function(event) {
			renderMixerList();
			$('.liquors').addClass('hidden');
			$('.mixers').removeClass('hidden');
		})
	}

	function bindMixerClick() {
		/* 
			on click add 'highlight' class
			push name or index into state.selectedmixers
			toggle class and remove from state.selected liquors if clicked again.
		*/
		$('.mixers ul').on('click', 'li', function(event) {
			$(this).toggleClass('highlight');
			if ($(this).hasClass('highlight')) {
				state.selectedmixers.push($(this).text());
			} else {
				var index = state.selectedmixers.indexOf($(this).text())
				state.selectedmixers.splice(index, 1);
			}
		})
	}

	function bindMixerListNextButton() {
		/* 
			hide mixer list
			genereate results
		*/
		$('.mixers .next').on('click', function(event){
			$('.mixers').addClass('hidden');
			generateResults();
			$('.results').removeClass('hidden');
		})
	}

	function bindMixerListBackButton() {
		/* 
			hide mixer list
			genereate results
		*/
		$('.mixers .back').on('click', function(event){
			$('.mixers').addClass('hidden');
			$('.liquors').removeClass('hidden');
		})
	}

	function bindResultsBackButton() {
		$('.results .back').on('click', function(event){
			$('.results').addClass('hidden');
			$('.mixers').removeClass('hidden');
		})
	}

	function bindResultsResetButton() {
		$('.results .reset').on('click', function(event){
			state.selectedliquors = [];
			state.selectedmixers = [];
			$('.results').addClass('hidden');
			renderLiquorList();
			$('.liquors').removeClass('hidden');
		})
	}


	renderLiquorList();
	bindLiquorClick();
	bindLiquorListNextButton();
	bindMixerClick();
	bindMixerListBackButton();
	bindMixerListNextButton();
	bindResultsBackButton();
	bindResultsResetButton();

}



$(document).ready(main);