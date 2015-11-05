/**
 * Created by Oleg Orlov on 27.08.15.
 */

import jwt from 'jsonwebtoken';

export default function checkToken() {
  return storage => ({
    ...storage,
    get: (key, callback) => {
      storage.get(key, (error, token) => {
        if (error) callback(error);
        if (token) {
          const payload = jwt.decode(token);
          if (typeof payload.exp === 'number') {
            if (Math.floor(Date.now() / 1000) < payload.exp) callback(null, token);
          }
        }
      });
    },
  });
}
