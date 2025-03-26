let ft_list = document.getElementById("ft_list");


const setCookie = (name, value, days) => {
  let date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${date.toUTCString()}; path=/`;
};


const getCookies = () => {
  let cookies = document.cookie.split("; ");
  let data = {};
  cookies.forEach((cookie) => {
    let [key, value] = cookie.split("=");
    if (key && value) data[key] = decodeURIComponent(value);
  });
  return data;
};


const deleteCookie = (name) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
};


const create = () => {
  let txt = prompt("Please Enter TODO LIST:");
  if (!txt) return;

  const name = new Date().getTime(); 
  setCookie(name, txt, 365);

  let node = document.createElement("div");
  node.innerHTML = txt;
  node.onclick = () => {
    const check = confirm("Do you want to delete?");
    if (check) {
      node.remove();
      deleteCookie(name);
    }
  };
  ft_list.prepend(node);
};


window.onload = () => {
  let savedTodos = getCookies();
  for (let key in savedTodos) {
    let node = document.createElement("div");
    node.innerHTML = savedTodos[key];
    node.onclick = () => {
      const check = confirm("Do you want to delete?");
      if (check) {
        node.remove();
        deleteCookie(key);
      }
    };
    ft_list.prepend(node);
  }
};
