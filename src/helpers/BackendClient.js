export default class BackendClient {
    static host = process.env.REACT_APP_BACKEND_HOST || "192.168.0.5";
    static port = process.env.REACT_APP_BACKEND_PORT || 5000;
    static isSecure = process.env.REACT_APP_BACKEND_SSL === "1" ? true : false;
    static url = this.isSecure
        ? `https://${this.host}/api`
        : `http://${this.host}:${this.port}/api`;

    // --------------------------------------- Authentication Operations --------------------------------------------

    /*
     * Login to the database
     *
     * @param email: string     => email of user
     * @param password: string  => password of user
     *
     * @returns a json object containing the user information and token
     */
    static async login(email, password) {
        return new Promise(async (resolve) => {
            const post_url = `${this.url}/auth/login`;
            const response = await fetch(post_url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            }).then((r) => r.json());

            if (response.error) {
                throw response;
            }

            resolve(response);
        });
    }

    static async refreshSession() {
        return new Promise(async (resolve) => {
            const token = localStorage.getItem("token");
            if (token) {
                const get_url = `${this.url}/auth/session`;
                const response = await fetch(get_url, {
                    method: "GET",
                    headers: {
                        token: token,
                    },
                }).then((r) => r.json());

                if (response.error) {
                    throw response;
                }

                resolve(response);
            } else {
                throw {
                    error: true,
                    msg: "Error: No token found",
                };
            }
        });
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
        return new Promise(async (resolve) => {
            const tags_query = tags.map((tag) => `&tags=${tag}`).join("");
            const get_url = `${this.url}/image/db/pages?pageSize=${pageSize}&search=${search}${tags_query}`;
            const response = await fetch(get_url, {
                method: "GET",
            }).then((r) => r.json());

            if (response.error) {
                throw response;
            }

            resolve(response);
        });
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
        return new Promise(async (resolve) => {
            const tags_query = tags.map((tag) => `&tags=${tag}`).join("");
            const get_url = `${this.url}/image/db?pageSize=${pageSize}&pageNum=${pageNum}&search=${search}${tags_query}`;
            const response = await fetch(get_url, {
                method: "GET",
            }).then((r) => r.json());

            if (response.error) {
                throw response;
            }

            resolve(response);
        });
    }

    /*
     * Gets an image by a specified id
     *
     * @param id: string => a unique uuid of the image
     *
     * @returns a single image json object
     */
    static async getImage(id) {
        return new Promise(async (resolve) => {
            const get_url = `${this.url}/image/db?id=${id}`;
            const response = await fetch(get_url, {
                method: "GET",
            }).then((r) => r.json());

            if (response.error) {
                throw response;
            }

            resolve(response);
        });
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
        return new Promise(async (resolve) => {
            const get_url = `${this.url}/tags`;
            const response = await fetch(get_url, {
                method: "GET",
            }).then((r) => r.json());

            if (response.error) {
                throw response;
            }

            resolve(response);
        });
    }

    /*
     * Inserts a new tag into the database
     *
     * @param tag: string => a new tag
     *
     * @returns a json response whether or not it was successful
     */
    static async insertTag(tag) {
        return new Promise(async (resolve) => {
            const post_url = `${this.url}/tags`;
            const response = await fetch(post_url, {
                method: "POST",
                body: JSON.stringify({ tag: tag }),
            }).then((r) => r.json());

            if (response.error) {
                throw response;
            }

            resolve(response);
        });
    }
}
