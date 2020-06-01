export default class BackendClient {
    static host = process.env.REACT_APP_BACKEND_HOST || "192.168.0.5";
    static port = process.env.REACT_APP_BACKEND_PORT || 5000;
    static isSecure = process.env.REACT_APP_BACKEND_SSL === "1" ? true : false;
    static url = this.isSecure ? `https://${this.host}/api` : `http://${this.host}:${this.port}/api`;

    static async getImagePageNum(pageSize, search) {
        const get_url = `${this.url}/image/db/pages?pageSize=${pageSize}&search=${search}`;
        const response = await fetch(get_url, {
            method: "GET",
        });
        return response.json();
    }
    
    static async getAllImages(pageSize, pageNum, search) {
        const get_url = `${this.url}/image/db?pageSize=${pageSize}&pageNum=${pageNum}&search=${search}`;
        const response = await fetch(get_url, {
            method: "GET",
        });
        return response.json();
    }

    static async getImage(id) {
        const get_url = `${this.url}/image/db?id=${id}`;
        const response = await fetch(get_url, {
            method: "GET",
        });
        return response.json();
    }
}
