function statusHandler(req, res, next) {
    const status = {
        "Status": "Running"
    };
    if (status === true) {
      res.send(200)  
    } else {
        console.log('An error has ocurred, please verify to ensure the server is correctly operating.')
    }
}


module.exports = {
    statusHandler,
}