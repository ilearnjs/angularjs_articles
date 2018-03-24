require('./article-edit.css');

angular.module('app')
	.component('articleEditComponent', {
		controller: articleEdit,
		template: require('./article-edit.html')
	});

function articleEdit($scope, $state, $stateParams, articleStore) {
	const self = this;
	const id = $stateParams.articleId;

	self.$onInit = () => {
		self.article = Object.assign({}, articleStore.getById(id));
	};

	self.submitForm = (isValid) => {
		self.submitted = true;
		if (!isValid) {
			return;
		}

		articleStore.editArticle(id, self.article);
		$state.go('article.all');
	};
}