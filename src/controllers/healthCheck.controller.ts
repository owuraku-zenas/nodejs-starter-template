import { Request, Response } from "express";

export const healthCheck = async (_req: Request, _res: Response) => {
    _res.json({message:"OK"});
}