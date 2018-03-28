const path = 'https://newsapi.org/v2/top-headlines?language=ru&apiKey=89b192969337425eb66621910ff1f9e8';

angular
	.module('app')
	.factory('articleResource', $resource => $resource(path));
