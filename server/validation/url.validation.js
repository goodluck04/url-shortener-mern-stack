import vine from "@vinejs/vine";
import { CustomErrorReporter } from "./customErrorReporter.js";


// custom error reporter
vine.errorReporter = () => new CustomErrorReporter();

export const getUrlSchema = vine.object({
    url: vine.string().url({
        require_protocol: true,
        protocols: ['http', 'https', 'ftp']
    }),
    urlName: vine.string(191).optional(),
});


export const userUrlSchema = vine.object({
    userId: vine.string(191)
});

export const editUrlSchema = vine.object({
    userId: vine.string(191),
    url: vine.string().url({
        require_protocol: true,
        protocols: ['http', 'https', 'ftp']
    }),
    urlName: vine.string(191).optional(),
});



