![alt text](https://i.imgur.com/ptYqZ6e.jpeg)

# Тестовое задание для VK Frontend Осень 2024

Сервис для просмотра списка фильмов

## Стэк:

React, TypeScript, MobX, CSS-модули, Vite, Jest (Vitest), React Testing Library, axios, Material UI

## Использованный API:

TMDB - https://developer.themoviedb.org/reference/intro/getting-started

**_Существует вероятность того, что для работы сервиса понадобится использовать VPN!_**

## Функционал:

- Бесконечный плавный скролл
- Постепенная подгрузка элементов
- Локальное удаление и редактирование (в сторе стейт-менеджера)
- Модульное тестирование
- Аутентификация
- Варианты сортировки
- Индикация подрузки данных (лоадер)

## Запуск приложения

```
npm i
npm run dev
```

Также можно запустить **деплой** проекта: - [Netlify](https://vk-test-kolificent.netlify.app/)

И **видео-демо** - [Google Drive](https://drive.google.com/file/d/10NrG4SIJw2Sds5hTQ-RnwPUpuFnJWKXA/view?usp=sharing)

## Вопросы и уточнения

_По какой-то причине API TMDB периодически присылает дубликаты фильмов, в связи с этим реализована функция проверки на дубликаты, но из-за этого замедляется приложение.
Подробнее в `filmsStore.ts -> validateFilms()`._

Обоснования выбора API TMDB:

- Больший список данных с многочисленными свойствами
- Функционал (пагинация, сортировка, фильтры и т.д.)
- Богатая документация

Обоснования выбора Material UI:

- Наличие опыта работы с технологией
- Богатая документация
- Широкий набор компонентов
- Разработан под React
- Простота использования
