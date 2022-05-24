import { getTime } from "./date.js";

export const TimeInterval = ({ createdAt }) => {
  return <p className="order-info">{getTime(createdAt)}</p>;
};
