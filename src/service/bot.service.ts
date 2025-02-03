import api from "@/app/utils/api";

export interface CreateBot {
  userId: string;
  botName: string;
  botToken: string;
  botDescription: string;
}

export const listBots = async () => {
  try {
    const response = await api.get("/bots");
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching bots:", error);
    return [];
  }
};

export const addBot = async (data: CreateBot) => {
  try {
    const response = await api.post("/bots/add", data);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching bots:", error);
    return [];
  }
};

export const removeBot = async (id: number) => {
  try {
    const response = await api.delete(`/bots/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching bots:", error);
    return null;
  }
};
