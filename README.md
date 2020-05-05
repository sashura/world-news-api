# World-news-api
v 1.0.0

Дипломный проект Яндекс.Практикум - сервис поиска новостей.
Доступен по адресу www.api.sashura-yamesto.ru

## Описание

Для работы с проектом и тестирования запросов необходимо установить и запустить npm run dev, для запросов использовать Postman

В проекте реализовано:
1. Создание пользователя - POST http://api.sashura-yamesto.ru/singup.
  В теле запроса поля с именами:
	"email"
	"password" 
	"name"

2. Авторизация пользователя - POST http://api.sashura-yamesto.ru/singin.
  В теле запроса поля с именами: "email", "password".

3. Создание новости (для авторизованного пользователя) - POST http://api.sashura-yamesto.ru/articles
  В теле запроса поля с именами: 
  "keyword"
	"date"
	"source"
	"link"
	"image"
	"title"
	"text"

4. Удаление новости по id (для авторизованного пользователя) - DELETE http://api.sashura-yamesto.ru/articles/{articleId}

5. Получение списка сохраненных (созданных) пользователем новостей (для авторизованного пользователя) - GET http://api.sashura-yamesto.ru/articles

6. Получение информации об авторизованном пользователе - GET http://api.sashura-yamesto.ru/users/me



