export const getAuthLink = (redirectUrl: string): string => {
  const clientId = "0fcf24b083e1c819da1c04af82dea353";
  const responseType = "token";
  const scope = "timers";

  return `https://api.nightbot.tv/oauth2/authorize?response_type=${responseType}&client_id=${clientId}&redirect_uri=${encodeURI(redirectUrl)}&scope=${scope}`;
}