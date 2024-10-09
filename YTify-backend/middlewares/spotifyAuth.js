const sportifyAuth = async (req, res, next) => {
  const code = req.cookies.access_token;
  if (!code || code === "") {
    return res.status(401).json({ message: "login with spotify first" });
  }
  req.code = code;
  next();
};
