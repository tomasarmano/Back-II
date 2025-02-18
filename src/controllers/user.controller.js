import userService from "../services/user.service.js";


  export async function getAll(req, res) {
    try {
      const users = await userService.getAll();
      if (users.length > 0) {
        return res.status(200).json(users);
      }
    
      return res.status(200).json({ message: "No users" });

    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  export async function getById(req, res) {
    try {
      const { id } = req.params;

      const user = await userService.getById(id);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  export async function create(req, res) {
    try {
      const { name, age, email } = req.body;

      if (!name || !age || !email) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const userExists = await userService.getByEmail(email);

      if (userExists) {
        return res.status(400).json({ message: "Email already exists" });
      }

      const user = await userService.create({ name, age, email });
      res.status(201).json(user);

      
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  export async function update (req,res){

    const id = req.params.id;
    const {name, age, email} = req.body;

    try {

        const newUser = {
            name: name,
            age: age,
            email: email
        }

        const updateUser = await userService.update(id,newUser);

        res.send({
            status: 'success',
            payload: {name,age,email}
        });

    } catch (error) {
        res.status(400).send({
            status: 'error',
            message: error.message
        });
    }

  }

  export async function deleteUser(req,res) {

    const id = req.params.id

    try {

      const deleteUser = await userService.deleteOne(id);

      res.status(200).send({
        status: 'deleted',
        payload: deleteUser
    });

      
    } catch (error) {

      console.log(error);
      
    }
    
  }



