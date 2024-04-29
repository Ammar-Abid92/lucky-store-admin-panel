import Odoo from "../../../../libs/react-odoo-rpc/lib";
import axios from "axios";

export const getProducts = params => {
  return new Promise((resolve, reject) => {
    // Get From ODOO
    var odoo = new Odoo({
      host: params.domain,
      // host: 'wincloud.oscarhub.org',
      // database: 'wincloud',
      database: params.db,
      username: params.email,
      password: params.password
    });

    let args = {
      model: "mobile.pos.products.util",
      method: "get_all_products",
      session_id: params.session_id,
      callback: function(err, res) {
        console.log("updated prods", err, res);
        if (err) {
          let error = JSON.parse(JSON.stringify(err));
          if (error.message) {
            reject(error);
            return;
          }
          return;
        }
        console.log("updated prods", res);
        resolve(res);
      }
    };
    odoo.getAll(args);
  });
};
