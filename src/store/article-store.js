angular.module('app')
	.service('articleStore', articleStore);

function articleStore() {
	let id = 4;
	const store = this;
	const articleList = [
		{
			id: 1,
			title: 'React',
			content: 'Some news about React. And content must be long enough.',
			created: new Date('2/10/2018')
		},
		{
			id: 2,
			title: 'Angular',
			content: 'Some news about Angular. And content must be long enough.',
			created: new Date('3/18/2018')
		},
		{
			id: 3,
			title: 'Unit tests',
			content: 'Some news about Unut tests. And content must be long enough',
			created: new Date('3/22/2018')
		},
		{
			id: 4,
			title: 'Breakin news',
			content: 'Some Breakin news. And content must be long enough',
			created: new Date('3/25/2018')
		},
		{
			id: 5,
			title: 'Latest news',
			content: 'Some Latest news. And content must be long enough',
			created: new Date('3/27/2018')
		}
	];

	const behaviourSubject = new Rx.BehaviorSubject(articleList);

	store.allArticles$ = behaviourSubject.asObservable();

	store.getById = id => {
		return find(id);
	};

	store.addArticle = article => {
		const newArticle = Object.assign(
			{},
			article, {
				id: id++,
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

	function find(id) {
		return articleList.find(article => article.id === id);
	}

	function findIndex(id) {
		return articleList.findIndex(article => article.id === id);
	}
}