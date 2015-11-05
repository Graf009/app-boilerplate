/*
* @Author: Oleg Orlov
* @Date:   2015-09-21 17:58:19
*/

export default function getExpirationDelay(state) {
  const { auth: { user } } = state;
  const expirationDelay = Math.floor((user.exp * 1000 - Date.now()) * 0.9);

  return expirationDelay;
}
