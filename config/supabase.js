const {createClient} = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

// console.log("Check Env:", process.env.SUPABASE_URL);

if(!supabaseUrl || !supabaseKey){
    console.error("Error: ไม่พบ Supabase url และ supabase anon key กรุณาตรวจสอบ key ดังกล่าวที่ไฟล์ .env ด้วย");
    throw new Error("ทำการเชื่อมต่อ Supabase ไม่สำเร็จ, กรุณา set Supabase url และ supabase anon key ที่ .env file");
    
}

const supabase = createClient(supabaseUrl,supabaseKey);
// console.log("Check supabase work :", supabase);
module.exports = supabase;
