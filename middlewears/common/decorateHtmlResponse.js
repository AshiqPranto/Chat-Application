function decorateHtmlResponse(page_title){
    return (req,res,next)=>{
        res.locals.html = true;
        res.locals.title = `${page_title} - ${process.env.AppName}`;
        next();
    };
};
module.exports = decorateHtmlResponse;