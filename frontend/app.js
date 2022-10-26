const express = require('express');
require('express-async-errors');
// const morgan = require('morgan'); /** */
// const cors = require('cors');
// const csurf = require('csurf'); /** */
// const helmet = require('helmet');
// const cookieParser = require('cookie-parser');

const app = express();
const path = require('path');
// const home = require('./views/soundcloud.html')




// app.use(morgan('dev'));

// app.use(cookieParser());
app.use(express.json());

// app.use(cors())

// // helmet helps set a variety of headers to better secure your app
// app.use(
//   helmet.crossOriginResourcePolicy({
//     policy: "cross-origin"
//   })
// );

// // Set the _csrf token and create req.csrfToken method
// app.use(
//   csurf({
//     cookie: {
//       secure: true,
//       sameSite: "Lax",
//       httpOnly: true
//     }
//   })
// );



// Catch unhandled requests and forward to error handler.
// app.use((_req, _res, next) => {
//   const err = new Error("The requested resource couldn't be found.");
//   err.title = "Resource Not Found";
//   err.errors = ["The requested resource couldn't be found."];
//   err.status = 404;
//   next(err);
// });


// app.use((err, _req, res, _next) => {
//   res.status(err.status || 500);
//   console.error(err);
//   res.json({
//     title: err.title || 'Server Error',
//     message: err.message,
//     errors: err.errors,
//     stack: err.stack
//   });
// });



app.use(express.static('scripts'))
app.use(express.static('styles'))

app.get('/test', async (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'home.html'));

  // res.send('hello')
})

app.listen(3000, () => console.log(`Listening on port 3000...`));

module.exports = app;
