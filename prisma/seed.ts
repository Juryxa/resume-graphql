import 'dotenv/config';
import { Prisma, PrismaClient } from '../src/generated/prisma/client.js';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';

const adapter = new PrismaBetterSqlite3({ url: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  const profile = await prisma.profile.upsert({
    where: { githubUrl: 'https://github.com/Juryxa' },
    update: {
      name: 'Вячеслав Кондратьев',
      description:
        'Fullstack-разработчик с профильным техническим образованием (МИРЭА, ' +
        'Информационные системы и технологии). Специализируюсь на стеке ' +
        'React/Next.js + Nest.js/FastAPI + PostgreSQL, отдельно интересуюсь ' +
        'криптографией и защитой данных — применял end-to-end шифрование и ' +
        'TOTP-аутентификацию в реальных проектах. Есть опыт соло-разработки ' +
        'полного цикла и лидерства в команде на хакатонах.',
      linkedinUrl: null,
      otherLinks: {
        telegram: 'https://t.me/juryxa',
        email: 'kondratevvyacheslav04@gmail.com',
      } satisfies Prisma.InputJsonValue,
    },
    create: {
      name: 'Вячеслав Кондратьев',
      description:
        'Fullstack-разработчик с профильным техническим образованием (МИРЭА, ' +
        'Информационные системы и технологии). Специализируюсь на стеке ' +
        'React/Next.js + Nest.js/FastAPI + PostgreSQL, отдельно интересуюсь ' +
        'криптографией и защитой данных — применял end-to-end шифрование и ' +
        'TOTP-аутентификацию в реальных проектах. Есть опыт соло-разработки ' +
        'полного цикла и лидерства в команде на хакатонах.',
      githubUrl: 'https://github.com/Juryxa',
      linkedinUrl: null,
      otherLinks: {
        telegram: 'https://t.me/juryxa',
        email: 'kondratevvyacheslav04@gmail.com',
      } satisfies Prisma.InputJsonValue,
    },
  });

  await prisma.skill.deleteMany({ where: { profileId: profile.id } });
  await prisma.project.deleteMany({ where: { profileId: profile.id } });
  await prisma.workExperience.deleteMany({ where: { profileId: profile.id } });

  await prisma.skill.createMany({
    data: [
      { name: 'JavaScript', category: 'Языки программирования' },
      { name: 'TypeScript', category: 'Языки программирования' },
      { name: 'Python', category: 'Языки программирования' },
      { name: 'SQL', category: 'Языки программирования' },
      { name: 'HTML', category: 'Языки программирования' },
      { name: 'CSS3', category: 'Языки программирования' },
      { name: 'React', category: 'Frontend' },
      { name: 'Next.js', category: 'Frontend' },
      { name: 'Vite', category: 'Frontend' },
      { name: 'Node.js', category: 'Backend' },
      { name: 'Nest.js', category: 'Backend' },
      { name: 'FastAPI', category: 'Backend' },
      { name: 'PostgreSQL', category: 'Базы данных' },
      { name: 'MySQL', category: 'Базы данных' },
      { name: 'SQLite', category: 'Базы данных' },
      { name: 'Prisma', category: 'Базы данных' },
      { name: 'Git', category: 'DevOps' },
      { name: 'Linux', category: 'DevOps' },
      { name: 'Docker', category: 'DevOps' },
      { name: 'CI/CD', category: 'DevOps' },
      { name: 'RabbitMQ', category: 'DevOps' },
      { name: 'GraphQL', category: 'Протоколы и архитектура' },
      { name: 'REST', category: 'Протоколы и архитектура' },
      { name: 'WebSocket', category: 'Протоколы и архитектура' },
      { name: 'HTTP', category: 'Протоколы и архитектура' },
      {
        name: 'Микросервисная архитектура',
        category: 'Протоколы и архитектура',
      },
      { name: 'Алгоритмы и структуры данных', category: 'Прочее' },
      { name: 'ChatGPT', category: 'AI-инструменты' },
      { name: 'Claude', category: 'AI-инструменты' },
      { name: 'Cursor', category: 'AI-инструменты' },
    ].map((skill) => ({ ...skill, profileId: profile.id })),
  });

  await prisma.workExperience.createMany({
    data: [
      {
        company:
          'Дипломный проект «Корпоративный мессенджер с безопасной передачей данных»',
        position: 'Fullstack-разработчик',
        startDate: new Date('2026-01-01'),
        endDate: new Date('2026-04-30'),
        achievements: `- Спроектировал и реализовал в соло полный цикл десктоп-мессенджера (React + Electron + Nest.js) от архитектуры до деплоя за 3-4 месяца 
        - Реализовал end-to-end шифрование сообщений и файлов и двухфакторную аутентификацию (JWT + TOTP), закрыл не менее 10 потенциальных уязвимостей 
        - Внедрил обмен сообщениями через WebSocket в реальном времени со средней задержкой доставки до 50 мс 
        - Покрыл Swagger-документацией 100% REST API эндпоинтов 
        - Оптимизировал производительность приложения, сократил время загрузки в 2-3 раза`,
      },
      {
        company: 'ИП / частная практика (фриланс)',
        position: 'Fullstack-разработчик',
        startDate: new Date('2025-05-01'),
        endDate: new Date('2025-10-31'),
        achievements: `- Реализовал «под ключ» 3 коммерческих сайта/веб-приложения от разработки до деплоя и сопровождения 
        - Достигал показателей выше 90 баллов по Google PageSpeed Insights на всех проектах 
        - SEO-оптимизацией увеличил трафик в среднем в 3-4 раза 
        - Настроил CI/CD-подобный процесс деплоя через Docker + Nginx`,
      },
      {
        company:
          'Хакатон «Код победы» (кейс: шифрование в клиент-серверной архитектуре)',
        position: 'Frontend-разработчик',
        startDate: new Date('2025-04-01'),
        endDate: new Date('2025-05-31'),
        achievements: `- Вошёл в число финалистов хакатона (из 100+ команд) 
        - Реализовал клиентское шифрование файлов через Web Crypto API 
        - Внедрил проверку целостности данных и защиту от MiTM-атак, жюри отметило это как сильную сторону решения`,
      },
      {
        company:
          'Хакатон «Разработка веб-платформы для ФК «Кокос Групп» и футбольных болельщиков»',
        position: 'Frontend-разработчик, тимлид',
        startDate: new Date('2024-09-01'),
        endDate: new Date('2024-10-31'),
        achievements: `- Занял 2 место среди 250+ команд, возглавил команду из 4 человек 
        - Довёл проект до рабочего продукта, клуб продолжил использовать наработки 
        - Настроил сборку через Webpack и деплой через Docker/Nginx, сократил размер бандла в 1.5-2 раза`,
      },
    ].map((entry) => ({ ...entry, profileId: profile.id })),
  });

  await prisma.project.createMany({
    data: [
      {
        name: 'Корпоративный мессенджер с безопасной передачей данных',
        description:
          'Десктоп-мессенджер (React + Electron + Nest.js) с end-to-end шифрованием, ' +
          'TOTP-аутентификацией и обменом сообщениями через WebSocket в реальном времени.',
        sourceUrl: 'https://github.com/Juryxa/corp_messenger',
      },
      {
        name: 'Защищённое хранилище и передача файлов (хакатон «Код победы»)',
        description:
          'Клиентское шифрование файлов через Web Crypto API без доступа третьих лиц, ' +
          'включая администраторов БД; вошёл в финал хакатона.',
        sourceUrl: 'https://github.com/Juryxa/SecureComm',
      },
      {
        name: 'Хакатон «Разработка веб-платформы для ФК «Кокос Групп» и футбольных болельщиков»',
        description:
          'Веб-платформа для футбольного клуба и болельщиков, реализованная на ' +
          'микросервисной архитектуре: React + TypeScript, Django + Django REST Framework, ' +
          'Redis, Nginx и Docker Compose. 2 место на хакатоне.',
        sourceUrl: 'https://github.com/Juryxa/kokosBeerLove',
      },
      {
        name: 'RemStroyPro — сайт строительной компании',
        description:
          'Коммерческий сайт строительной компании из частной практики. ' +
          'Проект выполнен на Next.js/TypeScript, содержит отдельные frontend и server части, ' +
          'Docker-конфигурацию и production-развёртывание. ',
        sourceUrl: 'https://github.com/Juryxa/RemStroyPro',
        demoUrl: 'https://rem-stroy-pro.vercel.app',
      },
      {
        name: 'Neo-Stroy — сайт строительной компании',
        description:
          'Коммерческий сайт второй строительной компании из частной практики. ' +
          'Адаптивный frontend на HTML, CSS и JavaScript с отдельными статическими ресурсами. ',
        sourceUrl: 'https://github.com/Juryxa/neo-stroy',
        demoUrl: 'https://juryxa.github.io/neo-stroy/',
      },
      {
        name: 'Messenger — учебный мессенджер',
        description:
          'Курсовой проект мессенджера с серверной частью на C++, WebSocket-коммуникацией, ' +
          'PostgreSQL и отдельным frontend-приложением. Проект собирается через CMake и ' +
          'использует uWebSockets, nlohmann-json и libpq. Делал клиентскую часть, backend напарника',
        sourceUrl: 'https://github.com/Juryxa/Messenger',
      },
      {
        name: 'Beer Online Shop — интернет-магазин',
        description:
          'Учебный интернет-магазин с frontend на нативных HTML, CSS и JavaScript ' +
          'и backend-частью на Node.js/Express.js. ' +
          'Проект включает отдельные frontend и backend компоненты.',
        sourceUrl: 'https://github.com/Juryxa/beer_online_shop',
      },
    ].map((project) => ({ ...project, profileId: profile.id })),
  });

  console.log('Seed завершён:', profile.name);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
