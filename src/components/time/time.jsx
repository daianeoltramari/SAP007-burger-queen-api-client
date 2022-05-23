import { getTime } from "./date.jsx";

export const TimeInterval = ({ createdAt }) => {
  return <p className="order-info">{getTime(createdAt)}</p>;
};
