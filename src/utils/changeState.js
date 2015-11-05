/**
 * Created by Oleg Orlov on 28.08.15.
 */

export default function changeState(target, property) {
  return value => {
    target.setState({
      [property]: value,
    });
  };
}
