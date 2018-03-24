require('./index.css')

const app = angular.module('app', ['ui.router']);

app.config((
	$locationProvider
) => {
	$locationProvider.html5Mode(true);
});