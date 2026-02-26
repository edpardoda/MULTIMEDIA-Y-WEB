const config = {
    host: "http://localhost",
    port: 3000,
    api: {
        hotels: {
            create: {
                url: "api/hotels/register",
                method: "POST"
            },
            update: {
                url: "api/hotels/get",
                method: "PUT"
            },
            list: {
                url: "api/hotels/list",
                method: "GET"
            },
            delete: {
                url: "api/hotels/delete",
                method: "DELETE"
            },
            login: {
                url: "api/hotels/login",
                method: "POST"
            }
        }
    }
};

export default config;
