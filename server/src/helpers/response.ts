import express from 'express';

export const successResponse = (res : express.Response, data: any, message: string, statusCode: 200|201|204 ) => res.json({
    message: message,
    data: data,

}).status(statusCode)

export const errorResponse = (res : express.Response, data: any, message: string, statusCode: 400|401|403|404 ) => res.json({
    message: message,
    data: data,

}).status(statusCode)
export const serverErrorResponse = (res : express.Response) => res.json({
    message: "Internal server error. Please Try again"
}).status(500)