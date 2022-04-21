import axios from "axios";

export const getTimers = (accessToken: string) =>
  axios
    .get("https://api.nightbot.tv/1/timers", {headers: {"Authorization": `Bearer ${accessToken}`}})
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        return response.data;
      }
      throw new Error(response.status.toString());
    })
    .catch(({ response }) => {
      throw new Error(response.status);
    });