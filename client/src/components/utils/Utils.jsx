export const dateParser = (date) => {
  let options = {
    hour: "2-digit",
    minute: "2-digit",
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  let timeStamp = Date.parse(date);
  let dateObj = new Date(timeStamp).toLocaleDateString("fr-FR", options);

  return dateObj.toString();
};

export const shortDateParser = (date) => {
  let options = {
    day : "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",

  };

  let timeStamp = Date.parse(date);
  let dateObj = new Date(timeStamp).toLocaleDateString("fr-FR", options);

  return dateObj.toString();
}

export const isEmpty = (value) => {
  return (
    value === undefined ||
    value === null ||
    (typeof value === "object" && Object.keys(value).length === 0) ||
    (typeof value === "string" && value.trim().length === 0)
  );
};

export const timeStampParser = (date) => {
  let options = {
    hour: "2-digit",
    minute: "2-digit",
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  let dateObj = new Date(date).toLocaleDateString("fr-FR", options);

  return dateObj.toString();

}
