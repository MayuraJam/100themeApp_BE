const supabase = require("../config/supabase.js");

async function getAllStarSystem() {
  
let { data, error } = await supabase
  .from('Star_Sytem')
  .select('*')
          
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

//get ทุกค่า ที่มีตัวลุกซ้อนด้วย
async function getStarSystemById(id) {
  const { data, error } = await supabase
    .from("Star_Sytem")
    .select("*, StarObject(*)")
    .eq("System_id", id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

module.exports = {
  getAllStarSystem,
  getStarSystemById,
};
