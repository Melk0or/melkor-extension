# Fullstack-проект: Сервер + Клиент + Расширение

Проект состоит из трёх логических компонентов:

1.  **Сервер (Backend)** — Node.js/Express API, работает в Docker-контейнере
2.  **Клиент (Frontend)** — React-приложение, работает в Docker-контейнере
3.  **Расширение (Extension)** — браузерное расширение, собирается в zip-архив и загружается вручную

---

##  Установка и запуск

### 1. Установи Docker

Перед началом убедись, что Docker и Docker Compose установлены:

- [Инструкция по установке Docker](https://docs.docker.com/engine/install/)
- [Инструкция по установке Docker Compose](https://docs.docker.com/compose/install/)

Проверь:

```bash
docker -v
docker compose version
```
# Клонируй репозиторий
```bash
git clone https://github.com/Melk0or/melkor-extension.git
cd melkor-extension
```
# Запусти все сервисы
docker compose up --build -d

# Загрузи dist.zip в Google Chrome