const KEY = "debate_duels_v1";

export const storage = {
  get() {
    try {
      return JSON.parse(localStorage.getItem(KEY)) || { users: {}, duels: {} };
    } catch {
      return { users: {}, duels: {} };
    }
  },
  set(data) {
    try {
      localStorage.setItem(KEY, JSON.stringify(data));
    } catch (e) {
      console.error("Storage write failed:", e);
    }
  },
  clear() {
    localStorage.removeItem(KEY);
  },
  export() {
    return JSON.stringify(storage.get(), null, 2);
  },
  import(jsonString) {
    const data = JSON.parse(jsonString);
    if (!data.users || !data.duels) throw new Error("Invalid data format");
    storage.set(data);
    return data;
  },
};
