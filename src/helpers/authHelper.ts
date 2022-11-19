export const getAuthLink = (redirectUrl: string): string => {
  const clientId = "d1ee4d13ad3403d3a37bc0eec3918f8a";
  const responseType = "token";
  const scope = "timers";

  return `https://api.nightbot.tv/oauth2/authorize?response_type=${responseType}&client_id=${clientId}&redirect_uri=${encodeURI(redirectUrl)}&scope=${scope}`;
}
