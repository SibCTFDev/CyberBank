import express from "express"


export const app = express();


const port = process.env.PORT || 8000;
app.get('/', (request, response) => {
  response.send('Hello world!');
});
app.listen(port, () => console.log(`Running on port ${port}`));