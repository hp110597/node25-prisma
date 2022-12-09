const express = require("express");
const app = express();
app.use(express.json());
app.use(express.static("."));

app.listen(8080);

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient(); //tuong tu const model = initial-Model()

// app.get("/demo", async (req, res) => {
//   let data = await prisma.fodd.findMany({
//     // where:{
//     //     user_id:4,
//     // }
//     // include:{
//     //     food_type: true
//     // }
//     where: {
//       food_name: {
//         contains: "w",
//       },
//     },
//   });
//   res.send(data);
// });
app.get("/demo/:id", async (req, res) => {
    let {id} = req.params
  let data = await prisma.fodd.findMany({
    include: {
      food_type: true,
    },
    where:{
        food_id:Number(id) //chú ý kiểu dữ liệu truyền vào đúng với datastyle model đã khai báo
    }
  });
  res.send(data);
});

//create,update

app.post("/createFood", async (req, res) => {
  let { food_name, image, price, desc, type_id } = req.body;
  await prisma.food.create({
    data: { food_name, image, price, desc, type_id },
  });
  await prisma.food.update({
    data: { food_name, image, price, desc, type_id },
    where: { food_id: 1 },
  });
  await prisma.food.delete({where:{food_id:1}});
});
