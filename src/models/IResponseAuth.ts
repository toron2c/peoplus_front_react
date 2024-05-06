import { ITokens } from "./ITokens";
import { IUser } from "./IUser";

export interface IResponseAuth extends IUser {
  tokens: ITokens;
}
