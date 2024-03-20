import * as PropTypes from "prop-types";

function Button({block, children, color, groupBtn, onClick}) {
  return <button onClick={onClick}
                 className={`btn ${color ? `btn-${color}` : ""} ${block ? "btn-block" : ""} ${groupBtn ? "input-group-btn" : ""}`}>{children}</button>;
}

Button.propTypes = {
  color: PropTypes.string,
  block: PropTypes.bool,
  groupBtn: PropTypes.bool,
  children: PropTypes.node,
  onClick: PropTypes.func
};

const InputGroupButton = ({color, children, onClick}) => <Button onClick={onClick} color={color} groupBtn={true}>{children}</Button>;

export {Button, InputGroupButton};