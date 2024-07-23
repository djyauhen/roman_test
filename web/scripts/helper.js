(() => {
    const itlogiaModalWindow = {
        url: 'http://ourproject.loc/',
        curse: 'front',

        // Инициализируем
        init: () => {
            itlogiaModalWindow.createStyles();
            itlogiaModalWindow.loader();

            // Создаем кнопку открытия модального окна
            const openButton = document.createElement('div');

            openButton.innerText = '?';
            openButton.className = 'itlogia-open-button';

            document.body.appendChild(openButton);
            openButton.addEventListener('click', async () => {
                itlogiaModalWindow.showLoader();

                let modalWindow = document.getElementById('itlogia-modal-window');

                if (modalWindow) {
                    itlogiaModalWindow.hideLoader();
                    modalWindow.style.display = 'block'
                } else {
                    await itlogiaModalWindow.createModalWindow();
                }
            })
        },

        //Создаем классы и пишем стили
        createStyles: () => {
            // Создание стиля
            const style = document.createElement('style');
            document.head.appendChild(style);

            // Получение объекта CSSStyleSheet
            let styleSheet = style.sheet;

            // Создание массива CSS классов и их стилей
            const stylesArray = [
                {
                    name: '.itlogia-open-button',
                    styles: 'position:fixed; display:flex; justify-content: center; align-items: center; width: 50px; height: 50px; border-radius: 50%; border: 1px solid blue; background-color: blue; bottom: 50px; right: 50px; cursor: pointer; color: white; font-weight: 700; font-size: 24px; z-index: 25'
                },
                {
                    name: '.itlogia-modal-window',
                    styles: 'position:fixed; display:none; bottom: -10%; right: -10%; transform: translate(-50%, -50%); width: 30%; max-width: 600px;  height: 60%; max-height: 700px; padding: 20px; background-color: #fff; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); z-index: 100; overflow-y: auto'
                },
                {
                    name: '.itlogia-close-modal-window',
                    styles: 'position:fixed; display:block; top: 10px; right: 10px; font-size: 20px; font-weight: 500; color: blue; cursor: pointer'
                },
                {
                    name: '.itlogia-modal-window-find',
                    styles: 'width: 100%; margin-bottom: 20px; border: 1px solid #ddd; padding: 10px; box-sizing: border-box'
                },
                {
                    name: '.itlogia-modal-title',
                    styles: 'margin-bottom: 20px; font-size: 24px; text-align: center;'
                },
                {
                    name: '.itlogia-categories-items',
                    styles: 'display: flex; flex-direction: column; gap: 10px;'
                },
                {
                    name: '.itlogia-categories-item',
                    styles: 'border: 1px solid #ddd; border-radius: 4px; padding: 10px; background-color: #f9f9f9; cursor: pointer; position: relative;'
                },
                {
                    name: '.itlogia-categories-item-title',
                    styles: 'font-size: 20px;'
                },
                {
                    name: '.itlogia-categories-item:hover',
                    styles: 'background-color: #f1f1f1;'
                },
                {
                    name: '.itlogia-subcategories-items',
                    styles: 'display: none; flex-direction: column; gap: 10px; margin-top: 10px;'
                },
                {
                    name: '.itlogia-article',
                    styles: 'border: 1px solid #ccc; padding: 10px; border-radius: 4px; background-color: #f0f0f0; cursor: pointer;'
                },
                {
                    name: '.itlogia-article-text',
                    styles: 'display: none; padding: 10px; margin-top: 10px; background-color: #e9e9e9;'
                },
                {
                    name: '.itlogia-article-text.visible, .itlogia-subcategories-items.visible',
                    styles: 'display: block;'
                },
                {
                    name: '.itlogia-loader-window',
                    styles: 'width: 100%; height: 100%; display: none; align-items: center; justify-content: center; position: fixed; top: 0; left: 0; background-color: rgba(0,0,0,0.7); z-index: 10000'
                },
                {
                    name: '.itlogia-loader-item',
                    styles: 'width: 48px; height: 48px; border: 5px solid #FFF; border-bottom-color: #FF3D00; border-radius: 50%; display: inline-block; box-sizing: border-box; animation: rotation 1s linear infinite;'
                },
                {
                    name: '@keyframes rotation',
                    styles: '0% {transform: rotate(0deg);}  100% {transform: rotate(360deg);}'
                },

            ]

            // Вставка правил стилей в CSSStyleSheet
            stylesArray.forEach(stylesItem => {
                styleSheet.insertRule(`${stylesItem.name} { ${stylesItem.styles}}`);
            })
        },

        //Создаем модальное окно
        createModalWindow: async () => {
            // Получаем категории
            const categories = await itlogiaModalWindow.getData(`${itlogiaModalWindow.url}categories-with-articles/${itlogiaModalWindow.curse}`);

            if (categories) {
                // Создаем модальное окно и вставляем в него заголовок
                let modalWindow = document.createElement('div');
                modalWindow.id = 'itlogia-modal-window';
                modalWindow.className = 'itlogia-modal-window';


                // Создаем кнопку закрытия модального окна и вешаем обработчик
                let closeModalWindow = document.createElement('div');
                closeModalWindow.innerText = 'X';
                closeModalWindow.className = 'itlogia-close-modal-window';

                closeModalWindow.addEventListener('click', () => {
                    modalWindow.style.display = 'none'
                })

                modalWindow.appendChild(closeModalWindow);


                //Создание заголовка и добавление его в модальное окно
                let modalWindowTitle = document.createElement('h2');
                modalWindowTitle.className = 'itlogia-modal-title';
                modalWindowTitle.innerText = 'База знаний';

                modalWindow.appendChild(modalWindowTitle);

                //Создание поиска и добавление его в модальное окно
                let modalWindowFind = document.createElement('input');
                modalWindowFind.placeholder = 'Введите поисковый запрос...';
                modalWindowFind.className = 'itlogia-modal-window-find';

                //Обработчик события
                modalWindowFind.addEventListener('keypress', async (event) => {
                    if ((event.key === "Enter") && (modalWindowFind.value !== '')) {
                        itlogiaModalWindow.showLoader();

                        let articleFindContainer = await itlogiaModalWindow.findArticleContent(modalWindowFind.value);

                        if (articleFindContainer) {
                            //Если есть статьи, то удаляем категории

                            modalWindow.childNodes.forEach(child => {
                                if (child.classList.contains('itlogia-categories-items')) {
                                    modalWindow.removeChild(child);
                                }
                            })

                            modalWindow.appendChild(articleFindContainer);
                            itlogiaModalWindow.hideLoader();
                        }
                    }
                    if ((event.key === "Enter") && (modalWindowFind.value === '')) {
                        //Возвращаем в div категории и статьи, поиск удаляем

                        itlogiaModalWindow.showLoader();

                        modalWindow.childNodes.forEach(child => {
                            if (child.classList.contains('itlogia-find-articles')) {
                                modalWindow.removeChild(child);
                            }
                        })

                        modalWindow.appendChild(categoriesElementContainer);
                        itlogiaModalWindow.hideLoader();
                    }
                })

                modalWindow.appendChild(modalWindowFind);


                //Создаем категории
                let categoriesElementContainer = await itlogiaModalWindow.createElementCategoriesContainer(categories);

                // Вставляем категории в модальное окно
                modalWindow.appendChild(categoriesElementContainer);

                // Вставляем модальное окно в тело документа
                document.body.appendChild(modalWindow);

                //Закрываем лоадер
                itlogiaModalWindow.hideLoader();
                // Показываем модальное окно
                modalWindow.style.display = 'block';

            } else return console.log('Ошибка создания модального окна');
        },


        // Создаем контейнер для категорий и наполняем его
        createElementCategoriesContainer: async (categories) => {
            let categoriesElementContainer = document.createElement('div');
            categoriesElementContainer.className = 'itlogia-categories-items';

            if (categories && categories.length !== 0) {
                // Создаем категории и добавляем их в контейнер
                for (const category of categories) {
                    const categoryElement = await itlogiaModalWindow.createCategory(category); // Делаем функцию асинхронной
                    categoriesElementContainer.appendChild(categoryElement);
                }
                return categoriesElementContainer;
            } else {
                return null
            }
        },

        // Создаем одну категорию
        createCategory: async (category) => {
            // Создадим элемент категории
            const categoryElement = document.createElement('div');
            categoryElement.className = "itlogia-categories-item";

            const categoryTitle = document.createElement('div');
            categoryTitle.className = 'itlogia-categories-item-title';
            categoryTitle.innerText = category.title;
            categoryElement.appendChild(categoryTitle);

            const subCategoriesElement = document.createElement('div');
            subCategoriesElement.className = 'itlogia-subcategories-items';
            categoryElement.appendChild(subCategoriesElement);

            categoryTitle.addEventListener('click', () => {
                subCategoriesElement.classList.toggle('visible');
            });

            // Если имеются подкатегории, то создаем их и добавляем в категорию
            if (category.subCategories) {
                for (const subCategoryItem of category.subCategories) {
                    const subCategory = await itlogiaModalWindow.createCategory(subCategoryItem); // Делаем функцию асинхронной
                    subCategoriesElement.appendChild(subCategory);
                }
            }

            // Добавим статьи
            if (category.articles) {
                for (const article of category.articles) {
                    let articleElement = itlogiaModalWindow.createArticleTitle(article);
                    subCategoriesElement.appendChild(articleElement);
                }
            }

            return categoryElement;
        },

        // Создаем заголовок статьи.
        createArticleTitle: (article) => {
            const articleElement = document.createElement('div');
            articleElement.className = "itlogia-article";

            articleElement.innerText = article.title;

            //Загружаем статью по клику
            articleElement.addEventListener('click', async () => {
                itlogiaModalWindow.showLoader();

                const articleContentElement = articleElement.children[0];

                if (!articleContentElement) {
                    //Если нет вложенных элементов, создаем его
                    let articleContent = await itlogiaModalWindow.createArticleContent(article.id);
                    articleElement.appendChild(articleContent);
                    itlogiaModalWindow.hideLoader();
                } else {
                    //Если имеется вложенный элемент, удаляем или добавляем класс visible
                    articleContentElement.classList.toggle('visible');
                    itlogiaModalWindow.hideLoader();
                }
            });

            return articleElement;
        },

        // Отрисуем статью по клику на ее заголовок
        createArticleContent: async (articleID) => {
            const article = await itlogiaModalWindow.getData(`${itlogiaModalWindow.url}article/${articleID}`);

            const articleElement = document.createElement('div');
            articleElement.className = 'itlogia-article-text visible';
            articleElement.innerHTML = article.content;
            return articleElement;
        },

        // Найдем статью по поиску
        findArticleContent: async (value) => {
            const articles = await itlogiaModalWindow.getData(`${itlogiaModalWindow.url}search?query=${value}`);

            if (articles) {
                let articlesFindContainer = document.createElement('div');
                articlesFindContainer.classList.add('itlogia-find-articles')

                for (let article of articles) {
                    let articleTitleElement = await itlogiaModalWindow.createArticleTitle(article);
                    articlesFindContainer.appendChild(articleTitleElement);
                }
                return articlesFindContainer;
            } else {
                return null;
            }
        },

        // Получаем данные
        getData: async (url) => {
            try {
                let response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Requested-With': 'XMLHttpRequest'
                    },
                });
                return await response.json();
            } catch (error) {
                console.log(error);
                return null;
            }
        },

        loaderWindow: document.createElement('div'),

        loader: () => {
            itlogiaModalWindow.loaderWindow.className = 'itlogia-loader-window';
            document.body.appendChild(itlogiaModalWindow.loaderWindow);

            let loaderItem = document.createElement('span');
            loaderItem.className = 'itlogia-loader-item';
            itlogiaModalWindow.loaderWindow.appendChild(loaderItem);
        },


        showLoader() {
            itlogiaModalWindow.loaderWindow.style.display = 'flex'
        },

        hideLoader() {
            itlogiaModalWindow.loaderWindow.style.display = 'none'
        }
    }



    itlogiaModalWindow.init();
})()



