export default class BackendClient {
    static host = process.env.REACT_APP_BACKEND_HOST || "192.168.0.5";
    static port = process.env.REACT_APP_BACKEND_PORT || 5000;
    static isSecure = process.env.REACT_APP_BACKEND_SSL === "1" ? true : false;
    static url = this.isSecure
        ? `https://${this.host}/api`
        : `http://${this.host}:${this.port}/api`;

    static async handleJSONError(response, errorResponse) {
        let body = await response.json();
        console.log(body);
        if (body.error) {
            return errorResponse;
        }

        return body;
    }

    /*
     * Gets the number of pages based on specific queries
     *
     * @param pageSize: int     => amount of images on a page
     * @param search: string    => a search query to search within the title or description
     * @param tags: string[]    => a list of tags the results need to have
     *
     * @returns a int of the amount of pages with that query
     */
    static async getImagePageNum(pageSize, search, tags) {
        const tags_query = tags.map((tag) => `&tags=${tag}`).join("");
        const get_url = `${this.url}/image/db/pages?pageSize=${pageSize}&search=${search}${tags_query}`;
        const response = await fetch(get_url, {
            method: "GET",
        });

        return this.handleJSONError(response, 0);
    }

    // --------------------------------------- Image Operations --------------------------------------------

    /*
     * Gets all of the images with specific queries
     *
     * @param pageSize: int     => amount of images on a page
     * @param pageNum: int      => page number
     * @param search: string    => a search query to search within the title or description
     * @param tags: string[]    => a list of tags the results need to have
     *
     * @returns a list of image json objects
     */
    static async getAllImages(pageSize, pageNum, search, tags) {
        const tags_query = tags.map((tag) => `&tags=${tag}`).join("");
        const get_url = `${this.url}/image/db?pageSize=${pageSize}&pageNum=${pageNum}&search=${search}${tags_query}`;
        const response = await fetch(get_url, {
            method: "GET",
        });

        return this.handleJSONError(response, []);
    }

    /*
     * Gets an image by a specified id
     *
     * @param id: string => a unique uuid of the image
     *
     * @returns a single image json object
     */
    static async getImage(id) {
        const get_url = `${this.url}/image/db?id=${id}`;
        const response = await fetch(get_url, {
            method: "GET",
        });

        return this.handleJSONError(response, {});
    }

    // --------------------------------------- Storage Operations ----------------------------------------
    // TODO: Build out the rest of the storage operations

    // --------------------------------------- Tag Operations --------------------------------------------

    /*
     * Gets the list of tags as an array
     *
     * @returns an array of tags
     */
    static async getTags() {
        const get_url = `${this.url}/tags`;
        const response = await fetch(get_url, {
            method: "GET",
        });

        return this.handleJSONError(response, []);
    }

    /*
     * Inserts a new tag into the database
     *
     * @param tag: string => a new tag
     *
     * @returns a json response whether or not it was successful
     */
    static async insertTag(tag) {
        const post_url = `${this.url}/tags`;
        const response = await fetch(post_url, {
            method: "POST",
            body: {
                tag: tag,
            },
        });

        return this.handleJSONError(response, false);
    }
}
