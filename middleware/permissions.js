exports.restrict = (roles) => {
    return (req, res, next) => {
      //roles is an array
      // console.log(req.user.role, roles);
      if (!roles.includes(req.user.role)) {
        // res.status(500).json({
        //   status: "error",
        //   message: "permission denied",
        // });
        res.redirect('/home')
      }else{
        next();
      }
    };
  };