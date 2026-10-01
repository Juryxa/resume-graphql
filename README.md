# Portfolio GraphQL API

Backend-приложение на NestJS, отдающее через GraphQL персональные данные: профиль, навыки,
опыт работы и проекты.

**Демо:** https://api-juryxa-ca5b9eba.vercel.app/graphql — по ссылке откроется 
интерактивный Apollo Sandbox, из которого можно отправлять запросы.  
Также можно отправлять запросы из Apollo Sandbox Studio https://studio.apollographql.com/sandbox/explorer. 
Для этого в настройки подключения вставьте эту строку ```https://api-qfmxjuoit-juryxa-ca5b9eba.vercel.app/graphql```.

## Стек

- **NestJS** — schema-first GraphQL
- **Prisma ORM** 
- **SQLite**
- **TypeScript / ESM**
- **Docker** 


## База данных: подготовка и заполнение

Ручная настройка БД не требуется, база готовится по скрипту автоматически перед созданием контейнера.

## Запуск локально


### Через Docker

1. В терминале перейти в папку проекта

2. Вызвать команды ниже
```bash
docker build -t portfolio .
docker run -p 3000:3000 -e PORT=3000 portfolio
```

3. Открыть в браузере `http://localhost:3000/graphql` — встроенный Apollo Sandbox.

## GraphQL API
Схема целиком:

```graphql
scalar JSON
scalar DateTime

type Profile {
  name:        String!
  description: String!
  githubUrl:   String!
  linkedinUrl: String
  otherLinks:  JSON
  projects:       [Project!]!
  skills:         [Skill!]!
  workExperience: [WorkExperience!]!
}

type Project {
  name:        String!
  description: String!
  sourceUrl:   String!
  demoUrl:     String
}

type Skill {
  name:     String!
  category: String!
}

type WorkExperience {
  company:      String!
  position:     String!
  startDate:    DateTime!
  endDate:      DateTime!
  achievements: String!
}

type Query {
  profile:    Profile!
  skills:     [Skill!]!
  experience: [WorkExperience!]!
  projects:   [Project!]!
}
```

`DateTime` — ISO 8601 строка. `JSON` — произвольный объект json.

### Примеры запросов

Профиль со всеми связанными данными одним запросом:

```graphql
query {
  profile {
    name
    description
    githubUrl
    linkedinUrl
    otherLinks
    skills {
      name
      category
    }
    workExperience {
      company
      position
      startDate
      endDate
      achievements
    }
    projects {
      name
      description
      sourceUrl
      demoUrl
    }
  }
}
```

Те же данные отдельными запросами:

```graphql
query { 
  skills {
    name 
    category 
  } 
}
```

```graphql
query {
  experience {
    company
    position
    startDate
    endDate
    achievements
  }
}
```

```graphql
query { 
  projects { 
    name 
    description 
    sourceUrl 
    demoUrl 
  } 
}
```

## Переменные окружения

| Переменная     | Назначение                              | Пример                |
|----------------|------------------------------------------|------------------------|
| `PORT`         | порт, который слушает сервер             | `3000`                 |
| `NODE_ENV`     | режим запуска                            | `development` / `production` |
| `DATABASE_URL` | путь к SQLite-файлу    | `file:./dev.db`        |

