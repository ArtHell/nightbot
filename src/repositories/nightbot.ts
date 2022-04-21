import axios from "axios";
import { NightbotTimer } from "../models/timer";

export const getTimers = async (accessToken: string) =>
  axios
    .get("https://api.nightbot.tv/1/timers", { headers: { "Authorization": `Bearer ${accessToken}` } })
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        return response.data;
      }
      throw new Error(response.status.toString());
    })
    .catch(({ response }) => {
      localStorage.removeItem('access_token');
      throw new Error(response.status);
    });

export const saveTimer = async (timer: NightbotTimer, accessToken: string) =>
  axios
    .put(`https://api.nightbot.tv/1/timers/${timer._id}`, {
      enabled: timer.enabled,
      interval: timer.interval,
      lines: timer.lines,
      message: timer.message,
      name: timer.name,
    }, { headers: { "Authorization": `Bearer ${accessToken}` } })
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        return response.data;
      }
      throw new Error(response.status.toString());
    })
    .catch(({ response }) => {
      localStorage.removeItem('access_token');
      throw new Error(response.status);
    });

export const revokeToken = async (accessToken: string) => {
  axios
    .post("https://api.nightbot.tv/oauth2/token/revoke", {
      token: accessToken,
    }, { headers: { "Authorization": `Bearer ${accessToken}` } })
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        localStorage.removeItem('access_token');
        return;
      }
      throw new Error(response.status.toString());
    })
    .catch(({ response }) => {
      localStorage.removeItem('access_token');
      throw new Error(response.status);
    });
}