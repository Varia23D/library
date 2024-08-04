export const storeUser = (data) => {
  localStorage.setItem(
    "user",
    JSON.stringify({
      id: data.user.id,
      username: data.user.username,
      email: data.user.email,
      jwt: data.jwt,
      provider: data.user.provider,
      confirmed: data.user.confirmed,
      blocked: data.user.blocked,
      createdAt: data.user.createdAt,
      updatedAt: data.user.updatedAt,
      phone: data.user.phone
    })
  );
};

export const userData = () => {
  const stringifiedUser = localStorage.getItem("user") || "";
  if (stringifiedUser) {
    return JSON.parse(stringifiedUser);
  } else {
    return {};
  }
};