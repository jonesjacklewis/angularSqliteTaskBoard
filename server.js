const express = require('express')
const sqlite3 = require('sqlite3').verbose()
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()
const port = process.env.PORT || 4000

const db = new sqlite3.Database('db/taskboard.db')

app.use(cors())
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
)

app.get('/', (_req, res) => {
  const sql = 'SELECT * FROM tasks;'
  db.all(sql, (_err, rows) => {
    const users = []

    rows.forEach((row) => {
      users.push(row)
    })

    res.send(JSON.stringify(users))
  })
})

app.get('/getCategories', (_req, res) => {
  const sql = 'SELECT name FROM categories ORDER BY name ASC'

  db.all(sql, (_err, rows) => {
    const categories = []

    rows.forEach((row) => {
      categories.push(row.name)
    })

    res.send(JSON.stringify(categories))
  })
})

app.get('/getTasks/:boardname', (req, res) => {
  const boardname = req.params.boardname

  const sql = 'SELECT * FROM tasks WHERE category = ? ORDER BY heading ASC'

  db.all(sql, boardname, (_err, rows) => {
    const tasks = []

    rows.forEach((row) => {
      tasks.push(row)
    })

    res.send(JSON.stringify(tasks))
  })
})

app.post('/addCategory', (req, res) => {
  const categoryName = req.body.categoryName
  try {
    db.run(
      'INSERT INTO categories VALUES (null, ?)',
      categoryName,
      (err, _rows) => {
        if (err) {
          console.log(`${categoryName} already in table.`)
          res.end()
        }
      },
    )
  } catch {
    console.log(`${categoryName} already in table.`)
  } finally {
    res.end()
  }
})

app.post('/addTask', (req, res) => {
  const taskHeading = req.body.taskHeading
  const taskBody = req.body.taskBody
  const taskCategory = req.body.taskCategory
  const taskComplete = req.body.taskComplete
  try {
    db.run(
      'INSERT INTO tasks VALUES (null, ?, ?, ?, ?)',
      taskHeading,
      taskBody,
      taskCategory,
      taskComplete,
      (err, _rows) => {
        if (err) {
          console.log(`${taskHeading} already in table.`)
          res.end()
        }else{
          console.log("here");
        }
      },
    )
  } catch {
    console.log(`${taskHeading} already in table.`)
  } finally {
    res.end()
  }
})

app.delete('/deleteTask/:id', (req, res) => {
  const id = req.params.id

  try {
    db.run('DELETE FROM tasks WHERE id = ?', id, (err, _rows) => {
      if (err) {
        console.log(`${id} was not able to be removed.`)
        console.error(err)
        res.end()
      }
    })
  } catch (err){
    console.log(`${id} was not able to be removed.`)
    console.error(err)
    res.end()
  } finally {
    res.end()
  }
})

app.get("/getTask/:id", (req, res) => {
  const id = req.params.id;

  try{
    db.all("SELECT * from tasks WHERE id = ?", id, (_err, rows) => {
      if(rows.length == 1){
        res.send(JSON.stringify(rows[0]));
      }else{
        res.send(JSON.stringify(["error"]));

      }
    })
  }catch (err){
    console.error(err);
    res.end();
  }

})

app.post("/editTask", (req, res) => {
  const taskId = req.body.taskId;
  const taskHeading = req.body.taskHeading;
  const taskBody = req.body.taskBody;
  const taskCategory = req.body.taskCategory;
  const taskComplete = req.body.taskComplete;



  const sql = "UPDATE tasks SET heading = ?, body = ?, category = ?, complete = ? WHERE id = ?";

  try{
    db.run(sql, taskHeading, taskBody, taskCategory, taskComplete, taskId, (err, _rows) => {
      if(err){
        console.log(`Error updating ${taskId}.`);
      }
    })
  }catch (err){
    console.log(`Error updating ${taskId}.`);
  }finally{
    res.end();
  }

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
