import $api from "../http";

export default class UserService {
  static postForm(holiday: string, season: string): Promise<string> {
    return $api.post("/forms", {
      holiday,
      season,
    });
  }
}
