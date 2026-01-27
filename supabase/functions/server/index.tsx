import { Hono } from "jsr:@hono/hono";
import { cors } from "jsr:@hono/hono/cors";
import { logger } from "jsr:@hono/hono/logger";
import * as kv from "./kv_store.tsx"; // Перевір, щоб розширення було вірним

const app = new Hono();

app.use('*', logger());

// Налаштування CORS
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    maxAge: 600,
  }),
);

// Health check
app.get("/make-server-97660740/health", (c) => c.json({ status: "ok" }));

// Booking endpoint
app.post("/make-server-97660740/booking", async (c) => {
  try {
    const body = await c.req.json();
    const { name, email, phone, selectedDay, selectedTime } = body;

    if (!name || !email || !phone || !selectedDay || !selectedTime) {
      return c.json({ error: "Alle felt er påkrevd" }, 400);
    }

    const bookingId = `booking_${Date.now()}_${Math.random().toString(36).substring(7)}`;
    
    const bookingData = {
      id: bookingId,
      name,
      email,
      phone,
      selectedDay,
      selectedTime,
      createdAt: new Date().toISOString(),
      status: "pending"
    };

    await kv.set(bookingId, bookingData);

    return c.json({ 
      success: true, 
      message: "Booking opprettet",
      bookingId 
    });
  } catch (error) {
    return c.json({ error: `Serverfeil: ${error.message}` }, 500);
  }
});

// Contact form endpoint
app.post("/make-server-97660740/contact", async (c) => {
  try {
    const body = await c.req.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return c.json({ error: "Всі поля обов'язкові" }, 400);
    }

    const messageId = `contact_${Date.now()}_${Math.random().toString(36).substring(7)}`;
    
    const messageData = {
      id: messageId,
      name,
      email,
      message,
      createdAt: new Date().toISOString(),
      status: "unread"
    };

    await kv.set(messageId, messageData);

    return c.json({ 
      success: true, 
      message: "Melding sendt",
      messageId 
    });
  } catch (error) {
    return c.json({ error: `Serverfeil: ${error.message}` }, 500);
  }
});

// Адмін-ендпоінти
app.get("/make-server-97660740/bookings", async (c) => {
  try {
    const bookings = await kv.getByPrefix("booking_");
    return c.json({ bookings });
  } catch (error) {
    return c.json({ error: error.message }, 500);
  }
});

app.get("/make-server-97660740/contacts", async (c) => {
  try {
    const contacts = await kv.getByPrefix("contact_");
    return c.json({ contacts });
  } catch (error) {
    return c.json({ error: error.message }, 500);
  }
});

Deno.serve(app.fetch);