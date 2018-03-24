require('./article-new.css');

angular.module('app')
	.component('articleNewComponent', {
		controller: articleNew,
		template: require('./article-new.html')
	});

function articleNew($scope, $state, articleStore) {
	const self = this;

	self.submitted = false;

	self.$onInit = () => {
		self.newArticle = {
			title: '',
			content: '',
		};
	};

	self.submitForm = (isValid) => {
		self.submitted = true;
		if (!isValid) {
			return;
		}

		articleStore.addArticle(self.newArticle);
		$state.go('article.all');
	};
}