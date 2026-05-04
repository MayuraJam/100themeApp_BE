const supabase = require("../config/supabase.js");
const now = new Date();

async function getAllTheme() {
  try {
    //ดึงข้อมูลจาก DB มาทั้งหมด เก็บในตัวแปร data
    const { data, error } = await supabase.from("Master_theme").select("*");

    if (error) {
      console.error("Supabase Query Error:", error.message);
      return null;
    }

    if (!data) return [];

    return data.map((t) => ({
      id: t.id,
      created_at: t.created_at,
      themeName: t.themeName,
      color100: t.color100,
      color75: t.color75,
      color25: t.color25,
      color20: t.color20,
      colorTone: t.colorTone,
    }));
  } catch (error) {
    console.error("ไม่สามารถดึงข้อมูลจาก Supabase ได้");
    throw error;
  }
}

async function getThemeById(id) {
  try {
    //ดึงข้อมูลจาก DB มาทั้งหมด เก็บในตัวแปร data
    const { data, error } = await supabase
      .from("Master_theme")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Supabase Query Error:", error.message);
      return null;
    }

    if (!data) return [];

    return {
      data: data,
    };
  } catch (error) {
    console.error("ไม่สามารถดึงข้อมูลจาก Supabase ได้");
    throw error;
  }
}

async function getAllThemeForDropdown() {
  try {
    //ดึงข้อมูลจาก DB มาทั้งหมด เก็บในตัวแปร data
    const { data, error } = await supabase.from("Master_theme").select("*");

    if (error) {
      console.error("Supabase Query Error:", error.message);
      return null;
    }

    if (!data) return [];

    return data.map((t) => ({
      value: t.id,
      label: t.themeName,
      color: t.color100,
    }));
  } catch (error) {
    console.error("ไม่สามารถดึงข้อมูลจาก Supabase ได้");
    throw error;
  }
}

async function insertNewTheme(
  themeName,
  color100,
  color75,
  color25,
  color20,
  colorTone,
) {
  try {
    const { data, error } = await supabase
      .from("Master_theme")
      .insert({
        created_at: new Date().toISOString(),
        themeName: themeName,
        color100: color100,
        color75: color75,
        color25: color25,
        color20: color20,
        colorTone: colorTone,
      })
      .select();

    if (error) {
      console.error("Supabase Query Error:", error.message);
      return null;
    }

    return {
      message: "เพิ่มธีมสีสำเร็จ",
      data: data,
    };
  } catch (error) {
    console.error("ไม่สามารถ เพิ่มข้อมูลธีมสีใหม่ได้");
    throw error;
  }
}

async function updateTheme(
  id,
  themeName,
  color100,
  color75,
  color25,
  color20,
  colorTone,
) {
  try {
    const { data, error } = await supabase
      .from("Master_theme")
      .update({
        themeName: themeName,
        color100: color100,
        color75: color75,
        color25: color25,
        color20: color20,
        colorTone: colorTone,
      })
      .eq("id", id)
      .select();

    if (error) {
      console.error("Supabase Query Error:", error.message);
      return null;
    }

    return {
      data: data,
    };
  } catch (error) {
    console.error("ไม่สามารถ แก้ไขข้อมูลธีมสีใหม่ได้");
    throw error;
  }
}

module.exports = {
  getAllTheme,
  insertNewTheme,
  getAllThemeForDropdown,
  updateTheme,
  getThemeById,
};
