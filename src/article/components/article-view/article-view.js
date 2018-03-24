require('./article-view.css');

angular.module('app')
	.component('articleViewComponent', {
		controller: articleView,
		template: require('./article-view.html')
	});

function articleView($scope, $state, $stateParams, articleStore) {
	const self = this;
	const id = $stateParams.articleId;

	self.$onInit = () => {
		self.article = articleStore.getById(id);
	};

	self.submitForm = (isValid) => {
		self.submitted = true;
		if (!isValid) {
			return;
		}

		articleStore.editArticle(id, self.editArticle);
		$state.go('article.all');
	};
}