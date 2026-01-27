# KOREOGRAFI FOR ALLE - Інструкції

## Про сайт

Це сайт-заглушка для хореографа Galyna Gerasymenko. Сайт дозволяє відвідувачам:
- Переглядати інформацію про безкоштовне пробне заняття
- Бронювати заняття через календар
- Залишати повідомлення через форму зворотного зв'язку

## Як додати відео

1. Підготуйте відеофайл (формат .mp4 рекомендується)
2. Завантажте відео на сервіс хостингу (наприклад, Vimeo, YouTube, або власний хостинг)
3. Відкрийте файл `/src/app/components/Hero.tsx`
4. Знайдіть рядок:
   ```tsx
   <source src="/placeholder-video.mp4" type="video/mp4" />
   ```
5. Замініть `/placeholder-video.mp4` на URL вашого відео

**Примітка:** Відео буде автоматично програватися при завантаженні сторінки як на комп'ютері, так і на мобільних пристроях.

## Як переглянути бронювання і повідомлення

### Варіант 1: Через адміністративну панель

У файлі `/src/app/App.tsx` тимчасово замініть контент на:

\`\`\`tsx
import { AdminPanel } from "@/app/components/AdminPanel";

export default function App() {
  return <AdminPanel />;
}
\`\`\`

Відкрийте сайт і ви побачите всі бронювання і повідомлення.

**Важливо:** Після перегляду поверніть оригінальний контент у `/src/app/App.tsx`!

### Варіант 2: Через консоль логів Supabase

Кожне нове бронювання і повідомлення автоматично логується в консолі Supabase Edge Functions:

1. Відкрийте вашу панель Supabase
2. Перейдіть до Edge Functions
3. Виберіть функцію `make-server-97660740`
4. Перегляньте логи - там будуть всі деталі бронювань і повідомлень

### Варіант 3: Через API

Отримати всі бронювання:
\`\`\`
GET https://{projectId}.supabase.co/functions/v1/make-server-97660740/bookings
\`\`\`

Отримати всі повідомлення:
\`\`\`
GET https://{projectId}.supabase.co/functions/v1/make-server-97660740/contacts
\`\`\`

## Налаштування розкладу занять

Щоб змінити доступні дні і час для бронювання:

1. Відкрийте файл `/src/app/components/BookingSection.tsx`
2. Знайдіть масиви `availableDays` і `availableTimes`
3. Змініть їх відповідно до вашого розкладу

Приклад:
\`\`\`tsx
const availableDays = [
  { id: "monday", label: "Понеділок", value: "monday" },
  { id: "wednesday", label: "Середа", value: "wednesday" },
  { id: "friday", label: "П'ятниця", value: "friday" }
];

const availableTimes = [
  { id: "16:00", label: "16:00", value: "16:00" },
  { id: "17:30", label: "17:30", value: "17:30" },
  { id: "19:00", label: "19:00", value: "19:00" }
];
\`\`\`

## Налаштування сповіщень (опціонально)

Для отримання сповіщень через email або SMS, вам потрібно:

1. Налаштувати email сервіс (наприклад, SendGrid, Mailgun)
2. Додати API ключ у Supabase Secrets
3. Оновити файл `/supabase/functions/server/index.tsx` для відправки email/SMS

Це вимагає додаткового програмування. Наразі всі сповіщення доступні через логи Supabase.

## Технічна підтримка

Сайт побудований на:
- React
- Tailwind CSS
- Supabase (база даних і backend)

Всі дані зберігаються в базі даних Supabase і доступні через Edge Functions.
