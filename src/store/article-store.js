angular.module('app')
	.service('articleStore', articleStore);

function articleStore(articleResource) {
	const store = this;
	let articleList = [];

	const behaviourSubject = new Rx.BehaviorSubject();
	store.allArticles$ = behaviourSubject.asObservable();

	articleResource.get((aticles) => {
		articleList = aticles.articles.map(a => ({
			id: generateUid(),
			title: a.title,
			content: a.description,
			created: new Date(a.publishedAt),
		}));

		behaviourSubject.next(articleList);
	});

	store.getById = id => {
		return find(id);
	};

	store.addArticle = article => {
		const newArticle = Object.assign(
			{},
			article, {
				id: generateUid(),
				created: new Date(),
				completed: false
			}
		);

		articleList.push(newArticle);
		behaviourSubject.next(articleList);
	};

	store.deleteArticle = id => {
		const articleIndex = findIndex(id);
		articleList.splice(articleIndex, 1);
		behaviourSubject.next(articleList);
	};

	store.editArticle = (id, article) => {
		const existingArticle = find(id);
		existingArticle.title = article.title;
		existingArticle.content = article.content;
		behaviourSubject.next(articleList);
	};

	function generateUid() {
		return Math.random().toString(36).substr(2, 9);
	}

	function find(id) {
		return articleList.find(article => article.id === id);
	}

	function findIndex(id) {
		return articleList.findIndex(article => article.id === id);
	}
}