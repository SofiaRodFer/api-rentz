// import { Connection, createConnection, getConnectionOptions } from "typeorm";

// export default async (host = "database_ignite"): Promise<Connection> => {
//     const defaultOptions = await getConnectionOptions();

//     return createConnection(
//         Object.assign(defaultOptions, {
//             host: process.env.NODE_ENV === "test" ? "localhost" : host,
//             database:
//                 process.env.NODE_ENV === "test"
//                     ? "rentz_test"
//                     : defaultOptions.database,
//             password: process.env.NODE_ENV === "test" ? 1234 : null,
//             username: process.env.NODE_ENV === "test" ? "test" : null,
//         })
//     );
// };

import { Connection, createConnection, getConnectionOptions } from "typeorm";

export default async (host = "database_ignite"): Promise<Connection> => {
    const defaultOptions = await getConnectionOptions();

    if (process.env.NODE_ENV === "test") {
        return createConnection(
            Object.assign(defaultOptions, {
                host: "localhost",
                port: "5431",
                database: "rentz",
            })
        );
    }

    return createConnection(
        Object.assign(defaultOptions, {
            host,
        })
    );
};
