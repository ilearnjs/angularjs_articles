require('./index.css')

const app = angular.module('app', ['ui.router', 'ngResource']);

app.config((
	$locationProvider
) => {
	$locationProvider.html5Mode(true);
});