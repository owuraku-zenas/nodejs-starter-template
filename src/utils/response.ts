import { Response } from "express";

export const successResponse = (res: Response, status: number, message: string, data: any = null) => {
    // logging(Section.SERVER, `[REQUEST] [${req.method}],[${req.url}]`);
    return res.status(status).json({
      status,
      success: true,
      message,
      data,
    });
  };
  
  export const errorResponse = (res: Response, status: number, message: string, error: any = null) => {
    return res.status(status).json({
      status,
      success: false,
      message,
      error: Array.isArray(error) ? error : [error],
    });
  };
  