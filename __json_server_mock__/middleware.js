module.exports = (req, res, next) => {
  if (req.method === "POST" && req.path === "/login") {
    console.log(req.body.username);
    console.log(req.body.password);
    if (req.body.username === "joel" && req.body.password === "123") {
      return res.status(200).json({
        user: {
          token: "123",
        },
      });
    } else {
      return res.status(400).json({ message: "Wrong password or username" });
    }
  }
};
