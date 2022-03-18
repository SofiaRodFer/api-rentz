import { hash } from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

import createConnection from "../index";

async function create() {
    const connection = await createConnection("localhost");

    const id = uuidv4();
    const password = await hash("admin", 8);

    await connection.query(`
    INSERT INTO Users (id, name, email, password, "isAdmin", driver_license, created_at)
    VALUES (
      '${id}',
      'admin',
      'admin@rentz.com.br',
      '${password}',
      true,
      '0123456789',
      NOW()
    )
  `);

    await connection.close;
}

create().then(() => console.log("Administrative user created"));
