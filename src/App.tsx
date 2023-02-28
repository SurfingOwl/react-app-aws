import { useEffect, useState } from 'react';
import { Card, Form, FormGroup, Modal } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import './App.css';
import { UserList } from './model/User';

function App() {

  const [userState, setUser] = useState<UserList>();
  const [show, setShow] = useState<boolean>();
  const [username, setUsername] = useState<string>(),
        [description, setDescription] = useState<string>();

  const api: string = "http://Nodeexpressaws-env.eba-w2wm726i.eu-west-1.elasticbeanstalk.com/users/"
  const reqFetchAll: RequestInit = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const reqCreateUser: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "name": username,
      "description": description,
    })
  };

  const reqDeleteUser: RequestInit = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const fetchUsers = () => {
    fetch(api, reqFetchAll)
      .then(async (resp) => {        
        // let users: UserList = await resp.json()
        setUser(await resp.json());
      })
  }

  const createUser = () => {
    fetch(api, reqCreateUser)
      .then(async (resp) => {
        setUser(await resp.json());
      })
  }

  const deleteUser = (id: string) => {
    fetch(api + id, reqDeleteUser)
      .then(async (resp) => {
        setUser(await resp.json());
      });
  }

  useEffect(() => {
    fetchUsers();
  }, [])

  return (
    <div className="App">
      <div className='add-user'><Button onClick={handleShow}>add</Button></div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Ajouter un user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={createUser}>
            <FormGroup className='mb-3' controlId='username'>
              <Form.Label>Nom du user</Form.Label>
              <Form.Control placeholder='username' value={username} onChange={(e) => setUsername(e.target.value)}/>
            </FormGroup>
            <FormGroup className="mb-3" controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control placeholder="Votre description" value={description} onChange={(e) => setDescription(e.target.value)} />
            </FormGroup>
            <Button type="submit" variant="primary">VALIDER</Button>
          </Form>
        </Modal.Body>
      </Modal>

      <div className='title'>USER LIST</div>
      <div className='list'>
        {userState?.listOf.map((user, index) => {
          return (
            <>
              <Card>
                <Card.Body>
                  <Card.Title className='card-title'>{user.name}</Card.Title>
                  <Card.Text className='user-description'>{user.description}</Card.Text>
                  <Button className='delete-user' variant="primary" onClick={() => deleteUser(user.id)}>delete</Button>
                </Card.Body>
              </Card>
            </>
          )
        })}
      </div>
    </div>
  );
}

export default App;
