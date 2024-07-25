import { Request } from "express";
import { IRequestPayload } from "./IRequestPayload";

export class IExpressRequest extends Request {
    user: {
      [x: string]: any; userInfo: IRequestPayload 
};
}