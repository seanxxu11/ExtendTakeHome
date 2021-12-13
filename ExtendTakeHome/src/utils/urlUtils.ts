import { extendApiConfig } from "../services/config";

export class urlUtils {
    static getUrl(path: string): string {
        return new URL(path, extendApiConfig.baseUrl).href;
    }
}