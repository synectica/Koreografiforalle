import { createClient } from "jsr:@supabase/supabase-js@2.49.8";

// Ініціалізуємо клієнт один раз поза функціями
const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const supabase = createClient(supabaseUrl, supabaseKey);

const TABLE_NAME = "kv_store_97660740";

export const set = async (key: string, value: any): Promise<void> => {
  const { error } = await supabase.from(TABLE_NAME).upsert({
    key,
    value
  });
  if (error) throw new Error(error.message);
};

export const get = async (key: string): Promise<any> => {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select("value")
    .eq("key", key)
    .maybeSingle();
    
  if (error) throw new Error(error.message);
  return data?.value;
};

export const del = async (key: string): Promise<void> => {
  const { error } = await supabase.from(TABLE_NAME).delete().eq("key", key);
  if (error) throw new Error(error.message);
};

// Пошук за префіксом (Саме цей метод ти використовуєш для отримання списку бронювань)
export const getByPrefix = async (prefix: string): Promise<any[]> => {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select("value")
    .like("key", `${prefix}%`); // Знаходить всі ключі, що починаються з префікса
    
  if (error) throw new Error(error.message);
  return data?.map((d) => d.value) ?? [];
};