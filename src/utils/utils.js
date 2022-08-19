import { menu } from "../../assets/data/data";

export const getMenuForTheDay = (date) => {
  const day = new Date(date).getDay();
  const menuList = menu.filter((r) => {
    return r.availableDays.includes(day);
  });
  return menuList;
};
